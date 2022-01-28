# ArchieType - Hugo theme
ArchieType is a fork of [Archie](https://github.com/athul/archie) theme by Athul Cyriac Ajay

Please check out the original repository for demo website and sample config.

## Feature
- Google Analytics Script
- Callouts
- Tags
- Auto Dark Mode(based on system theme)
- Dark/Light Mode toggle
- tl:dr; frontamatter
- Cache busting for CSS files

## Installation
Go to your Hugo site directory and add the following
```
git submodule add https://github.com/marbuka/archietype.git themes/archietype
```
Edit the `config.toml` file with `theme="archietype"`
For more information read the official [setup guide](https://gohugo.io/overview/installing/) of Hugo.

## Credits
Forked from [Archie Theme](https://github.com/athul/archie) and Licensed under MIT License

----

## Config Options

### Custom CSS
Custom CSS files can be included though the `customcss` config parameter.

Note: CSS files should be placed under the `assets` directory e.g. `assets/css/first.css`.

```toml
[params]
	customcss = ["css/first.css", "css/second.css"]
```
