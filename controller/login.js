//Init
const express=require('express')
const router=express.Router()

//User Model
const User=require('./../model/user')

router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/userlogin', async (req,res)=>{
    login(req,res);
})

router.post('/logout', async (req,res)=>{
    req.session.destroy();
    res.redirect('/')
})

const login = async function login(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const user =  await User.findOne({username: username});
    if(user){
        if(user.password==password){
            if(user.role==0){
                req.session.username = user.username;
            } else {
                req.session.username = user.username;
            }
            res.redirect('/');
        } else{
            res.render('login',{usernameErr: 'Tên đăng nhập hoặc mật khẩu không đúng!'})
            res.redirect('/login');
        }
    } else{
        res.render('login',{usernameErr: 'Tên đăng nhập hoặc mật khẩu không đúng!'})
    }
}

//Export module
module.exports=router
