
# Quick Start

```js
var validcode = require('validcode');

var str = '123abcd';
str += validcode.generate(str)

console.log(validcode.valid(str))
// output true
```
