act.js
======

Reactive, minimalist application development.

## Introduction

Act.js is a set of tools to help streamline your JavaScript application. From small building blocks to flow management, Act.js does the tough work for you.

## $calc

A calculated value, takes a single function to be processed when the scope changes. Returns a Calculation.

## $ctrl

The most important part of Act.js is the Control. This is where application logic lives. Here's an example:

```js
var appCtrl = act.$ctrl(function (app) {
    app.name = "My App";

    app.tagline = app.$calc(function () {
        return app.name + ' is the very best app.';
    });
});

console.log(appCtrl.tagline); // My App is the very best app.
```

