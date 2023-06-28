import { getAgo, hideLoading, returnViews, showLoading } from "./utils.js";

let tog=false;
        const blogShower=document.getElementsByClassName("blogShower")[0]
        const userProfile=document.getElementsByClassName("userProfile")[0]
        const toggleBlogShower=document.getElementById("toggleBlogShower");
        const contentBox=document.getElementsByClassName("content")[0]
        const pagination=document.getElementsByClassName("pagination")[0]
        const login_button=document.getElementsByClassName("login_button")[0]
        const user=document.getElementsByClassName("user")[0]
        const logout_button=document.getElementsByClassName("logout_button")[0]
        const searchBTN=document.getElementById("searchBTN");
        const categoryList=document.getElementsByClassName("categoryList");
        let userId = undefined;
        const order=document.getElementById("order");
        let page=1;
        let limit=15;


 

function categorySearch(data){
    
            let keyword=document.getElementsByClassName("search_input")[0];
            keyword.value=data;
            search(1);
        }


        toggleBlogShower.onclick=()=>minimize()

        document.querySelector("#searchForm").onsubmit=(e)=>{
            e.preventDefault();
            search(1)
        }
        login_button.onclick=()=>location.href='/login'        
        logout_button.onclick=()=>logout()
        Array.from(categoryList).forEach(e=>{
            e.onclick=()=>{
                window.scrollTo(0,0)
                if(e.innerText=="All"){categorySearch('')}else{
                    categorySearch(e.innerText);
                }}

            })

        function minimize(){
            if(!tog){
                blogShower.style.transform="translateX(0%)"
                toggleBlogShower.innerText="minimize"
                tog=true;
            }else{
                blogShower.style.transform="translateX(100%)"
                toggleBlogShower.innerText="maximize"
                tog=false;
            }
        }
       
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
                    <p>by ${data.message.User?data.message.User.name:"Unknown"}-${data.message.User?data.message.User.role:"Unknown"}</p>
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
            comment_input.value="";
            showLoading()
            const res=await fetch("api/comment/create",{method:"post",body:JSON.stringify(data),headers:{"Content-Type":"application/json"}});
            const result=await res.json();
            hideLoading()
            if(!result.success){return alert(result.error)}
            showComments(id);
        }


        
        async function showComments(blogId){
            const res=await fetch(`/api/comment/get/${blogId}/1/100`)
            const result=await res.json()
            if(!result.success){return alert(result.error)}
            const comments=result.message.reverse();
            const comment_list=document.getElementsByClassName("comment_list")[0];
            comment_list.innerHTML="<h1>Comment Section</h1>"
            comments.forEach((comment)=>{
                comment_list.innerHTML+=`
                <div class="comment">
                <p>${comment.User.name } ${comment.User.role=="admin"?"<i class='fa-solid fa-crown'></i>":"<i class='fa-solid fa-user'></i>"} - ${getAgo(comment.createdAt)} ${ userId==comment.User.id?`<button commentId="${comment.id}" class="delete-button">delete</button></p>`: ""}
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
                        const result=await res.json();
                        hideLoading()
                        if(!result.success){return alert(result.error)}

                        showComments(blogId);
                    }
        

        function addToBlog(data){
            contentBox.innerHTML="<h1 style=`color:red;`>loading....</h1>"
            if(data.length===0){return contentBox.innerHTML="<h1 style=`color:red;`>No result found !!</h1>";}
            contentBox.innerHTML=" ";
            data.forEach(element => {
                contentBox.innerHTML+=`<div class="blog" blog_id="${element.id}">
                    <div class="blog_cover" style="background-image:url('/image/${element.cover_image}');">
                    </div>
                    <label for="date">${getAgo(element.createdAt)}</label><label>${ returnViews(element.Views.length)} <i class="fa-solid fa-eye"></i></label> <a id="newPage" href="/blog/${element.id}/${element.title}" >view in new page</a>
                    <div class="blog_bottom">
                    <h1>${element.title}</h1>
                    <h2>${element.shortDescription}</h2> 
                    </div>
                    </div>
                    `
                });
                
                Array.from(document.getElementsByClassName("blog")).forEach(element => {
                // console.log(element.attributes["blog_id"].value)
                element.onclick=()=>showBlog(element.attributes["blog_id"].value)
            });
        }




        function addPagination(count,currentPage){    
            let page=Math.floor(Number(count)/limit)+1;
            pagination.innerHTML=" ";
            for(let i=1;i<=page;i++){
                if(currentPage==i){
                    pagination.innerHTML+=`<button class="paginationBTN" disabled >${i}</button>`
                }else{
                    pagination.innerHTML+=`<button class="paginationBTN"  >${i}</button>`
                    }
            }
            Array.from(document.getElementsByClassName("paginationBTN")).forEach(element => {element.onclick=()=>{
    search(Number(element.innerText));}});

        }
       
        


        function showError(message){
            contentBox.innerHTML=`<h1 style="color:red;">${message}</h1>`
            alert(message)
        }



        async function search(nextPage){
            contentBox.innerHTML="<h1 style=`color:red;`>loading....</h1>"
            showLoading();
            const keyword=document.getElementsByClassName("search_input")[0];
            
            let res=await fetch(`/api/blog/${nextPage}/15/search?title=${keyword.value}&order=${order.value}`);
            let data=await res.json();
            hideLoading();
            if(!data.success){
                
                return showError(data.error)
            }

            addPagination(data.total,nextPage);
            addToBlog(data.message)
    
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

        async function logout(){
            
            let confirm=window.confirm("are you sure want to logout ?")
            if(!confirm){return}
            showLoading();
            let res=await fetch(`/api/user/logout`);
            let result = await res.json();
            
            if(result.success){
            hideLoading();
                location.reload(); 

            }else{
                alert(result.error)
            }
        }
        
        
          

        isLoggedIn();
        search(page);
        