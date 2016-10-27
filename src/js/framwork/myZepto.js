(function(global,factory){
    if(typeof define === 'function' && define.amd)
        define(function(){return factory(global)});
    else 
        factory(global);
}(this,function(window){
    var Zepto=(function(){
        var undefined,key,$,classList,emptyArray=[],concat=emptyArray.concat,filter=emptyArray.filter,slice=emptyArray.slice,
            document=window.document,
            elementDisplay={},classCache={},
            cssNumer={'column-count':1,'columns':1,'font-weight':1,'line-height':1,'opacity':1,'z-index':1,'zoom':1},
            fragmentRE = /^\s*<(\w+|!)[^>]*>/,
            singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
            rootNodeRE = /^(?:body|html)$/i,
            capitalRE = /([A-Z])/g,
            methodAttributes=['val','css','html','text','data','width','height','offset'],
            ajacencyOperators=['after','prepend','before','append'],
            table=document.createElement('table'),
            tableRow=document.createElement('tr'),
            containers={
                'tr':document.createElement('tbody'),
                'tbody':table,'thead':table,'tfoot',table,
                'td':tableRow,'th':tableRow,'*':document.createElement('div')
            },
            readyRE = /complete|loaded|interactive/,
            simpleSelectorRE = /^[\w-]*$/,
            class2type={},
            toString=class2type.toString,
            zepto={},
            camelize,uniq,
            tempParent=document.createElement('div'),
            propMa{
                'tabindex':'tabIndex',
                'readonly':'readOnly',
                'for':'htmlFor',
                'class':'className',
                'maxlength':'maxLength',
                'cellspacing':'cellSpacing',
                'cellpadding':'cellPadding',
                'rowspan':'rowSpan',
                'colspan':'colSpan',
                'usemap':'useMap',
                'frameborder':'frameBorder',
                'contenteditable':'contentEditable'
            },
            isArray=Array.isArray||function(object){return object instanceof Array};
        zepto.matches=function(element,selector){
            if(!selector || !element ||element.nodeType!===1) return false;
            var matchesSelector=element.matches||element.webkitMatchesSelector||
                                element.mozMatchesSelector||element.oMatchesSelector||
                                element.matchesSelector;
            if(matchesSelector) return matchesSelector.call(element,selector);
            var match,parent=element.parentNode,temp=!parent;
            if(temp)(parent=tempParent).appendChild(element);
            match=~zepto.qsa(parent,selector).indexOf(element);
            temp=
        }
    })
}));