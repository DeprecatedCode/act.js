act.js
======

Reactive, minimalist application development.

## Introduction

Act.js is a set of tools to help streamline your JavaScript application. From small building blocks to flow management, Act.js does the tough work for you. It's old-fashioned in the sense that it does not rely on watchers or setters/getters for operation.

## $prop

Creates a property on an object. Example:

```js
var person = {};

var firstNameProp = act.$prop(person, 'firstName');
firstNameProp.set('Bruce');

console.log(person.firstName); // Bruce
```

Properties are also automatically cached on the object under `$prop`:

```js
person.$prop.firstName.set('Timothy');

console.log(person.firstName); // Timothy
```

## $scan

It would become tedious to call `$prop` for every property on an object, so `$scan` will do that for you. Example:

```
var butterfly = {color: null, weight: null};

act.$scan(butterfly);

butterfly.$prop.color.set('orange');

console.log(butterfly.color); // orange
```

## $calc

A calculated value, takes a single function to be processed when the scope changes. Returns a Calculation.

```js
lastName = act.$prop(person, 'lastName');

act.$prop(person, 'fullName', act.$calc(function () {
    return person.firstName + ' ' + person.lastName;
}));

lastName.set('Olyphant');

person.$prop.fullName.$run();

console.log(person.fullName); // Timothy Olyphant
```

## $ctrl

The Control automatically does most of the above logic for you, in that you no longer need to call `$prop` or even `$scan` to set up properties. 
Your application logic should live in a Control. Here's an example:

```js
var appCtrl = act.$ctrl(function (app) {
    app.name = "My App";

    app.tagline = act.$calc(function () {
        return app.name + ' is the very best app.';
    });
});

appCtrl.$prop.name.set('Bee Tracker');

console.log(appCtrl.tagline); // Bee Tracker is the very best app.
```

## $now / $wait / $tick

Async values made easy. These methods both take a number of seconds to delay. The only difference is that `$tick` sets an interval, so the event will fire continuously. Examples:

```js
var coordsCtrl = act.$ctrl(function(coords) {

    coords.x = act.$now(5).$wait(2).then(10).$wait(2).then(15);

    coords.y = act.$now(100).$tick(1).then(function () { return coords.y + 100; });

});

[0, 1, 2, 3, 4, 5, 6].map(function (t) {
    setTimeout(function () {
        console.log([coords.x, coords.y]);
    }, t * 1000);
});

//
```
