/**
 * SAllFY JST
 * JavaScript lite templater
 * @author: ArNic https://github.com/ArNic
 * @link: https://github.com/ArNic/SAllFY-JST
 * @type {{dir: string, templates: {}, cache: {}, defaults: {template: {cachable: boolean}}, methods: {merge: merge, renderer: renderer, append: append, prepend: prepend, change: change, clear: clear}}}
 */
tpl={
    /**
     * template folder
     */
    dir:'tpl/',
    /**
     * templates data
     */
    templates:{},
    /**
     * Cache container
     */
    cache:{},
    /**
     * default values
     */
    defaults:{
        /**
         * template data defaults
         */
        template:{
            cachable:true
        }
    },
    /**
     * Library methods
     */
    methods:{
        /**
         * Merge function, for merge options
         * @private
         * @param obj1 def array
         * @param obj2 new array
         * @returns {{}}
         */
        merge:function(obj1,obj2){
            var obj3 = {};
            for (var attrname in obj2){ obj3[attrname] = obj2[attrname]; }
            for (var attrname in obj1){ obj3[attrname] = obj1[attrname]; }
            return obj3;
        },
        /**
         * Render template
         * @private
         * @param {string} name template name
         * @param {object} data content (optional)
         * @returns {string}
         */
        renderer:function(name,data){
            var tmp=tpl.templates[name];
            var content=''
            if(tmp){
                if(typeof tmp==='string'){
                    tmp={url:tmp}
                }
                if(!tmp.url){
                    console.log('Undefined {url} in template: '+name);
                }else{
                    tmp=tpl.methods.merge(tmp,tpl.defaults.template);
//                    console.log(tmp);
                    if(tmp.cachable&&tpl.cache[name]){
                        content=tpl.cache[name];
                    }else{
                        $.ajax({
                            'async': false,
                            'global': false,
                            'dataType': 'html',
                            'url': tpl.dir+tmp.url+'.jtpl',
                            'success': function (data){
                                content = data;
                                if(tmp.cachable){
                                    tpl.cache[name]=content;
                                }
                            }
                        });
                    }
                    if(!data){
                        data=new Array();
                        old_ln=0;
                    }else{
                        var old_ln=Object.keys(data).length;
                        if(old_ln>0&&tmp.before!==undefined){
                            /**
                             * if defined before render function
                             * @type {*}
                             */
                            data=tmp.before(data);
                        }
                    }
                    if(old_ln==0||old_ln>0&&Object.keys(data).length>0){
                        $.each(data,function(k,v){
                            if(v!==undefined) content=content.replace(new RegExp('\%\%_'+k+'_\%\%','g'),v);
                        });
                        content=content.replace(new RegExp('\%\%_.*?_\%\%','g'),'');

                    }else{
                        content='';
                    }
                }
            }else{
                content='';
                console.log('Undefined template: '+name);
            }
            return content;
        },
        /**
         * Append rendered template in container
         * @public
         * @param {string} id contaner id (find in attribute jtpl)
         * @param {object|string} name template name
         * @param {object|string} data content (optional)
         */
        append:function(id,name,data){
            if(name){
                if(typeof name==='object'&&name.length>0){
                    $.each(name,function(k,v){
                        tpl.methods.append(id,v.name,v.data);
                    });
                }else{
                    $('[jtpl="'+id+'"]').append(tpl.methods.renderer(name,data));
                }
            }else{
                console.log('Undefined append name');
            }
        },
        /**
         * Prepend rendered template in container
         * @public
         * @param id
         * @param name
         * @param data
         */
        prepend:function(id,name,data){
            if(name){
                if(typeof name==='object'&&name.length>0){
                    $.each(name,function(k,v){
                        tpl.methods.prepend(id,v.name,v.data);
                    });
                }else{
                    $('[jtpl="'+id+'"]').prepend(tpl.methods.renderer(name,data));
                }
            }else{
                console.log('Undefined prepend name');
            }
        },
        /**
         * Change rendered template in container
         * @public
         * @param id
         * @param name
         * @param data
         */
        change:function(id,name,data){
            if(name){
                if(typeof name==='object'&&name.length>0){
                    $('[jtpl="'+id+'"]').html('');
                    $.each(name,function(k,v){
                        tpl.methods.append(id,v.name,v.data);
                    });
                }else{
                    $('[jtpl="'+id+'"]').html(tpl.methods.renderer(name,data));
                }
            }else{
                if(id&&data){
                    $('[jtpl="'+id+'"]').html(data);
                }else if(!id){
                    console.log('Undefined change name');
                }else if(!data){
                    console.log('Space data in id');
                }
            }
        },
        /**
         * Clear container
         * @public
         * @param id
         * @param name
         * @param data
         */
        clear:function(id){
            $('[jtpl="'+id+'"]').html('');
        }

    }
}