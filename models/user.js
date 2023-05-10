const mongoose = require('mongoose');
const {isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique:true,
        required: [true, 'please enter an email'],
        lowercase:true,
        validate:[(val)=>{
isEmail
        },'Please enter a valid email']
    },
    password:{
        type: String,
        required :[true, 'please enter a password'],
        minlength:[6, 'Minimum password length is 6 characters']
    },
});
//fire after doc has been saved to DB
userSchema.post('save', function(doc, next){
    console.log('new user was saced', doc);
    //Always call the next method
    next();
})
//fire a fuction befor you save data to DB
userSchema.pre('save',async function(next){
    const passSalt = await bcrypt.genSalt();
 this.password = await bcrypt.hash(this.password, passSalt)
    next();

})
//when creating the model always 
//us the singular value of your DB name e.g is DB name is Users, set the model name to be user
const User = mongoose.model('user', userSchema);

module.exports = User;