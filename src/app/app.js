import path from 'path';
import express from 'express';
import bodyparser from 'body-parser';
import logger from 'morgan';
import handlebars from 'express-handlebars';
import moment from 'moment';

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


app.get('/', function(req, res) {
    // Send status 200 and render index.
    res.status(200).render('index');
});

app.post('/', function(req, res){
    const name = req.body.name;
    const age = moment().diff(moment(req.body.birthday[0], 'YYYY-MM-DD'), 'years');
    res.render('welcome', { name, age });
});


// Set the server port to 8080, and log the message when the server is ready.
app.listen(port, function() {
    console.log('Server is listening at localhost:8080');
});

