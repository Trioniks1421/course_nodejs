const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes =require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes =require('./routes/courses')

const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use('/add',addRoutes)
app.use('/',homeRoutes)
app.use('/courses', coursesRoutes)

async function start(){
    try{
        const url = 'mongodb+srv://svyatoslav:bayron1421@cluster0.spi1e.mongodb.net/Course?retryWrites=true&w=majority'
        await mongoose.connect(url,{useNewUrlParser:true})
        const PORT = process.env.PORT|| 3000;
        app.listen(PORT,()=>{
            console.log(`Server listen on Port: ${PORT}`)
        })
    }catch(e){
        console.log(e)
    }
}
start()