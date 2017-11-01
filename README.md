# Using auto argument in JavaScript like Scala

[![GitHub stars](https://img.shields.io/github/stars/HuQingyang/babel-plugin-auto-argument.svg?style=social&label=Stars&style=plastic)](https://github.com/HuQingyang/babel-plugin-auto-argument)
[![GitHub forks](https://img.shields.io/github/forks/HuQingyang/babel-plugin-auto-argument.svg?style=social&label=Fork&style=plastic)](https://github.com/HuQingyang/babel-plugin-auto-argument)
[![npm](https://img.shields.io/npm/dw/babel-plugin-auto-argument.svg)](https://www.npmjs.com/package/babel-plugin-auto-argument)
[![npm](https://img.shields.io/npm/v/babel-plugin-auto-argument.svg)](https://www.npmjs.com/package/babel-plugin-auto-argument)
[![npm](https://img.shields.io/npm/l/babel-plugin-auto-argument.svg)](https://www.npmjs.com/package/babel-plugin-auto-argument)

**See Also:**
* Using two-way data binding in JSX: [babel-plugin-jsx-two-way-binding](https://github.com/HuQingyang/babel-plugin-jsx-two-way-binding) 
* Using for-directive in JSX: [babel-plugin-jsx-for-directive](https://github.com/HuQingyang/babel-plugin-jsx-for-directive)
* Using if-directive in JSX: [babel-plugin-jsx-if-directive](https://github.com/HuQingyang/babel-plugin-jsx-if-directive)


## 1. Install
`npm install --save-dev babel-plugin-auto-argument`

## 2. Basic Usage
Edit your __.babelrc__ file:
```json
{
  "plugins": [
    "auto-argument"
  ]
}
```
In your js file:
```js
[1, 2, 3].map(_ * 2)
```
And it will be compiled to:
```js
[1, 2, 3].map(function (_) { 
    return _ * 2
})
```

## 3. Usage with custom variable name
Edit your __.babelrc__ file:
```json
{
  "plugins": [
    "auto-argument",
    {
      "variableName": "$"
    }
  ]
}
```
In your js file:
```js
[1, 2, 3].map($ * 2)
```