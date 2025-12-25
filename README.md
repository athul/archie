# Psammites Lab Hugo Theme

A minimal and clean theme for hugo used by Psammites Lab Blog.

Forked from [Archie Theme](https://github.com/athul/archie)

## Credits

Forked from [Archie Theme](https://github.com/athul/archie) and Licensed under MIT License.

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

If you liked his work please consider supporting [Athul](https://github.com/athul) on [BuymeACoffee](https://www.buymeacoffee.com/athulca)

<a href="https://www.buymeacoffee.com/athulca" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" height="41" width="174" ></a>
