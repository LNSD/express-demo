import path from 'path';
import express from 'express';
import bodyparser from 'body-parser';
import logger from 'morgan';
import handlebars from 'express-handlebars';

const port = process.env.PORT || 8080;
const app = express();

app.use(logger('dev'));

app.use(bodyparser.json()); // support json encoded bodies
app.use(bodyparser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join(__dirname,'assets')));

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');


// Register simple HTTP GET route for /
app.get('/', function(req, res) {
    // Send status 200 and render index.
    res.status(200).render('index');
});

// Register simple HTTP POST route for /
app.post('/', function(req, res){
    res.render('welcome', { name: req.body.name});
});


// Set the server port to 8080, and log the message when the server is ready.
app.listen(port, function() {
    console.log('Server is listening at localhost:8080');
});

