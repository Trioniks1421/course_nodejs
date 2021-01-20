const {Router} = require('express')
const router = Router()
const Course = require('../models/course')
const mongoose = require('mongoose')

router.get('/',async (req,res)=>{
    const courses = await Course.find({}).lean()
    
    res.render('courses',{
        title:'Курсы',
        iscourses:true,
        courses
            })
 
})

router.get('/:id', async (req,res)=>{
    const course =  await Course.findById(req.params.id).lean()
    console.log(course)
    res.render('aboutCourse',{
        title:`Курс ${course.title}`,
        course
    })
})

router.get('/:id/edit',async(req,res)=>{
    const course = await Course.findById(req.params.id).lean()
    
    res.render('course-edit',{
        title:`Редактирования ${course.title} курса`,
        course
    })
})


router.post('/edit',async (req,res)=>{

    await Course.findByIdAndUpdate(req.body.id,req.body)
    
    res.redirect('/courses')
})

router.post('/remove',async(req,res)=>{
    try{
        await Course.deleteOne({_id:req.body.id})
        res.redirect('/courses')
    }catch(e){
        console.log(e)
    }
   
})
module.exports = router