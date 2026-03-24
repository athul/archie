(function () {
    var root = document.querySelector("[data-search-root]");

    if (!root) {
        return;
    }

    var input = root.querySelector("[data-search-input]");
    var status = root.querySelector("[data-search-status]");
    var results = root.querySelector("[data-search-results]");
    var indexUrl = root.getAttribute("data-search-index-url");

    if (!input || !status || !results) {
        return;
    }

    function normalizeText(value) {
        var normalized = (value || "").toLowerCase();

        if (typeof normalized.normalize === "function") {
            normalized = normalized.normalize("NFKD");
        }

        return normalized
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function tokenizeQuery(value) {
        var normalized = normalizeText(value);
        return normalized ? normalized.split(" ") : [];
    }

    function buildSearchEntry(entry) {
        var tags = Array.isArray(entry.tags) ? entry.tags : [];

        return {
            title: entry.title || "",
            permalink: entry.permalink || "#",
            displayDate: entry.displayDate || "",
            date: entry.date || "",
            section: entry.section || "",
            tags: tags,
            description: entry.description || "",
            summary: entry.summary || "",
            content: entry.content || "",
            normalizedTitle: normalizeText(entry.title),
            normalizedTags: normalizeText(tags.join(" ")),
            normalizedDescription: normalizeText(entry.description),
            normalizedSummary: normalizeText(entry.summary),
            normalizedContent: normalizeText(entry.content)
        };
    }

    function getSnippet(entry, tokens) {
        var previewSource = entry.description || entry.summary || entry.content;

        if (!previewSource) {
            return "";
        }

        if (!tokens.length) {
            return previewSource.slice(0, 180);
        }

        var loweredSource = previewSource.toLowerCase();
        var startIndex = -1;

        for (var index = 0; index < tokens.length; index += 1) {
            startIndex = loweredSource.indexOf(tokens[index]);

            if (startIndex !== -1) {
                break;
            }
        }

        if (startIndex === -1) {
            return previewSource.slice(0, 180);
        }

        var snippetStart = Math.max(0, startIndex - 60);
        var snippetEnd = Math.min(previewSource.length, startIndex + 120);
        var snippet = previewSource.slice(snippetStart, snippetEnd).trim();

        if (snippetStart > 0) {
            snippet = "..." + snippet;
        }

        if (snippetEnd < previewSource.length) {
            snippet += "...";
        }

        return snippet;
    }

    function createElement(tagName, className, textContent) {
        var element = document.createElement(tagName);

        if (className) {
            element.className = className;
        }

        if (typeof textContent === "string") {
            element.textContent = textContent;
        }

        return element;
    }

    function renderEmptyState(message, modifier) {
        results.replaceChildren();
        status.textContent = message;
        status.className = "search-status" + (modifier ? " " + modifier : "");
    }

    function renderResults(entries, query) {
        var tokens = tokenizeQuery(query);
        var fragment = document.createDocumentFragment();

        results.replaceChildren();

        if (!tokens.length) {
            renderEmptyState("Start typing to search titles, tags, descriptions, and content.", "search-status-empty");
            return;
        }

        if (!entries.length) {
            renderEmptyState("No matching entries found.", "search-status-empty");
            return;
        }

        status.textContent = entries.length + (entries.length === 1 ? " result" : " results") + " for \"" + query + "\"";
        status.className = "search-status";

        entries.forEach(function (entry) {
            var item = createElement("li", "search-result");
            var article = createElement("article", "search-result-card");
            var title = createElement("h2", "search-result-title");
            var link = createElement("a", "", entry.title);
            var meta = createElement("p", "search-result-meta");
            var snippet = createElement("p", "search-result-snippet", getSnippet(entry, tokens));

            link.href = entry.permalink;
            title.appendChild(link);
            article.appendChild(title);

            meta.textContent = entry.displayDate;

            if (entry.section) {
                meta.textContent += " in " + entry.section;
            }

            article.appendChild(meta);

            if (entry.tags.length) {
                var tagList = createElement("ul", "search-tag-list");

                entry.tags.forEach(function (tag) {
                    var tagItem = createElement("li", "search-tag-item");
                    var tagLabel = createElement("span", "search-tag", tag);

                    tagItem.appendChild(tagLabel);
                    tagList.appendChild(tagItem);
                });

                article.appendChild(tagList);
            }

            if (snippet.textContent) {
                article.appendChild(snippet);
            }

            item.appendChild(article);
            fragment.appendChild(item);
        });

        results.appendChild(fragment);
    }

    function rankEntries(entries, query) {
        var tokens = tokenizeQuery(query);

        if (!tokens.length) {
            return [];
        }

        return entries
            .map(function (entry) {
                var score = 0;
                var matchesAllTokens = tokens.every(function (token) {
                    var fields = [
                        entry.normalizedTitle,
                        entry.normalizedTags,
                        entry.normalizedDescription,
                        entry.normalizedSummary,
                        entry.normalizedContent
                    ];

                    return fields.some(function (field) {
                        return field.indexOf(token) !== -1;
                    });
                });

                if (!matchesAllTokens) {
                    return null;
                }

                tokens.forEach(function (token) {
                    if (entry.normalizedTitle.indexOf(token) !== -1) {
                        score += 8;
                    }

                    if (entry.normalizedTags.indexOf(token) !== -1) {
                        score += 5;
                    }

                    if (entry.normalizedDescription.indexOf(token) !== -1) {
                        score += 3;
                    }

                    if (entry.normalizedSummary.indexOf(token) !== -1) {
                        score += 2;
                    }

                    if (entry.normalizedContent.indexOf(token) !== -1) {
                        score += 1;
                    }
                });

                return {
                    entry: entry,
                    score: score
                };
            })
            .filter(Boolean)
            .sort(function (left, right) {
                if (right.score !== left.score) {
                    return right.score - left.score;
                }

                return (right.entry.date || "").localeCompare(left.entry.date || "");
            })
            .map(function (result) {
                return result.entry;
            });
    }

    function updateQueryParam(value) {
        var url = new URL(window.location.href);

        if (value) {
            url.searchParams.set("q", value);
        } else {
            url.searchParams.delete("q");
        }

        window.history.replaceState({}, "", url);
    }

    function attachKeyboardShortcut() {
        document.addEventListener("keydown", function (event) {
            var activeElement = document.activeElement;
            var tagName = activeElement && activeElement.tagName;
            var isTyping =
                activeElement &&
                (activeElement.isContentEditable ||
                    tagName === "INPUT" ||
                    tagName === "TEXTAREA" ||
                    tagName === "SELECT");

            if (event.key !== "/" || event.defaultPrevented || isTyping) {
                return;
            }

            event.preventDefault();
            input.focus();
            input.select();
        });
    }

    function bootstrap(entries) {
        var searchEntries = entries.map(buildSearchEntry);
        var initialQuery = new URLSearchParams(window.location.search).get("q") || "";

        attachKeyboardShortcut();

        input.value = initialQuery;
        renderResults(rankEntries(searchEntries, initialQuery), initialQuery);

        input.addEventListener("input", function (event) {
            var query = event.target.value.trim();
            updateQueryParam(query);
            renderResults(rankEntries(searchEntries, query), query);
        });
    }

    if (!indexUrl) {
        renderEmptyState("Search index is unavailable. Add `outputs = [\"html\", \"json\"]` to the search page front matter.", "search-status-error");
        return;
    }

    fetch(indexUrl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to fetch search index.");
            }

            return response.json();
        })
        .then(function (entries) {
            bootstrap(Array.isArray(entries) ? entries : []);
        })
        .catch(function () {
            renderEmptyState("The search index could not be loaded for this page.", "search-status-error");
        });
}());
