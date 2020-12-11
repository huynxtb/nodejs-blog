//Library
const express=require('express')
const mongoose=require('mongoose')
const session = require('express-session');
//Controller
const articleModule = require('./controller/articles')
const loginModule=require('./controller/login')
//Model
const Blog=require('./model/blog')

//Init
const app=express()
{
    //Init session
    app.use(session({
        secret:'HACK_CON_ME_MAY',
        saveUninitialized: false,
        resave: true
    }));
    app.use(function(req, res, next) {
        res.locals.user = req.session.username;
        next();
    });

    //Init database connection
    mongoose.connect('mongodb+srv://satellite1012:satellite1012@cluster0.hdqsf.mongodb.net/Test?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })

    //Init view engine
    app.set('view engine','ejs')

    //must define the public folder to store static files(css,js,img...)
    app.use(express.static(__dirname + '/public'));

    //Init max payload limit
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

    //Other
    app.use(express.urlencoded({extended:false}))
}

//Main
app.get('/',async (req,res)=>{
    const blogs=await Blog.find().sort({_id:'desc'})
    res.render('index',{content:blogs})
})

//Init controller to this sever, must put mostly below all statement
app.use('/article',articleModule)
app.use('/login',loginModule)

//Listen to port 3000, or external env port on deployment
app.listen(process.env.PORT || 3000)