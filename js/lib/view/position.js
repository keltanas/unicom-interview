/**
 * Basket position
 * @author: Nikolay Ermin <keltanas@gmail.com>
 */
define("view/position",[
    "vend/backbone",
    "text!tpl/position.tpl"
],function(Backbone,tpl){
    return Backbone.View.extend({
        "tagName" : "div",
        "className" : "row-fluid b-basket-position",
        "events" : {
            "click a.icon-remove" : "removeFromCart"
        },
        // Удаление из корзины
        "removeFromCart" : function(){
            if ( this.options.bus ) {
                this.options.bus.trigger('product.remove.cart', this.model);
            }
            return false;
        },
        "render" : function(){
            $(this.el).html( _.template( tpl, this.model.toJSON() ) );
            return this;
        }
    });
});
