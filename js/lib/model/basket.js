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
        // Поскольку коллекции не умеют сохранятся, определим этот метод
        "save" : function() {
            $.ajax({ type:'PUT', url: '/basket', data: JSON.stringify( this )})
                .done(function(msg){
                    alert( msg );
                })
                .error(function(Response){
                    alert( Response.responseText );
                });
        }
    });
});
