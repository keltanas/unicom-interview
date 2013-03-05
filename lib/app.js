/**
 * Application config
 * @author: keltanas
 */
require.config({
    "baseUrl" : "/lib",
    "paths" : {
        "vend" : "../vendor"
    },
    "shim" : {
        'vend/backbone': {
            deps: ['vend/underscore', 'jquery', 'vend/json2'],
            exports: 'Backbone'
        },
        'vend/underscore': {
            exports: '_'
        },
        'vend/json2': {
            exports: 'JSON'
        }
    },
    "deps": [
        "jquery",
        "vend/backbone",
        "vend/bootstrap/js/bootstrap",
        "bus",
        "view/catalog",
        "view/basket"
    ],
    "callback" : function(
        $,
        Backbone,
        undefined,
        bus,
        CatalogView,
        BasketView
    ){
        $(document).ready(function(){
            var catalog = new CatalogView({
                "el" : $('#catalog'),
                "bus": bus
            });
            catalog.collection.add({"name":"Product1","price":"100"},{silent:true});
            catalog.collection.add({"name":"Product2","price":"200"},{silent:true});
            catalog.collection.add({"name":"Product3","price":"300"},{silent:true});
            catalog.collection.add({"name":"Product4","price":"400"});

            var basket = new BasketView({
                "el" : $("#basket"),
                "bus": bus
            }).render();
        });
    }
});
