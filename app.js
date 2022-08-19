const fastify = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');
const logger = require('./logger');

const authRouter = require('./routes/authRouter');
const usersRouter = require('./routes//usersRouter');
const moviesRouter = require('./routes//moviesRouter');
const weatherRouter = require('./routes//weatherRouter');
const tokenRouter = require('./routes/tokenRouter')


const PORT = process.env.PORT || 3000;

const app = fastify();
app.use(bp.json());
app.use('/auth', authRouter);
app.use('/user', usersRouter);
app.use('/movie', moviesRouter);
app.use('/token', tokenRouter);
app.use('/', weatherRouter)
app.use(fastify.json());

app.use(fastify.static(__dirname + '/public'));

app.get('/user', function (request, response) {
  logger.info('/user', { meta: request });
  response.sendFile(__dirname + '/view/users.html');
});
app.get('/movie', function (request, response) {
  logger.info('/movie', { meta: request });
  response.sendFile(__dirname + '/view/movie.html');
});
app.get('/registration', function (request, response) {
  logger.info('/registration', { meta: request });
  response.sendFile(__dirname + '/view/registration.html');
});
app.get('/login', function (request, response) {
  logger.info('/login', { meta: request });
  response.sendFile(__dirname + '/view/login.html');
});
app.get('/change', function (request, response) {
  logger.info('/change', { meta: request });
  response.sendFile(__dirname + '/view/change.html');
});


const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Qwerty:Rteger4210@cluster0.6kp8utv.mongodb.net/auth?retryWrites=true&w=majority'
    );
    app.listen(PORT, function () {      
    logger.info('ok', { meta: 'connnect database' });     
    });
  } catch (e) {
    logger.error(e);    
  }
};
start();