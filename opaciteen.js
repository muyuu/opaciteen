"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (definition) {
    "use strict";

    var moduleName = "opaciteen";

    var root = (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" && global.global === global && global;

    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module.exports = definition(root, require("jquery"));
    } else {
        root[moduleName] = definition(root, $);
    }
})(function (root, $) {
    "use strict";

    // -------------------------------------------------------
    // utility functions
    // -------------------------------------------------------

    var isUndefined = function isUndefined(x) {
        return x === void 0;
    };
    var trimDot = function trimDot(string) {
        return string.replace(".", "");
    };
    var trimSome = function trimSome(string, some) {
        return string.replace(some, "");
    };
    var putBothClasses = function putBothClasses(string, prefix) {
        return trimDot(string) + " " + trimSome(trimDot(string), prefix);
    };

    var supportTransition = function supportTransition() {
        if ('WebkitTransition' in document.body.style || 'MozTransition' in document.body.style || 'OTransition' in document.body.style || 'transition' in document.body.style) return true;
        return false;
    };

    // -------------------------------------------------------
    // module
    // -------------------------------------------------------
    function factory(param) {

        var rootElement = ".js-opaciteen";
        var opt = !isUndefined(param) ? param : {};

        var $list;
        if (isUndefined(opt.root)) $list = $(rootElement);
        if (!isUndefined(opt.root)) $list = opt.root instanceof jQuery ? param.root : $(param.root);

        var length = $list.length;
        if (length < 0) return false;

        var mappedlist = [];
        for (var i = 0; i < length; i++) {
            mappedlist[i] = new Module(opt, $list[i]);
        };
        return mappedlist;
    }

    function Module(opt, moduleRoot) {

        // options
        this.opt = {
            prefix: "js-",

            //state
            addedClass: !isUndefined(opt.addedClass) ? opt.addedClass : "opaciteen--transition-hover",

            // animation
            volume: !isUndefined(opt.volume) ? opt.volume : 0.6,
            duration: !isUndefined(opt.duration) ? opt.duration : 300,

            // callback
            onOpen: opt.onOpen || null,
            onClick: opt.onClick || null,
            onAnimateEnd: opt.onAnimateEnd || null
        };

        // elements
        this.$root = $(moduleRoot);

        // classes
        this.addedClass = putBothClasses(this.opt.addedClass, this.opt.prefix);

        // states
        this._hover = false;
        this._animation = false;

        // init
        this.setHoverEvent();
    }

    Module.fn = Module.prototype;

    Module.fn.animate = function (val) {
        if (!isUndefined(val)) return this._animation;

        this._animation = !!val;
        return this;
    };

    Module.fn.hover = function (val) {
        if (!isUndefined(val)) return this._hover;

        this._hover = !!val;
        return this;
    };

    Module.fn.setHoverEvent = function () {
        var _this = this;

        this.$root.hover(function () {
            _this.onhoverHandler();
        }, function () {
            _this.outhoverHandler();
        });
    };

    Module.fn.onhoverHandler = function () {
        this.hover(true);

        if (supportTransition()) {
            this.$root.addClass(this.addedClass);
        } else {
            this.$root.animate({ opacity: this.opt.volume }, this.opt.duration);
        }
    };

    Module.fn.outhoverHandler = function (e) {
        this.hover(true);

        if (supportTransition()) {
            this.$root.removeClass(this.addedClass);
        } else {
            this.$root.animate({ opacity: 1 }, this.opt.duration);
        }
    };

    return factory;
});