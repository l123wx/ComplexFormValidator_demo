## 常用的 validator Rules

在编写custom ValidatorRule时，对空的值应该进行过滤，当值为空时，直接走成功的回调，eg:

```js
function isNumber (value: any, callback: Callback) {
    // 对空值进行判断
    if (value && !isWeakNumber(value)) {
        return callback('must_number')
    }
    callback()
}
```

这样就不会对非必需的字段进行判断，对于必填的字段，可以自行添加required: true的规则