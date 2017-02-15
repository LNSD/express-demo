import path from 'path';
import express from 'express';
import bodyparser from 'body-parser';
import logger from 'morgan';
import handlebars from 'express-handlebars';

const app = express();

app.use(logger('dev'));

app.use(bodyparser.json()); // support json encoded bodies
app.use(bodyparser.urlencoded({ extended: true })); // support encoded bodies

app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Register simple HTTP GET route for /
app.get('/', function(req, res){
    // Send status 200 and render content. Content, in this case, is a non-existent template.
    // For me, rendering the layout is important.
    res.status(200).render('home');
});

// Set the server port to 3000, and log the message when the server is ready.
app.listen(3000, function(){
    console.log('Server is listening at localhost:3000');
});