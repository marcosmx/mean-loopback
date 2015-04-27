module.exports = function(Base) {
    /**
     * Before create operational hook
     * @param  {[type]} ctx   [description]
     * @param  {Date}   next) {                   if (ctx.instance) {            ctx.instance.createdAt [description]
     * @return {[type]}       [description]
     */
    Base.observe("before save", function(ctx, next) {
        if (ctx.instance) {
            ctx.instance.createdAt = new Date();
        } else {
            ctx.data.updatedAt = new Date();
        }
        next();
    });
};
