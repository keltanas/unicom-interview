/**
 * Catalog view module
 * @author: Nikolay Ermin <keltanas@gmail.com>
 */
define("view/catalog",[
    "vend/backbone",
    "model/product",
    "view/product",
    'text!tpl/catalog.tpl'
],function(Backbone,Product,ProductView,tpl) {

    var ProductList = Backbone.Collection.extend({
        "model" : Product
    });

    return Backbone.View.extend({
        "collection" : new ProductList(),

        "initialize" : function() {
            this.collection.on('add', this.render, this);
        },

        "render" : function() {
            this.$el.find('*').remove().end().append(tpl);
            var $rows = this.$el.find('tbody');
            this.collection.each(function(objProduct){
                var view = new ProductView({
                    "model" : objProduct,
                    "bus"   : this.options.bus
                });
                view.render();
                $rows.append( view.$el );
            }, this);
        }
    });
});
