/**
 * List of position
 * @author: Nikolay Ermin <keltanas@gmail.com>
 */
define("model/basket",[
    "vend/backbone",
    "model/position"
],function( Backbone, Position ){
    return Backbone.Collection.extend({

        "model" : Position,

        "url" : "/basket",

        // Отсортированная коллекция
        "comparator" : function(obj) {
            return obj.get("name");
        },

        // Поскольку коллекции не умеют сохранятся, определим этот метод
        "save" : function(options) {
            options = $.extend(true, {
                success: function() {}, error: function(){}
            }, options);

            $.ajax({ type:'POST', url: '/basket', data: JSON.stringify( this )})
                .done(options.success)
                .error(options.error);
        },

        // Всего товаров в корзине
        "total" : function() {
            return this.reduce(function(memo,position){
                return memo + position.get('count');
            },0);
        },

        // Сумма товаров в корзине
        "sum" : function() {
            return this.reduce(function(memo,position){
                return memo + position.get('count') * position.get('price');
            },0);
        }
    });
});
