/**
 * List of position
 * @author: Nikolay Ermin <keltanas@gmail.com>
 */
define("model/position_list",[
    "vend/backbone",
    "model/position"
],function( Backbone, Position ){
    return Backbone.Collection.extend({
        "model" : Position
    });
});
