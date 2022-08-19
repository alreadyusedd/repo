const Router = require('express')
const router = new Router()
const controller = require("../controller/moviesController")
const roleMiddleware = require("../middlewares/roleMiddleware")

router.get("/movies",roleMiddleware(["USER","ADMIN"]), controller.getMovies)
router.get("/:_id", roleMiddleware(["ADMIN"]), controller.getMovie)
router.post("/", roleMiddleware(["ADMIN"]), controller.createMovie)
router.delete("/:_id",roleMiddleware(["ADMIN"]), controller.deleteMovie)
router.put("/",roleMiddleware(["ADMIN"]), controller.updateMovie)


module.exports = router