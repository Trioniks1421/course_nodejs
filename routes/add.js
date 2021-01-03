const {Router} = require('express')
const { route } = require('./home')
const router = Router()
const Course = require('../models/course')
router.get('/',(req,res)=>{
    res.render('add',{
        title:'Добавить курс',
        isadd:true
    })
 
})
router.post('/',(req,res)=>{
    console.log(req.body)
    const course = new Course(req.body.title,req.body.price,req.body.img)
    res.redirect('/courses')
})
module.exports = router