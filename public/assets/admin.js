
let updatingBlogId="";
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
  sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
}else
  sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

let editor;
 // This sample still does not showcase all CKEditor 5 features (!)
            // Visit https://ckeditor.com/docs/ckeditor5/latest/features/index.html to browse all the features.
            CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
              // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
              toolbar: {
                  items: [
                      'exportPDF','exportWord', '|',
                      'findAndReplace', 'selectAll', '|',
                      'heading', '|',
                      'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                      'bulletedList', 'numberedList', 'todoList', '|',
                      'outdent', 'indent', '|',
                      'undo', 'redo',
                      '-',
                      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                      'alignment', '|',
                      'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                      'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                      'textPartLanguage', '|',
                      'sourceEditing'
                  ],
                  shouldNotGroupWhenFull: true
              },
              // Changing the language of the interface requires loading the language file using the <script> tag.
              // language: 'es',
              list: {
                  properties: {
                      styles: true,
                      startIndex: true,
                      reversed: true
                  }
              },
              // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
              heading: {
                  options: [
                      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                      { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                      { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                  ]
              },
              // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
              placeholder: 'Welcome to CKEditor 5!',
              // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
              fontFamily: {
                  options: [
                      'default',
                      'Arial, Helvetica, sans-serif',
                      'Courier New, Courier, monospace',
                      'Georgia, serif',
                      'Lucida Sans Unicode, Lucida Grande, sans-serif',
                      'Tahoma, Geneva, sans-serif',
                      'Times New Roman, Times, serif',
                      'Trebuchet MS, Helvetica, sans-serif',
                      'Verdana, Geneva, sans-serif'
                  ],
                  supportAllValues: true
              },
              // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
              fontSize: {
                  options: [ 10, 12, 14, 'default', 18, 20, 22 ],
                  supportAllValues: true
              },
              // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
              // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
              htmlSupport: {
                  allow: [
                      {
                          name: /.*/,
                          attributes: true,
                          classes: true,
                          styles: true
                      }
                  ]
              },
              // Be careful with enabling previews
              // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
              htmlEmbed: {
                  showPreviews: true
              },
              // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
              link: {
                  decorators: {
                      addTargetToExternalLinks: true,
                      defaultProtocol: 'https://',
                      toggleDownloadable: {
                          mode: 'manual',
                          label: 'Downloadable',
                          attributes: {
                              download: 'file'
                          }
                      }
                  }
              },
              // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
              mention: {
                  feeds: [
                      {
                          marker: '@',
                          feed: [
                              '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                              '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                              '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                              '@sugar', '@sweet', '@topping', '@wafer'
                          ],
                          minimumCharacters: 1
                      }
                  ]
              },
              // The "super-build" contains more premium features that require additional configuration, disable them below.
              // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
              removePlugins: [
                  // These two are commercial, but you can try them out without registering to a trial.
                  // 'ExportPdf',
                  // 'ExportWord',
                  'CKBox',
                  'CKFinder',
                  'EasyImage',
                  // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
                  // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
                  // Storing images as Base64 is usually a very bad idea.
                  // Replace it on production website with other solutions:
                  // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
                  // 'Base64UploadAdapter',
                  'RealTimeCollaborativeComments',
                  'RealTimeCollaborativeTrackChanges',
                  'RealTimeCollaborativeRevisionHistory',
                  'PresenceList',
                  'Comments',
                  'TrackChanges',
                  'TrackChangesData',
                  'RevisionHistory',
                  'Pagination',
                  'WProofreader',
                  // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
                  // from a local file system (file://) - load this site via HTTP server if you enable MathType
                  'MathType'
              ]
          }).then(newEditor=>editor=newEditor);

document.getElementById("createBlogButton").onclick=()=>{createBlog()}


          async function createBlog(){
              const createBlog=confirm("are you sure want to create a blog??");
              if(!createBlog){return;}
              const description = editor.getData();
              const cover_image=document.querySelector('input[type="file"]').files[0];
              const tags=document.querySelector("#blogTags").value;
              const title=document.querySelector("#blogTitle").value;
              const shortDescription=document.querySelector("#blogShortDescription").value;
            if(!cover_image){return alert("Empty cover image is not allowed !!");}
            if(!description){return alert("Empty description is not allowed !!");}
            if(!title){return alert("Empty title is not allowed !!");}
            if(!tags){return alert("Empty tags is not allowed !!");}
            if(!shortDescription){return alert("Empty shortDescription is not allowed !!");}
            
            const data=new FormData();
            data.append("cover_image",cover_image);
            data.append("description",description);
            data.append("tags",tags);
            data.append("title",title);
            data.append("shortDescription",shortDescription);
            // document.getElementById("createBlogButton").style.display="none";
            const res=await fetch("/api/blog/create",{method:"POST",body:data});
            const result=await res.json();
            if(!result.success){return alert(result.error);}
            alert("Blog created success fully!!");
            window.location.href="/admin/dashboard";

          }

document.querySelector("#searchBlogButton").onclick=()=>{
    searchBlog(document.querySelector("#searchBlogPageInput").value)
}
let dateUl=document.querySelector("#blogDateList")
let dateUlOfUser=document.querySelector("#userDateList")
searchBlog(1);
searchUser(1);

async function searchBlog(nextPage){
              dateUl.innerHTML="Loading...."
            const keyword=document.querySelector("#searchBlogInput");
            const order=document.querySelector("#blogSearchOrder");
            let res=await fetch(`/api/blog/${nextPage}/15/search?title=${keyword.value}&order=${order.value}`);
            let data=await res.json();
            if(!data.success){    
                return alert(data.error)
            }
            showBlog(data.message);
        }

async function searchUser(nextPage){
              dateUlOfUser.innerHTML="Loading...."
            const keyword=document.querySelector("#searchUserInput");
            const order=document.querySelector("#userOrder");
            let res=await fetch(`/api/user/all/${nextPage}/15/search?title=${keyword.value}&order=${order.value}`);
            let data=await res.json();
            if(!data.success){    
                return alert(data.error)
            }
            showUser(data.message);
        }
        
        function showBlog(blog){
            dateUl.innerHTML=" "
            blog.forEach(data => {
                dateUl.innerHTML+=` 
            <div class="blogListElement">
                <div class="bleLeft" style="background-image:url('/image/${data.cover_image}')">

                </div>
                <div class="bleRight">
                  <p>${data.createdAt.split("T")[0]}</p>
                  <h1>${data.title}</h1>
                  <div class="bleButtonSection">
                    <button class="deleteButton" blogId="${data.id}" blogTitle="${data.title}">Delete</button>
                    <button class="editButton" blogId="${data.id}">edit</button>
                    <button class="imageUpdateButton" blogId="${data.id}" blogTitle="${data.title}">update image</button>
                    
                  </div>
                </div>
            </div>`
            
            });
         Array.from(document.querySelectorAll(".deleteButton")).forEach((button)=>{
          const blogId=button.getAttribute("blogId")
          const blogTitle=button.getAttribute("blogTitle")
          button.onclick=()=>{deleteBlog(blogId,blogTitle)}
        })
        Array.from(document.querySelectorAll(".imageUpdateButton")).forEach((button)=>{
            const blogId=button.getAttribute("blogId")
            const blogTitle=button.getAttribute("blogTitle")
            button.onclick=()=>{updateBlogImage(blogId,blogTitle)}
        })
        Array.from(document.querySelectorAll(".editButton")).forEach((button)=>{
            const blogId=button.getAttribute("blogId")
            const blogTitle=button.getAttribute("blogTitle")
            button.onclick=()=>{editBlog(blogId,blogTitle)}
        })

        }
        function showUser(user){
            dateUlOfUser.innerHTML=" "
            user.forEach(data => {
                dateUlOfUser.innerHTML+=` 
            <div class="blogListElement">
                <div class="bleLeft" style="background-image:url('${data.avatar||"https://picsum.photos/200/200"}')">
                </div>
                <div class="bleRight">
                  <p>${data.createdAt.split("T")[0]}</p>
                  <h1>${data.name} (${data.email}) - ${data.role} - verified= ${data.isActivated}</h1>
                  <div class="bleButtonSection">
                    <button class="deleteButtonForUser" userId="${data.id}" userTitle="${data.name}">Delete</button>
                    <button class="editButton" userId="${data.id}">edit</button>
                    <button class="imageUpdateButton" userId="${data.id}" userTitle="${data.name}">update image</button>
                    
                  </div>
                </div>
            </div>`
            
            });
         Array.from(document.querySelectorAll(".deleteButtonForUser")).forEach((button)=>{
          const userId=button.getAttribute("userId")
          const userTitle=button.getAttribute("userTitle")
          button.onclick=()=>{deleteUser(userId,userTitle)}
        })

        }

        async function editBlog(id){
            const pendingBlog=await fetch("/api/blog/"+id);
            const blog=await pendingBlog.json();

            if(!blog.success){


                return;
            }
            document.getElementById("createArea").scrollIntoView()
            blogTitle.value=blog.message.title;
            blogShortDescription.value=blog.message.shortDescription;
            blogTags.value=blog.message.tags;
            editor.setData(blog.message.description);
            updatingBlogId=blog.message.id;
        }
        
document.querySelector("#updateBlogButton").onclick=()=>{updateBlog()}
        
async function updateBlog(){
    if(!updatingBlogId){return alert("select the blog first")}
    const createBlog=confirm("are you sure want to update a blog??")
    if(!createBlog){return}
              const description = editor.getData();
              const tags=document.querySelector("#blogTags").value
              const title=document.querySelector("#blogTitle").value
              const shortDescription=document.querySelector("#blogShortDescription").value;
            if(!description){return alert("Empty description is not allowed !!")}
            if(!title){return alert("Empty title is not allowed !!")}
            if(!tags){return alert("Empty tags is not allowed !!")}
            if(!shortDescription){return alert("Empty shortDescription is not allowed !!")}
            const data=JSON.stringify({
                description,tags,title,shortDescription
            })
            document.getElementById("updateBlogButton").style.display="none"
            try{
                
                const res=await fetch(`/api/blog/${updatingBlogId}`,{method:"POST",body:data,headers:{"Content-Type":"application/json"}});
                const result=await res.json()
                if(!result.success){
                    document.getElementById("updateBlogButton").style.display="block"
                    return alert(result.error)}
                updatingBlogId=undefined;
                alert("Blog updated success fully!!")
                window.location.href="/admin/dashboard"
            }catch(err){
                document.getElementById("updateBlogButton").style.display="block"
                console.log(err)
            }
        }
        


        function updateBlogImage(blogId,blogTitle){

     document.querySelector(".dim").style.display="block";
     document.querySelector(".img-area1").dataset.img="Image not selected !!"
     document.querySelector(".img-area1").innerHTML=`
     <i class='bx bxs-cloud-upload icon'></i>
          <h3>Upload Image</h3>
          <p>Image size must be less than <span>2MB</span></p>
     `;
     document.querySelector("#updateImageTitle").innerText="Title: "+ blogTitle;
     document.querySelector("#file1").value=null;
     document.querySelector("#file1").src=null;
     
     document.querySelector(".updateImage1").onclick=()=>{
         updateImage(blogId,blogTitle)
    }
    
}



async function updateImage(blogId,blogTitle){
    
    const updateImage=confirm("are you sure want to update image ?"+ "\n Title:"+blogTitle)
        const cover_image=document.querySelector('#file1').files[0]
        if(!updateImage || !cover_image){return}

        const formData=new FormData();
        formData.append("cover_image",cover_image);
                const data= await fetch(`/api/blog/coverImage/${blogId}`,{method:'POST',body:formData})
                const result=await data.json();
                if(!result.success){
                    return alert(result.error)
                }
                searchBlog(1)
                document.querySelector(".dim").style.display="none";
                  }



       async function deleteBlog(blogId){
        const deleteBlog=confirm("are you sure want to delete a blog??")
if(!deleteBlog){return}
                const data= await fetch(`/api/blog/${blogId}`,{method:'delete'})
                const pendingResult=await data.json();
                const result=await pendingResult;
                if(!result.success){
                    return alert(result.error)
                }
                searchBlog(1)
                return alert(result.message)
       }


       async function deleteUser(userId){
        const deleteUser=confirm("are you sure want to delete a blog??")
if(!deleteUser){return}
                const data= await fetch(`/api/user/deleteAccount/${userId}`,{method:'delete'})
                const pendingResult=await data.json();
                const result=await pendingResult;
                if(!result.success){
                    return alert(result.error)
                }
                searchUser(1)
                return alert(result.message)
       }



    //    image preview
    const selectImage = document.querySelector('.select-image');
    const selectImage1 = document.querySelector('.select-image1');
const inputFile = document.querySelector('#file');
const inputFile1 = document.querySelector('#file1');
const imgArea = document.querySelector('.img-area');
const imgArea1 = document.querySelector('.img-area1');

selectImage.addEventListener('click', function () {
	inputFile.click();
})
selectImage1.addEventListener('click', function () {
	inputFile1.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.classList.add('previewImageJs');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
})
inputFile1.addEventListener('change', function () {
	const image1 = this.files[0]
	if(image1.size < 2000000) {
		const reader1 = new FileReader();
		reader1.onload = ()=> {
			const allImg1 = imgArea1.querySelectorAll('img1');
			allImg1.forEach(item=> item.remove());
			const imgUrl1 = reader1.result;
			const img1 = document.createElement('img');
			img1.src = imgUrl1;
			imgArea1.appendChild(img1);
			imgArea1.classList.add('active');
			imgArea1.dataset.img = image1.name;
		}
		reader1.readAsDataURL(image1);
	} else {
		alert("Image size more than 2MB");
	}
})

document.querySelector(".cancelUpdateImage").onclick=()=>{
    document.querySelector(".dim").style.display="none";
}

