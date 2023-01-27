export const homepage=(req,res,next)=>{
    res.render("index");
}

export const registerPage=(req,res,next)=>{
    res.render("register")
}
export const loginPage=(req,res,next)=>{
    res.render("login")

}
export const forgotPage=(req,res,next)=>{
    res.render("forgot")

}
export const myInfo=(req,res,next)=>{
    res.render("myInfo")

}

export const admin=(req,res,next)=>{
    res.render("admin")

}


export const showBlog=(req,res,next)=>{
    console.log(req.params.id)
    res.render("showBlog",{blogId:req.params.id});
}