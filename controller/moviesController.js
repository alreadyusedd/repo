const Movie = require('../model/Movie');
const logger = require('../logger');

class moviesController {
  async getMovies(req, res) {
    try {
      logger.info(req, { meta: 'getMovies' }); 
      const movies = await Movie.find();  
      res.set('Expires', new Date(Date.now() + 1000).toUTCString())          
      res.json(movies);                
    } catch (e) {
      logger.error(e);
      res.status(404).send('not found');
    }
  }

  async getMovie(req, res) {
    try {
      logger.info(req, { meta: 'getMovie' }); 
      const { _id } = req.params;
      const movie = await Movie.findOne({ _id });
      if (movie._id) {
        res.send(movie);
      } else {
        res.status(404).send('not found');
      }
    } catch(e) {
      logger.error(e);
      res.status(404).send('not found');
    }
  }

  async createMovie(req, res) {
    try{
      logger.info(req, { meta: 'createMovie' }); 
      if (!req.body) return res.sendStatus(400);
      const { _title, _author, _genre, _description } = req.body;
  
      const movies = await Movie.find();
      JSON.stringify(movies);
      let titleUsed = false;
  
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].title === _title) {
          titleUsed = true;
          break;
        }
      }
      if (!titleUsed) {
        const movie = new Movie({
          title: _title,
          author: _author,
          genre: _genre,
          description: _description
        });
        await movie.save();
        res.send(movie);
      } else {
        res.status(404).send('title is used');
      }
    }catch(e){
      logger.error(e);
      return res.status(404).send('error');
    }    
  }

  async deleteMovie(req, res) {
    try {
      logger.info(req, { meta: 'deleteMovie' }); 
      const { _id } = req.params;
      const movie = await Movie.findByIdAndDelete({ _id });
      if (movie._id) {
        res.send(movie);
      } else {
        res.status(404).send('not found');
      }
    } catch(e) {
      logger.error(e);
      res.status(404).send('not found');
    }
  }

  async updateMovie(req, res) {
    try{
      logger.info(req, { meta: 'updateMovie' }); 
      if (!req.body) return res.sendStatus(400);
      const { _id, _title, _author, _genre, _description } = req.body;
  
      const movies = await Movie.find();
      JSON.stringify(movies);
      let titleUsed = false;
      for (let i = 0; i < movies.length; i++) {
        if (movies[i]._id != _id) {
          if (movies[i].title === _title) {
            titleUsed = true;
            break;
          }
        }
      }
      if (titleUsed) {
        res.status(405).send('title is used');
      }
      else {
        Movie.findByIdAndUpdate(
          { _id: _id },
          {
            title: _title,
            author: _author,
            genre: _genre,
            description: _description
          },
          { new: true },
          function (err, result) {
            if (err) {
              res.status(404).send();
            } else {
              res.send(result);
            }
          }
        )
      }
    }
    catch(e){
      logger.error(e);
      res.status(404).send('error');
    }       
  }
}

module.exports = new moviesController();
