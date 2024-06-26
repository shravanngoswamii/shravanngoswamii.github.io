---
slug: strings-in-js
title: Strings in Javascript
authors: shravan
tags: [javascript, technical, personal]
---

Well, Javascript have many string methods and in this article, we will practice all of them!
<!-- truncate -->

## Get all string methods from console

After this I will be explaining all these methods!

```js title="Code"
const s = new String("Philosophy")
console.log(s)
```

```Output title="Output"
String { "hello" }
​
0: "h"
​
1: "e"
​
2: "l"
​
3: "l"
​
4: "o"
​
length: 5
​
<primitive value>: "hello"
​
<prototype>: String { "" }
​​
anchor: function anchor()
​​
at: function at()
​​
big: function big()
​​
blink: function blink()
​​
bold: function bold()
​​
charAt: function charAt()
​​
charCodeAt: function charCodeAt()
​​
codePointAt: function codePointAt()
​​
concat: function concat()
​​
constructor: function String()
​​
endsWith: function endsWith()
​​
fixed: function fixed()
​​
fontcolor: function fontcolor()
​​
fontsize: function fontsize()
​​
includes: function includes()
​​
indexOf: function indexOf()
​​
isWellFormed: function isWellFormed()
​​
italics: function italics()
​​
lastIndexOf: function lastIndexOf()
​​
length: 0
​​
link: function link()
​​
localeCompare: function localeCompare()
​​
match: function match()
​​
matchAll: function matchAll()
​​
normalize: function normalize()
​​
padEnd: function padEnd()
​​
padStart: function padStart()
​​
repeat: function repeat()
​​
replace: function replace()
​​
replaceAll: function replaceAll()
​​
search: function search()
​​
slice: function slice()
​​
small: function small()
​​
split: function split()
​​
startsWith: function startsWith()
​​
strike: function strike()
​​
sub: function sub()
​​
substr: function substr()
​​
substring: function substring()
​​
sup: function sup()
​​
toLocaleLowerCase: function toLocaleLowerCase()
​​
toLocaleUpperCase: function toLocaleUpperCase()
​​
toLowerCase: function toLowerCase()
​​
toString: function toString()
​​
toUpperCase: function toUpperCase()
​​
toWellFormed: function toWellFormed()
​​
trim: function trim()
​​
trimEnd: function trimEnd()
​​
trimLeft: function trimStart()
​​
trimRight: function trimEnd()
​​
trimStart: function trimStart()
​​
valueOf: function valueOf()
​​
Symbol(Symbol.iterator): function Symbol.iterator()
​​
<primitive value>: ""
​​
<prototype>: Object { … }
```


### 2. at() method
It's an array methods that can be used to find an element at some particular index.

```js title="Code"
const arr = ["Nietzsche", "Socrates", "Plato", "Aristotle", "Dostoevsky"]
console.log(arr.at(0))
```

```Output title="Output"
Nietzsche
```

```js title="Code"
console.log(arr.at(3))
```

```Output title="Output"
Aristotle
```

```js title="Code"
console.log(arr.at(-3))
```

```Output title="Output"
Plato
```

## Deprecated String Methods

:::warning
All these below methods are deprecated in Javascript
:::

### 1. anchor() method

```js title="Code"
const anchorExample = s.anchor("Anchor Tag Example");
console.log(anchorExample)
```

This method returns a HTML `<a>` tag but without `href` attribute.

```Output title="Output"
<a name="Anchor Tag Example">Philosophy</a>
```

### big() method

practice in progress...