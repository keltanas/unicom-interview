/**
 * Basket view
 * @author: Nikolay Ermin <keltanas@gmail.com>
 */
define("view/basket",[
    "vend/backbone",
    "model/position",
    "model/basket",
    "view/position",
    "text!tpl/basket.tpl"
],function( Backbone, Position, BasketList, PositionView, tpl ){

    var positions = new BasketList();

    return Backbone.View.extend({

        "collection" : positions,

        "initialize" : function() {

            // Инициализация из localStorage
            this.collection.reset(JSON.parse( localStorage && localStorage.getItem('basket.collection') || '[]' ));

            // Сохраняем в localStorage
            this.collection.on("change add remove reset",function(){
                localStorage && localStorage.setItem('basket.collection', JSON.stringify(this));
            },this.collection);

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
                        new Position(product.toJSON()).set('count',1)
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
            return this;
        },

        "events" : {
            "click button.btn-reset" : "basket_reset",
            "click button.btn-save" : "basket_save",
            "click button.btn-load" : "basket_load"
        },

        // очищаем корзину
        "basket_reset" : function(){
            this.collection.reset();
            this.render();
        },

        // сохраняем на сервер
        "basket_save" : function(){
            this.collection.save();
        },

        // загрузка с сервера
        "basket_load" : function(){
            this.collection.fetch({
                success: $.proxy(this.render,this),
                error: function(collection,Response){
                    alert(Response.responseText);
                }
            });
        }
    });
});
