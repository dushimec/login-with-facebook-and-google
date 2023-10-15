const passport = require('passport')
const express = require('express')
const router = express.Router()


router.get('/', function(req,res){
    res.render('pages/index.ejs')
})

router.get('/profile',isLogedIn,function(){
    res.render('pages/profile.ejs',{
        user:req.user
    })
})

router.get('/error',isLogedIn,function(req,res){
    res.render('pages/error.ejs')
})

router.get('/auth/facebook',passport.authenticate('facebook',{
    scope:['public_profile','email']
}))

router.get('/facebook/calback',function(){
    passport.authenticate('facebook',{
        successRedirect:'/profile',
        failureRedirect:'/error'
    })
})

router.get('/logou',function(req,res){
    req.logout()
    res.redirect('/')
})

function isLogedIn(req,res,next){
    if(req.isAuthenticated())
    return next()

    res.redirect('/')
}


module.exports = router;