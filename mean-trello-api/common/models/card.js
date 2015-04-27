var loopback = require("loopback");

module.exports = function(Card) {
    Card.observe("before save", function createLog(ctx, next) {
        var Log = loopback.getModel("StatusLog");
        if (ctx.data && ctx.data.statusId) {
            Card.findById(ctx.where.id, function(err, _card) {
                if (ctx.data.statusId != _card.statusId) {
                    Log.create({
                        cardId: _card.id,
                        statusOriginId: _card.statusId,
                        statusDestinationId: ctx.data.statusId,
                        description: "Card status has been changed from " + _card.statusId + " to " + ctx.data.statusId
                    }, function(err, _log) {
                        if (err) return console.log(err);
                        console.log(_log);
                    });
                }
            });
        }
        next();
    });
};
