const {Schema,model} = require('mongoose')
const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    cart:{
        items:[{
            count:{
                type:Number,
                required:true,
                default:1
            },
            courseId:{
                required:true,
                ref:'Course',
                type:Schema.Types.ObjectId,
            }
        }]
    }

})
userSchema.methods.addToCart = function(course){
    const clonedItems = [...this.cart.items]
    const idx = clonedItems.findIndex(c=>{
        return c.courseId.toString() === course._id.toString()
    })
    if(idx >=0){
        clonedItems[idx].count = clonedItems[idx].count + 1
    }else{
        clonedItems.push({
            courseId:course._id,
            count: 1
        })
    }
    const newCart = {items: clonedItems}
    this.cart = newCart
}



module.exports = model('User',userSchema)