const Router = require('express')
const router = new Router()
const controller = require("../controller/usersController")
const roleMiddleware = require("../middlewares/roleMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers)
router.get("/:_id", authMiddleware(), controller.getUser)
router.delete("/:_id",roleMiddleware(["ADMIN"]), controller.deleteUser)
router.put("/", roleMiddleware(["ADMIN"]), controller.updateUser)
router.put("/password", authMiddleware(), controller.changePassword)

module.exports = router
