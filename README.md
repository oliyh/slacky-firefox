#Slacky - Memes as a Service
Create all the memes directly from your browser

# Installation

Install the latest version at https://slacky-server.herokuapp.com#firefox

# Usage

1. Type `/meme` into any text input to open the dialogue.
2. Type in your meme command and press Enter
3. When you meme has been generated it will be inserted back into your text input as a url

Alternatively, just open from the Firefox toolbar by clicking on the icon.
Learn the meme syntax at https://slacky-server.herokuapp.com

# Development

## Discrete

```
jpm run -b \`which firefox\` --profile ./firefox-profile
```

## Continuous (not very stable)

1. Install [Extension Auto-Installer](https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/) into Firefox
2. Run `jpm watchpost --post-url http://localhost:8888/` to automatically push changes into Firefox
3. Enable [Add-on Debugger](https://developer.mozilla.org/en-US/Add-ons/Add-on_Debugger)
4. Optionally [set the logging level](https://blog.mozilla.org/addons/2013/03/27/changes-to-console-log-behaviour-in-sdk-1-14/) down to INFO

## Demo page
Open [resource://slacky/data/demo.html](resource://slacky/data/demo.html)

# Build

`jpm xpi`

# Contributions
