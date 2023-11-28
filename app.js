const express = require('express')
const path = require("path");
const app = express()
var logger = require('morgan');

const port = process.env.PORT || 3000;

const indexRouter = require('./src/routes/main-routes');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
  });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

module.exports = app;