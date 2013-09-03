act.js
======

Reactive, minimalist application development.

## Introduction

Act.js is a set of tools to help streamline your JavaScript application. From small building blocks to flow management, Act.js does the tough work for you.

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

## $calc

A calculated value, takes a single function to be processed when the scope changes. Returns a Calculation.

```js
lastName = act.$prop(person, 'lastName');

act.$prop(person, 'fullName', act.$calc(function () {
    return person.firstName + ' ' + person.lastName;
}));

lastName.set('Olyphant');

console.log(person.fullName); // Timothy Olyphant
```

## $ctrl

The Control automatically does most of the above logic for you, in that you no longer need to call `$prop` to set up properties. 
Your application logic should live in a Control. Here's an example:

```js
var appCtrl = act.$ctrl(function (app) {
    app.name = "My App";

    app.tagline = app.$calc(function () {
        return app.name + ' is the very best app.';
    });
});

appCtrl.$prop.name.set('Bee Tracker');

console.log(appCtrl.tagline); // Bee Tracker is the very best app.
```

