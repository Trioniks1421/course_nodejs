const {Router} = require('express')
const router = Router()
const Course = require('../models/course')
const mongoose = require('mongoose')

router.get('/',async (req,res)=>{
    const courses = await Course.find({}).lean()
    console.log(courses)
    res.render('courses',{
        title:'Курсы',
        iscourses:true,
        courses
            })
 
})

module.exports = router