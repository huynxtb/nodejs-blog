const User=require('./../model/user')
const Blog=require('./../model/blog')
async function isAdmin(req, res, next){
    const username = req.session.username
    const u = await User.findOne({username: username})
    if(u){
        console.log(u.role)
        if(u.role==0){
            next()
        }else{
            const blogs=await Blog.find().sort({_id:'desc'})
            res.render('index',{notPermiss: 'Vui long đăng nhập!',
                            content:blogs
                           })
        }
    } else{
        const blogs=await Blog.find().sort({_id:'desc'})
        res.render('index',{authErr: 'Vui long đăng nhập!',
                            content:blogs
                           })
    }
}

async function isUser(req, res, next){
    const username = req.session.username
    const u = await User.findOne({username: username})
    if(u){
        if(u.role==1){
            next()
        }else{
            return res.json({
                status: 400,
                message: "Tài khoản không cho phép: " + username
            })
        }
    }else{
        return res.json({
            status: 400,
            message: "Vui lòng đăng nhập"
        })
    }
    
}

module.exports = {
    isAdmin,
    isUser
}