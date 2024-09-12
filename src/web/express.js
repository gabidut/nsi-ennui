const http = require('http');
const express = require('express');
const socket = require('./socket');
const app = express();
const server = http.createServer(app);
const session = require('express-session');
const bodyParser = require('body-parser');
const { getRecentGames } = require('../games/game');
let secret = "caca";
app.set('view engine', 'ejs');
app.set('views', 'src/content/views');
const sessionMiddleware = session({
    secret: "changeit",
    resave: true,
    saveUninitialized: true,
  });
  
app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static('src/content/static'));

app.use(require('./middlewares/login.middleware'))

app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('index', {
            req: req,
            games: getRecentGames()
        });
    } else {
        res.render('login');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
    socket(server, sessionMiddleware);
});