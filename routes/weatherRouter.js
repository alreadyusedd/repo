const Router = require('express')
const express = require('express')
const router = new Router()
const jsonParser = express.json();
const controller = require("../controller/weatherController")

router.post("/weather", controller.getWeather) 


module.exports = router