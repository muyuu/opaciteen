(function(definition){
    "use strict";

    var moduleName = "opaciteen";

    var root = (typeof self === "object" && self.self === self && self) || (typeof global === "object" && global.global === global && global);

    if (typeof exports === "object"){
        module.exports = definition(root, require("jquery"));
    } else {
        root[moduleName] = definition(root, $);
    }
})(function(root, $){
    "use strict";

    // -------------------------------------------------------
    // utility functions
    // -------------------------------------------------------
    const isUndefined = (x)=>{ return x === void 0; };
    const trimDot = (string)=>{ return string.replace(".", ""); };
    const trimSome = (string, some)=>{ return string.replace(some, ""); };
    const putBothClasses = (string, prefix)=>{
        return trimDot(string) + " " + trimSome(trimDot(string), prefix);
    };

    const supportTransition = ()=>{
        if( 'WebkitTransition' in document.body.style ||
            'MozTransition' in document.body.style ||
            'OTransition' in document.body.style ||
            'transition' in document.body.style
        ) return true;
        return false;
    };


    // -------------------------------------------------------
    // module
    // -------------------------------------------------------
    function factory(param){

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


    function Module(opt, moduleRoot){

        // options
        this.opt = {
            prefix: "js-",

            //state
            addedClass: !isUndefined(opt.addedClass) ? opt.addedClass : "opaciteen--transition-hover",

            // animation
            volume: !isUndefined(opt.volume) ? opt.volume : 0.6,
            duration: !isUndefined(opt.duration) ? opt.duration : 300,

            // callback
            onhover     : opt.onhover || null,
            onanimateend: opt.onanimateend || null
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


    Module.fn.animate = function(val){
      if( !isUndefined(val) ) return this._animation;

      this._animation = !!val;
      return this;
    }


    Module.fn.hover = function(val){
      if( !isUndefined(val) ) return this._hover;

      this._hover = !!val;
      return this;
    }


    Module.fn.setHoverEvent = function(){

        this.$root.hover(
            ()=>{ this.onhoverHandler(); },
            ()=>{ this.outhoverHandler(); }
        );
    };


    Module.fn.onhoverHandler = function(){
        this.hover(true);

        // onhover callback
        if( typeof this.opt.onhover === "function") this.opt.onhover(this.$root);

        if(supportTransition()) {
            this.$root.addClass(this.addedClass);
        } else{
            this.$root.animate({opacity: this.opt.volume}, this.opt.duration);
        }
    };


    Module.fn.outhoverHandler = function(e){
        this.hover(true);

        if(supportTransition()) {
            this.$root.removeClass(this.addedClass);
        } else{
            this.$root.animate({opacity: 1}, this.opt.duration);
        }
    };

    return factory;
});
