const express = require('express')
const app = express()
const path = require("path");
const indexRouter = require('./src/routes/main-routes');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// Middleware to handle JavaScript files in the 'public/js' folder
app.use('/js', (req, res, next) => {
  // Check if the request URL starts with '/js'
  if (req.originalUrl.startsWith('/js')) {
    // If it does, skip the error handling middleware and serve the JavaScript file directly
    return next();
  }
  // If not, continue to the next middleware (your existing error-handling middleware)
  next();
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 5001)

module.exports = app;
