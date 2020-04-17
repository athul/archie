# Archie - Hugo theme
Archie is a minimal and clean theme for hugo with a markdown-ish UI.

Forked from [Ezhil Theme](https://github.com/vividvilla/ezhil)

## Demo

[Check the Demo](https://athul.github.io/archie/) hosted on GitHub Pages :smile:

![](/images/theme.png)
![](/images/archie-dark.png)
## Feature
- Google Analytics Script
- Callouts
- Tags
- Auto Dark Mode(based on system theme)
- tl:dr; frontamatter

## Installation
In your Hugo website directory, create a new folder named theme and clone the repo
```bash
$ mkdir themes
$ cd themes
$ git clone https://github.com/athul/archie.git
```
Edit the `config.toml` file with `theme="archie"`
For more information read the official [setup guide](https://gohugo.io/overview/installing/) of Hugo.

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

## Credits
Forked from [Ezhil Theme](https://github.com/vividvilla/ezhil) and Licensed under MIT License 
Inspired by design of blog.jse.li
