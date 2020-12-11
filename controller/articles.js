//Init
const { localsName } = require('ejs')
const express=require('express')
const router=express.Router()
const {isAdmin, isUser} = require('./../middleware/auth')
//Used Model
const Blog=require('./../model/blog')

//Functional
router.get('/success/:id',(req,res)=>{
    const info=req.params.id
    res.render("blog/success",{info})
})
router.get('/view/:id',async (req,res)=>{
    const blog=await Blog.findById(req.params.id)
    res.render("blog/view",{blog})
})

// Authorize
router.use(isAdmin)

router.get('/doDelete/:id',async (req,res)=>{
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect("/");
})

router.post('/doEdit/:id',async (req,res)=>{
    try{
        await Blog.findByIdAndUpdate(req.params.id,{
            "title":req.body.postTitle,
            "des":req.body.postDes,
            "content":req.body.postContent,
            "isAnonymous":req.body.isAnonymous,
            "isPublic":false,
            "date":(new Date()).toLocaleDateString()
        })
    }catch(e){
        console.log(e)
    }finally{
        res.redirect("/");
    }
})
router.post('/upload',async (req,res)=>{
    const blog=new Blog({
        title:req.body.postTitle,
        des:req.body.postDes,
        content:req.body.postContent,
        author:req.session.username,
        isAnonymous:req.body.isAnonymous
    })
    try{
        await blog.save()
        res.redirect(`/article/success/${blog.id}`)
    }catch(e){
        console.log(e)
        res.render('blog/new')
    }
})

//Render for doFunction
router.get('/new',(req,res)=>{
    res.render('blog/new')
})
router.get('/edit/:id',async (req,res)=>{
    const blog=await Blog.findById(req.params.id)
    res.render('blog/edit',{blog})
})


//Export module
module.exports=router