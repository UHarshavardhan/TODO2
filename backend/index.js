const express = require('express');
const { signUp, LogIn } = require("./src/controllers/auth");
const { Taskdelete, Taskget, Taskpost, Taskput } = require("./src/controllers/task");

const router = express.Router();


router.post("/api/v1/login", LogIn);
router.post("/api/v1/signup", signUp);


router.get("/api/v1/tasks", Taskget); 
router.post("/api/v1/tasks", Taskpost);
router.put("/api/v1/tasks/:id", Taskput); 
router.delete("/api/v1/tasks/:id", Taskdelete); 

module.exports = router;
