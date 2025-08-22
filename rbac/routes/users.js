var express = require('express');
const {register,login} = require("../auth/auth");
const roles = require("../config/roles");
const {authorize,authenticate} = require("../middlewares/rbac")
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',register);
router.post('/login',login);
router.get('/admin',authenticate,authorize(roles["admin"]),(req,res)=>{
  res.json({message:'Admin Content'});
});
router.get('/editor',authenticate,authorize(roles["editor"]),(req,res)=>{
  res.json({message:'Editor content'});
});
router.get('/user',authenticate,authorize(roles["user"]),(req,res)=>{
  res.json({message:'User content'})
})

module.exports = router;
