(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, (function () {
        var current = global.Layouter;
        var exports = global.Layouter = factory();
        exports.noConflict = function () { 
            global.Layouter = current; 
            return exports; 
        };
    }()));
} (this, function () {
    'use strict';
    // AJAX
    function getAJAX()
    {
        return window.ActiveXObject? new ActiveXObject("Microsoft.XMLHTTP")
                : window.XMLHttpRequest? new XMLHttpRequest()
                    : undefined;
    }
    // 讀取內容
    function getContent(url)
    {
        const content = getAJAX();

        content.open("GET", url, false);

        content.send();

        return content.status === 200?
            content.response : undefined;
    }
    // 讀取block
    function getBlock(content, target)
    {
        if ( content.match( new RegExp(`{% block ${target} %}`) ) )
        {
            content = content.split(`{% block ${target} %}`)[1];
            if ( content.match( new RegExp(`{% endblock %}`) ) )
            {
                return content.split(`{% endblock %}`)[0];
            }
        }
        return "";
    }

    function init (isOpen)
    {
        function open(url)
        {
            if ( isOpen || typeof document === 'undefined' || document.addEventListener === undefined ) {
                return
            }

            let content = getContent (url);

            if ( content.match( new RegExp(`^{% extends "(.*)" %}`) ) ) {
                let path = content.slice(0, content.indexOf("%}")).split('\"')[1],
                    layout = getContent(path);
                
                content = layout ?
                    layout.replace("{% block head %}", getBlock(content, "head"))
                            .replace("{% block content %}", getBlock(content, "content"))
                                : `<p>ERROR : ${path} 404 (Not Found)</p>`;
            }
            else {
                content = "<p>ERROR : {% extends \"layout.html\" %} wrong format OR undefined</p>";
            }
            
            document.addEventListener ("DOMContentLoaded", (function () {
                document.write(content);
            }), false);
            
            isOpen = true;
        }

        return Object.create(
            {
                open : open
            }
        );
    }
    
    var api = init(false);

    return api;

}));