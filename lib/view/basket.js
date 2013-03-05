/**
 * Basket view
 * @author: Nikolay Ermin <keltanas@gmail.com>
 */
define("view/basket",[
    "vend/backbone",
    "model/position",
    "view/position",
    "text!tpl/basket.tpl"
],function( Backbone, Position, PositionView, tpl ){

    var PositionList = Backbone.Collection.extend({
        "model" : Position
    });

    return Backbone.View.extend({
        "collection" : new PositionList(),

        "initialize" : function() {
            // перерисвать при добавлении
            this.collection.on('add', this.render, this);

            // добавление в корзину
            this.options.bus.on('product.add.cart', function(product){
                // Ищем товар в корзине
                var position = this.collection.find(function(position){
                    return position.get('name') == product.get('name')
                        && position.get('price') == product.get('price');
                });
                // Инкрементируем или добавляем
                if ( position ) {
                    position.set('count', position.get('count') + 1);
                } else {
                    this.collection.add(
                        new Position(product.toJSON()).set('count',1),
                        {silent:true}
                    );
                }
                this.render();
            },this);

            // удаление из корзины
            this.options.bus.on('product.remove.cart', function(position){
                this.collection.remove(position);
                this.render();
            },this);
        },

        "events" : {
            "click button.btn-reset" : "basket_reset"
        },

        "render" : function() {
            // Основной шаблон корзины
            this.$el.find('*').remove().end().append(
                _.template( tpl, {
                    total: this.collection.reduce(function(memo,position){
                        return memo + position.get('count');
                    },0),
                    sum: this.collection.reduce(function(memo,position){
                        return memo + position.get('count') * position.get('price');
                    },0)
                } )
            );
            // Добавляем товары
            var $rows = this.$el.find('div.b-basket-positions');
            this.collection.length && $rows.find('span').remove();
            this.collection.each(function(objPosition){
                var view = new PositionView({
                    "model" : objPosition,
                    "bus"   : this.options.bus
                });
                view.render();
                $rows.append( view.$el );
            }, this);
        },

        "basket_reset" : function(){
            this.collection.reset();
            this.render();
        }
    });
});