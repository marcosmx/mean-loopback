module.exports = function(AccountProject) {
    AccountProject.observe('before save', function createAccountProject(ctx, next) {
        if (ctx.instance && !ctx.instance.type) {
            ctx.instance.type = "$projectAdmin";
        }
        next();
    });
};
