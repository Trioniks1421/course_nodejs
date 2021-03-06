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
router.post('/',async (req,res)=>{
    const course = new Course({
        title:req.body.title,
        price:req.body.price,
        img:req.body.img,
        userId:req.user
    })
    try{
        await course.save()
        res.redirect('/courses')
    }catch(e){
        console.log(e)
    }
   
})
module.exports = router