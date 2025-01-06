# Archie - Hugo theme
Archie is a minimal and clean theme for hugo with a markdown-ish UI.

Forked from [Ezhil Theme](https://github.com/vividvilla/ezhil)

## Demo

[Check the Demo](https://athul.github.io/archie/) hosted on GitHub Pages :smile: . You can find the source code to that in the `site` branch of this repository

![](/images/theme.png)
![](/images/archie-dark.png)
## Feature
- Google Analytics Script
- Callouts
- Tags
- Auto Dark Mode(based on system theme)
- Dark/Light Mode toggle
- tl:dr; frontamatter
- Table of contents
- Cache busting for CSS files
- Disqus Comments

## Installation
In your Hugo website directory, create a new folder named theme and clone the repo
```bash
$ mkdir themes
$ cd themes
$ git clone https://github.com/athul/archie.git
```
Edit the `config.toml` file with `theme="archie"`
For more information read the official [setup guide](https://gohugo.io/installation/) of Hugo.

If you encounter any issues with Google Analytics, update Hugo to v0.125.0 or
later and make sure your using the latest version of the theme.

## Writing Posts
Create a new `.md` file in the *content/posts* folder
```yml
---
title: Title of the post
description:
date:
tldr: (optional)
draft: true/false (optional)
tags: [tag names] (optional)
toc: true/false (optional)
---
```

## Credits
Forked from [Ezhil Theme](https://github.com/vividvilla/ezhil) and Licensed under MIT License
Inspired by design of blog.jse.li

----

## Config Options

### Custom CSS
Custom CSS files can be included though the `customcss` config parameter.

Note: CSS files should be placed under the `assets` directory e.g. `assets/css/first.css`.

```toml
[params]
	customcss = ["css/first.css", "css/second.css"]
```

### Callouts

There are five different types of callout, including this themes original callout and a custom one as well. These callouts are compatible with both light and dark theme modes. 

![Screenshot from 2025-01-04 19-22-43](https://github.com/user-attachments/assets/bcaf7c3c-2339-449f-8bcb-8a2906d7ddcf)


#### Original

This steup is to ensure backwards compatibility for previous callouts.

```markdown                                                                                                                                                                                                    
{{< callout emoji="⚡️" text="Original callout." >}}
```

#### Alert
```markdown
{{< callout type="alert" text="This is an alert callout." >}}
```

#### Custom

This include the ability to set your own callout emoji, title, and css style element.

```markdown
{{< callout type="custom" emoji="⚡️" title="Custom callout" text="This is custom text for a custom callout." style="background-color: transparent; border: 3px solid #d340e0;" >}}
```

#### Tip

```markdown
{{< callout type="tip" text="This is a tip callout." >}}
```

#### Warning

```markdown
{{< callout type="warning" text="This is a warning callout." >}}
```

## Config of the Demo Site

```toml
baseURL = "https://athul.github.io/archie/"
languageCode = "en-us"
title = "Archie"
theme="archie"
copyright = "© Athul"
# Code Highlight
pygmentsstyle = "monokai"
pygmentscodefences = true
pygmentscodefencesguesssyntax = true

disqusShortname = "yourDisqusShortname"

paginate=3 # articles per page

[params]
	mode="auto" # color-mode → light,dark,toggle or auto
	useCDN=false # don't use CDNs for fonts and icons, instead serve them locally.
	subtitle = "Minimal and Clean [blog theme for Hugo](https://github.com/athul/archie)"
	mathjax = true # enable MathJax support
	katex = true # enable KaTeX support

# Social Tags

[[params.social]]
name = "GitHub"
icon = "github"
url = "https://github.com/athul/archie"

[[params.social]]
name = "Twitter"
icon = "twitter"
url = "https://twitter.com/athulcajay/"

[[params.social]]
name = "GitLab"
icon = "gitlab"
url = "https://gitlab.com/athul/"

# Main menu Items

[[menu.main]]
name = "Home"
url = "/"
weight = 1

[[menu.main]]
name = "All posts"
url = "/posts"
weight = 2

[[menu.main]]
name = "About"
url = "/about"
weight = 3

[[menu.main]]
name = "Tags"
url = "/tags"
weight = 4
```
---

If you liked my work please consider supporting me on [BuymeACoffee](https://www.buymeacoffee.com/athulca)

<a href="https://www.buymeacoffee.com/athulca" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" height="41" width="174" ></a>
