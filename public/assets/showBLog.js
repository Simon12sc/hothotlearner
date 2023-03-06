import { getAgo } from "./utils.js";
import { getAgo, hideLoading, showLoading } from "./utils.js";

let tog=false;
const blogShower=document.getElementsByClassName("blogShower")[0]
const userProfile=document.getElementsByClassName("userProfile")[0]
const login_button=document.getElementsByClassName("login_button")[0]
const user=document.getElementsByClassName("user")[0]
let userId = null;

const logout_button=document.getElementsByClassName("logout_button")[0]

logout_button.onclick=()=>{logout()}


login_button.onclick=()=>location.href='/login' 

function categorySearch(data){
    let keyword=document.getElementsByClassName("search_input")[0];
    keyword.value=data;
    search(1);
}

showBlog(document.getElementById("id").innerText);

async function showBlog(id){
    showLoading()
    let res=await fetch(`/api/blog/${id}`);
    let data=await res.json();
    hideLoading()
    toggleBlogShower.click();
      
    blogShower.innerHTML=`
    <section>

    <input type="checkbox" name="" id="checkbox"/>
               <div class="commentSection">
                   <div class="commentSection1">
                       <label for="checkbox" class="commentOnOff" Checked>X</label>
                       
                       
                       <div class="comment_list">
                           
                           </div>
                           <form id="commentForm">
                           <div class="comment_area">
                           <button type="button" id="refreshComment">Refresh</button><br>
                           <input type="text" placeholder="type here..." class="comment_input"/>
                           <button class="commentBTN" type="submit">comment</button>
                           </div>
                           </form>
                           </div>
                           
                           </section>
    <div class="blog_container">
    <label for="checkbox" class="commentOnOff1">see comments</label>
        <div class="blog_title">
        <h1>${data.message.title}</h1>
        <p>${getAgo( data.message.createdAt)}</p>
            <p>by ${data.message.User.name}-${data.message.User.role}</p>
            <div class="blog_main_cover" style="background-image:url('/image/${data.message.cover_image}');">
                
            </div>
            </div>
            
            <div class="blog_main_content">
            ${data.message.description}
        </div>
    </div>`

    document.getElementById("commentForm").onsubmit=(e)=>{
        e.preventDefault();
        addComment(id)
    }
    document.getElementById("refreshComment").onclick=()=>{showComments(id)}
    showComments(id);
}




async function addComment(id){
  
    const comment_input=document.getElementsByClassName("comment_input")[0];
    let data={message:comment_input.value.toString(),blogId:id}
    showLoading();
    comment_input.value=""
    const res=await fetch("/api/comment/create",{method:"POST",body:JSON.stringify(data),headers:{"Content-Type":"application/json"}});
    const result=await res.json()
hideLoading();
    if(!result.success){return alert(result.error)}
    showComments(id);
}



async function showComments(blogId){
   
    const res=await fetch(`/api/comment/get/${blogId}/1/15`)
    const result=await res.json()
    if(!result.success){return alert(result.error)}
    const comments=result.message.reverse();
    const comment_list=document.getElementsByClassName("comment_list")[0];
    comment_list.innerHTML=" "
    comments.forEach((comment)=>{
        comment_list.innerHTML+=`
        <div class="comment">
        <p>${comment.User.name }(${comment.User.role}) - ${getAgo(comment.createdAt)} ${ userId==comment.User.id?`<button commentId="${comment.id}" class="delete-button">delete</button></p>`: ""}
        <h2>${comment.text}</h2>     
        </div>
                 `})
                 comment_list.scrollTop=comment_list.scrollHeight-comment_list.clientHeight; 
                 
                 Array.from(document.querySelectorAll('.delete-button')).forEach((button)=>{
                     button.onclick= ()=>{
                         if(window.confirm("I am deleting comment ?")){
                             deleteComment(button.attributes[0].value,blogId)
                         }
                         // your code to delete the element here
                        }
                
                })
                
            }

            

        
            async function deleteComment(commentId,blogId){
                let data={
                    blogId,commentId
                }
                showLoading();
                const res=await fetch("/api/comment/delete",{method:'delete',body:JSON.stringify(data),headers:{
                    "Content-Type":"application/json"
                }})
                hideLoading();
                const result=await res.json();

                if(!result.success){return alert(result.error)}

                showComments(blogId);
            }





function showError(message){
    contentBox.innerHTML=`<h1 style="color:red;">${message}</h1>`
    alert(message)
}


async function logout(){
            
    let confirm=window.confirm("are you sure want to logout ?")
    if(!confirm){return}
    showLoading();
    let res=await fetch(`/api/user/logout`);
    hideLoading();
    let result = await res.json();
    
    if(result.success){
    location.reload();    
    }else{
        alert(result.error)
    }
}
async function isLoggedIn(){

    let res=await fetch(`/api/user/me`);
    let result = await res.json();
    
    if(result.success){
        userId=result.message.id
        user.style.display="flex"
        userName.innerText=result.message.name;
        login_button.style.display="none"
        logout_button.style.display="block"
    }else{
        logout_button.style.display="none"
        user.style.display="none"
        login_button.style.display="block"
    }
}


isLoggedIn();
