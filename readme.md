
<h4 align="center">A program to extract YouTube palylist's data</h4>

<p align="center">
 • <a href="#key-features">Key Features</a> 
 • <a href="#how-to-use">How To Use</a> 
</p>

![screenshot](https://github.com/shaswat97-crypto/media/blob/master/ytgif.gif)


## Key Features

* Implementd scroll which makes the program capable of extrcating data from playlists of max length supported by YouTube
* Data is provided in excel format for further reference
* Data is provided in json format, which can be used for other applications


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/shaswat97-crypto/yt-analyser

# Go into the repository
$ cd yt-analyser

# Install dependencies
$ npm init -y
$ npm install puppeteer
$ npm install fs
$ npm install path
$ npm install xlsx

# Run the app
$ node ytPlaylistAnalyser.js
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [path](https://www.npmjs.com/package/path)
- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [xlsx](https://www.npmjs.com/package/xlsx)



