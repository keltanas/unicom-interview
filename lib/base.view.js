/**
 * Base view class
 * @author: keltanas
 */
define("base.view", ["vend/backbone"], function(Backbone){
    return Backbone.View.extend({
        "tpl" : "Default view",
        "render" : function(){
            $(this.el).html(this.template(this.tpl, this.model.toJSON()));
            return this;
        }
    });
});
