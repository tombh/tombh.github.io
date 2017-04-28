---
date: 2017-04-28
layout: post
slug: headless-browser-tests-hello-world
title: Headless Browser Tests - Hello World
categories:
- Computing
---

These were run on Arch Linux using Chromium 57.

You don't need Selenium and all the Java that involves.
Both Chrome and Firefox (though it's not headless yet) have Selenium-compatible interfaces using
what's called the [Web Driver protocol](https://w3c.github.io/webdriver/webdriver-spec.html).
So let's start up Chrome/Chromium's background daemon that understands and listens for WD API
requests.    
`chromedriver --url-base=/wd/hub --verbose`

[WebdriverIO](http://webdriver.io/) is a small and user-friendly JS interface to the
Web Driver protocol (other wrappers are available).    
`npm install webdriverio`

Here's an actual interaction. Use whatever test framework you want
to assert expectations.
```js
const webdriverio = require('webdriverio');
const options = {
  port: 9515,
  logLevel: 'silent',
  desiredCapabilities: {
    browserName: 'chromium',
    chromeOptions: {
      // This is the magic that ends the days of needing an X server
      args: [
        'disable-gpu',
        'headless'
      ]
    }
  }
};

webdriverio
  .remote(options)
  .init()
  .url('http://www.google.com')
  .getTitle()
  .then(function (title) {
    console.log('Title was: ' + title);
  })
  .end();
```

## After thoughts
I wrote this because, as a newcomer, I had always associated full browser testing with virtual machines, installing Java and generally a lot of complexity. However, this is clearly not the case. Of course I suspect such things are needed by the big players such as Sauce Labs and Browser Stack, but for local development purposes we just need to be able to write new tests knowing that there's a good chance they'll work on said big player's platforms.

Is it time the phrase 'end to end browser testing' stopped being synonymous with Selenium?

