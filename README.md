# Jughead - A Hugo theme

Jughead is a minimal and clean theme for hugo with a markdown-ish UI.

Fork of [Archie](https://github.com/athul/archie) which is a fork of
[Ezhil](https://github.com/vividvilla/ezhil).

## [Demo](https://ananthb.github.io/jughead)

![Theme](/images/theme.png)
![Dark mode](/images/archie-dark.png)

## Features

- Tags
- Auto Dark Mode (based on system theme)
- Dark/Light Mode toggle
- Disqus Comments

## Installation

Add jughead to your hugo config files in the modules section.

```toml
[module]
[[module.imports]]
    path = 'github.com/ananthb/jughead'
```

For more information read the official [setup guide](https://gohugo.io/installation).

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
---
```

## Config Options

### Custom CSS

Include your own styles by setting the `customcss` config param to
a list of css files located in the `assets` directory e.g. `assets/css/custom.css`.

```toml
[params]
  customcss = ["css/first.css", "css/second.css"]
```

## Sample Config

```toml
baseURL = "https://ananthb.github.io/jughead/"
languageCode = "en-in"
title = "Archie"
copyright = "© Your Name Here"
paginate = 3

# Code Highlight
pygmentsstyle = "monokai"
pygmentscodefences = true
pygmentscodefencesguesssyntax = true

disqusShortname = "yourDisqusShortname"

[params]
  mode = "auto" # color-mode → light,dark,toggle or auto
  useCDN = false # don't use CDNs for fonts and icons, instead serve them locally.
  subtitle = "Minimal and Clean [blog theme for Hugo](https://github.com/ananthb/jughead)"
  mathjax = true # enable MathJax support
  katex = true # enable KaTeX support

# Social Tags

[[params.social]]
name = "GitHub"
icon = "github"
url = "https://github.com/ananthb/archie"

[[params.social]]
name = "Twitter"
icon = "twitter"
url = "https://twitter.com/your-name-here/"

[[params.social]]
name = "GitLab"
icon = "gitlab"
url = "https://gitlab.com/ananthb/"

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

## [License](LICENSE)

Fork of [archie](https://github.com/athul/archie) which is a fork of
[Ezhil](https://github.com/vividvilla/ezhil). Inspired by the design of [blog.jse.li](blog.jse.li).

Jughead is available under the terms of the MIT License.
