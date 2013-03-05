/**
 * Product view
 * @author: keltanas
 */
define("view/product",[
    "vend/backbone",
    "text!tpl/product.tpl"
],function(Backbone,tpl){
    return Backbone.View.extend({
        "tagName" : "tr",
        "className" : "b-product",
        "events" : {
            "click button" : "addToCart"
        },
        // Добавить в корзину
        "addToCart" : function(){
            if ( this.options.bus ) {
                this.options.bus.trigger('product.add.cart', this.model);
            }
        },
        "render" : function(){
            $(this.el).html( _.template( tpl, this.model.toJSON() ) );
            return this;
        }
    });
});
