var async = require('async');

module.exports = function(app) {

    var Role = app.models.Role;
    /**
     * Creates project member role
     **/
    Role.registerResolver('$projectMember', function(role, context, next) {

        function reject(err) {
            if (err) {
                return next(err);
            }
            next(null, false);
        }

        async.waterfall([
            function getProjectId(next) {
                var projectId;

                switch (context.modelName) {
                    case 'Project':
                        projectId = context.modelId;
                        break;
                    case 'Category':
                        app.models.Category.findOne({
                            where: {
                                id: context.modelId
                            },
                            include: 'project'
                        }, function(err, category) {
                            if (err || !category) return reject(err);
                            next(null, category.project().id);
                        })
                        break;
                    case 'Card':
                        return reject();
                        break;
                    default:
                        return reject();

                }
            },
            function verifyRole(projectId, next) {
                var userId = context.accessToken.userId;
                if (!userId) {
                    return reject(); // do not allow anonymous users
                }

                // check if userId is in team table for the given project id
                app.models.Project.findById(projectId, function(err, project) {
                    if (err || !project) return reject(err);
                    var _accountProject = app.models.AccountProject;
                    _accountProject.count({
                        projectId: project.id,
                        accountId: context.accessToken.userId,
                        type: '$projectMember'
                    }, function(err, count) {
                        if (err) return reject(err);
                        next(null, count > 0); // true = is a team member
                    });
                });
            }
        ], next);
    });

    Role.registerResolver('$projectAdmin', function(role, context, next) {

        function reject(err) {
            if (err) {
                return next(err);
            }
            next(null, false);
        }

        async.waterfall([
            function getProjectId(next) {
                var projectId;

                switch (context.modelName) {
                    case 'Project':
                        projectId = context.modelId;
                        break;
                    case 'Category':
                        app.models.Category.findOne({
                            where: {
                                id: context.modelId
                            },
                            include: 'project'
                        }, function(err, category) {
                            if (err || !category) return reject(err);
                            next(null, category.project().id);
                        })
                        break;
                    case 'Card':
                        return reject();
                        break;
                    default:
                        return reject();

                }
            },
            function verifyRole(projectId, next) {
                var userId = context.accessToken.userId;
                if (!userId) {
                    return reject(); // do not allow anonymous users
                }

                // check if userId is in team table for the given project id
                app.models.Project.findById(projectId, function(err, project) {
                    if (err || !project) return reject(err);
                    var _accountProject = app.models.AccountProject;
                    _accountProject.count({
                        projectId: project.id,
                        accountId: context.accessToken.userId,
                        type: '$projectAdmin'
                    }, function(err, count) {
                        if (err) return reject(err);
                        next(null, count > 0); // true = is a team member
                    });
                });
            }
        ], next);
    });
};
