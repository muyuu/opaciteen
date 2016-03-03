# opaciteen

this code is javascript hover opacity library for browser(contain ie8).

## dependences
- jquery@1.12.0

## install
npm install --save-dev opaciteen

## usage

### browserify
```
var opaciteen = require('opaciteen');

var opaciteen01 = opaciteen();

var opaciteen02 = opaciteen({
    root: "js-opaciteenpattern02",
    duration: 500 // msec
});
```

### other
```
<script src="jquery.js"></script>
<script src="opaciteen.js"></script>
<script src="app.js"></script> // module load

# app.js
var opaciteen01 = opaciteen();
```


