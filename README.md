## Demo
[Check the Demo](https://fruw.org)

## Feature
- Google Analytics Script
- Callouts
- Tags
- Cache busting for CSS files

## Installation
In your Hugo website directory, create a new folder named themes and clone the repo
```bash
$ mkdir themes
$ git submodule add https://github.com/fruworg/themu themes/themu
```
Edit the `config.toml` file with `theme="themu"`
For more information read the official [setup guide](https://gohugo.io/installation/) of Hugo.

## Writing Posts
Create a new `.md` file in the *content/posts* folder
```yml
---
title: Title of the post
description:
date:
draft: true/false (optional)
tags: [tag names] (optional)
---
```

## Config Options

### Custom CSS
Custom CSS files can be included though the `customcss` config parameter.

Note: CSS files should be placed under the `assets` directory e.g. `assets/css/first.css`.

```toml
[params]
	customcss = ["css/first.css", "css/second.css"]
```


## Config of the Demo Site

```toml
baseURL = "https://<name>.github.io"
languageCode = "en-us"
title = "<name>"
theme="themu"
# Code Highlight
pygmentsstyle = "monokai"
pygmentscodefences = true
pygmentscodefencesguesssyntax = true

paginate=3 # articles per page

[params]
	mode="auto" # color-mode → light,dark,toggle or auto
	useCDN=false # don't use CDNs for fonts and icons, instead serve them locally.
	subtitle = "Minimal and Clean [blog theme for Hugo](https://github.com/fruworg)"
	mathjax = true # enable MathJax support
	katex = true # enable KaTeX support

# Social Tags

[[params.social]]
name = "GitHub"
icon = "github"
url = "https://github.com/<name>"

[[params.social]]
name = "Twitter"
icon = "twitter"
url = "https://twitter.com/<name>"

[[params.social]]
name = "GitLab"
icon = "gitlab"
url = "https://gitlab.com/<name>"

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

## Credits
Forked from [Archie Theme](https://github.com/athul/archie) and Licensed under MIT License
