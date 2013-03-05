/**
 * Common application avents bus
 * @author: Nikolay Ermin <keltanas@gmail.com>
 */
define("bus",[
    "vend/backbone"
],function(Backbone){
    var bus = {};
    _.extend(bus, Backbone.Events);
    return bus;
});
