const {Router} = require('express');
const router = Router();
const Course = require('../models/course')


router.get('/',(req,res)=>{
    res.render('cart',{
        title:'Корзина',
        iscart:true
    })
})

router.post('/add',async (req,res)=>{
    const course = await Course.findById(req.body.id)
   await req.user.addToCart(course)
})


module.exports = router;