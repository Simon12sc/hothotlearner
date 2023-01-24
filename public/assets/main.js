

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
        
        const link='http://localhost:8000'
        let page=1;
        let limit=15;


 

function categorySearch(data){
            let keyword=document.getElementsByClassName("search_input")[0];
            keyword.value=data;
            search(1);
        }


        toggleBlogShower.onclick=()=>minimize()
        searchBTN.onclick=()=>search(1)
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
            let res=await fetch(`${link}/api/blog/${id}`);
            let data=await res.json();
            toggleBlogShower.click();
              
            blogShower.innerHTML=`
            <section>
    
            <input type="checkbox" name="" id="checkbox"/>
                       <div class="commentSection">
                           <div class="commentSection1">
                               <label for="checkbox" class="commentOnOff" Checked>X</label>
                               
                               
                               <div class="comment_list">
                                   
                                   </div>
                                   <div class="comment_area">
                                   <button id="refreshComment">Refresh</button><br>
                                   <input type="text" placeholder="type here..." class="comment_input"/>
                                   <button class="commentBTN">comment</button>
                               </div>
                                   </div>
                                   
                                   </section>
            <div class="blog_container">
            <label for="checkbox" class="commentOnOff1">see comments</label>
                <div class="blog_title">
                <h1>${data.message.title}</h1>
                <p>${getAgo( data.message.createdAt)}</p>
                    <p>by ${data.message.User.name}-${data.message.User.role}</p>
                    <div class="blog_main_cover" style="background-image:url('${link}/image/${data.message.cover_image}');">
                        
                    </div>
                    </div>
                    
                    <div class="blog_main_content">
                    ${data.message.description}
                </div>
            </div>`
            document.getElementsByClassName("commentBTN")[0].onclick=()=>{addComment(id)}
            document.getElementById("refreshComment").onclick=()=>{showComments(id)}
            showComments(id);
        }



        async function addComment(id){
            const comment_input=document.getElementsByClassName("comment_input")[0];
            let data={message:comment_input.value.toString(),blogId:id}
            const res=await fetch("api/comment/create",{method:"post",body:JSON.stringify(data),headers:{"Content-Type":"application/json"}});
            const result=await res.json()
            if(!result.success){return alert(result.error)}
            showComments(id);
            comment_input.value=""
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
                        const res=await fetch("/api/comment/delete",{method:'delete',body:JSON.stringify(data),headers:{
                            "Content-Type":"application/json"
                        }})
                        const result=await res.json();

                        if(!result.success){return alert(result.error)}

                        showComments(blogId);
                    }
        

        function addToBlog(data){
            contentBox.innerHTML="<h1 style=`color:red;`>loading....</h1>"
            if(data.length===0){return contentBox.innerHTML="<h1 style=`color:red;`>No result found !!</h1>";}
            contentBox.innerHTML=" ";
        
            data.forEach(element => {
                contentBox.innerHTML+=`<div class="blog" blog_id="${element.id}">
                    <div class="blog_cover" style="background-image:url('${link}/image/${element.cover_image}');">
                    </div>
                    <label for="date">${getAgo(element.createdAt)}</label> <a id="newPage" href="/blog/${element.id}/${element.title}" >view in new page</a>
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
            const keyword=document.getElementsByClassName("search_input")[0];
            
            let res=await fetch(`${link}/api/blog/${nextPage}/15/search?title=${keyword.value}&order=${order.value}`);
            let data=await res.json();
            if(!data.success){
                
                return showError(data.error)
            }

            addPagination(data.total,nextPage);
            addToBlog(data.message)
            
        }
        
        async function isLoggedIn(){
            let res=await fetch(`${link}/api/user/me`);
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
            let res=await fetch(`${link}/api/user/logout`);
            let result = await res.json();
            
            if(result.success){
            location.reload();    
            }else{
                alert(result.error)
            }
        }
        
        
        function agoDate({ year, date, month, hour, minute, second }) {
            let now = new Date();
            let year1 = now.getUTCFullYear();
            let date1 = now.getUTCDate();
            let month1 = now.getUTCMonth() + 1;
            let minute1 = now.getUTCMinutes();
            let hour1 = now.getUTCHours();
            let second1 = now.getUTCSeconds();
            let agoYear = Math.abs(year1 - year);
            let agoDate = Math.abs(date1 - date);
            let agoMonth = Math.abs(month1 - month);
            let agoMinute = Math.abs(minute1 - minute);
            let agoHour = Math.abs(hour1 - hour);
            let agoSecond = Math.abs(second1 - second)
            if (agoYear >= 1) {
              return agoYear + "y ago";
            } else if (agoMonth >= 1) {
              return agoMonth + "m ago";
            } else if (agoDate >= 1) {
              return agoDate + "d ago";
            } else if (agoHour >= 1) {
              return agoHour + "h ago";
            } else if (agoMinute >= 1) {
              return agoMinute + "m ago";
            } else {
              return agoSecond + "s ago"
            }
          }
          
          function dateSpliter(fullDate) {
            let a = fullDate.split("T")[0].split("-");
            let year = Number(a[0])
            let month = Number(a[1])
            let date = Number(a[2])
          
            let b = fullDate.split("T")[1].split(":");
            let hour = Number(b[0]);
            let minute = Number(b[1]);
            let second = Number(b[2].split(".")[0])
          
            return { year, month, date, hour, minute, second }
          }
          
          function getAgo(fullDate){
          let uploadedTime = dateSpliter(fullDate);
          return agoDate(uploadedTime)
          }
          

        isLoggedIn();
        search(page);
        