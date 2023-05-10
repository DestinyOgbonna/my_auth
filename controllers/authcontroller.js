const User = require('../models/user');

//handle Errors

const handleErrors =(err)=>{
    console.log(err.message, err.code);

    let errors = {email:'', password:''};

    //Duplcate error code for duplicate Email
    if(err.code === 11000){
        errors.email = 'Account Already exists';
        return errors;
    }
    //validation of the errors
    if(err.message.includes('user validation failed')){

        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

module.exports.signUp_get =(req,res)=>{
    res.render('signup');
}
module.exports.login_get =(req,res)=>{
    res.render('login');
}
module.exports.signUp_post = async (req,res)=>{
const{email, password} = req.body;
try {
const registeredUser = await User.create({
        email,
        password
    });
    res.status(201).json(registeredUser);
} catch (err) {
 const myErrors= handleErrors(
    err
  );
    res.status(400).json({myErrors});
}
     //for the post method its res.send()
    
}
module.exports.login_post =async(req,res)=>{
    res.send('new login');
    console.log(req.body);
}
// module.exports.signUp_get =(req,res)=>{

// }