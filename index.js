const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes =require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes =require('./routes/courses')
const cart = require('./routes/cart')
const User = require('./models/user')

const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))

app.use(async (req,res,next)=>{
    try{
        const user = await User.findById('600300f98439e12828f04e19')
        req.user = user
        next()
    }catch(e){
        console.log(e)
    }
})
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use('/add',addRoutes)
app.use('/',homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart',cart)

async function start(){
    try{    
           await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true ,useUnifiedTopology: true, useFindAndModify: false});
            const PORT = process.env.PORT|| 3000;
            const candidate = await User.findOne()
            if(!candidate){
                const user = new User({
                    email:'bayrongurt@gmail.com',
                    name:'Svyat',
                    cart:{items:[]}
                })
                await user.save()
            }
            
            app.listen(PORT,()=>{
                console.log(`Server listen on Port: ${PORT}`)
                
        })
    }catch(e){
        console.log(e)
    }
}
start()