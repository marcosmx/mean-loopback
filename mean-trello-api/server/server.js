var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var app = module.exports = loopback();


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};


app.use('/documentation/mean/*', loopback.static(path.resolve(__dirname, '../docular_generated')));
app.use('/resources', loopback.static(path.resolve(__dirname, '../docular_generated/resources')));
app.use('/site.json', loopback.static(path.resolve(__dirname, '../docular_generated/site.json')));
app.use('/lb-services.js', loopback.static(path.resolve(__dirname, '../js/lb-services.js')));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
