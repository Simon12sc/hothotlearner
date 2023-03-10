import { getAgo } from "./utils.js"
import { hideLoading,showLoading } from "./utils.js"
const login_button=document.getElementsByClassName("login_button")[0]
const user=document.getElementsByClassName("user")[0]
const logout_button=document.getElementsByClassName("logout_button")[0]
const myInfo=document.getElementsByClassName("myInfo")[0]
let userId=undefined;
login_button.onclick=()=>location.href='/login'        
logout_button.onclick=()=>logout()


function showMyInfo(myData){
  let birth=myData.dob?myData.dob.split('T')[0]:'';
  let address=myData.address?myData.address:"";
  let activateButton=!myData.isActivated?`<button class="activateButton" type="button">Activate Email</button>`:"";

    myInfo.innerHTML=`<form>
    <div class="box">
        <label for="email">Email</label>
        <input type="email" disabled placeholder="email" id="email" value="${myData.email}">
        <button type="button" id="emailButton">
            Update Email
          </button>
          ${activateButton}
        <label for="name">Full Name</label>
        <input type="text" placeholder="your full name" id="name" value="${myData.name}">
        <label for="dob">Birth</label>
        <input type="date" placeholder="email" id="dob" value="${birth}">
        <label for="email">Address</label>
        <input type="address" placeholder="enter your address please" id="address" value="${address}">
        <button id="updateMyInfo" type="button">Update</button>
        <label for="email">verified</label>
        <input type="text" disabled placeholder="activated or not" value="${myData.isActivated}">
        <label for="email">Joined</label>
        <input type="text" disabled placeholder="logged in date" value="${getAgo(myData.createdAt)}">
        <button id="changePasswordButton" type="button">Change Password</button>
        <button id="forgotPasswordButton" type="button">Forgot Password</button>
    </div>
</form>
    `
    if(!myData.isActivated){
    document.getElementsByClassName("activateButton")[0].onclick=()=>verifyEmail(myData.email);
    }
    document.querySelector("#updateMyInfo").onclick=()=>{update()}
    document.querySelector("#emailButton").onclick=()=>{updateEmail()}
    document.querySelector("#changePasswordButton").onclick=()=>{changePassword()}
    document.querySelector("#forgotPasswordButton").onclick=()=>{forgotPassword(myData.email)}
}

async function forgotPassword(email){
  let data={email}
  document.querySelector("#forgotPasswordButton").style.display="none"
  showLoading()
  let res=await fetch("api/user/verify",{
    method:'post',
      body:JSON.stringify(data),
      headers:{
          'Content-Type':"application/json"
      }
  })
  hideLoading();
  let result=await res.json();
  if(!result.success){return showError(result.error)}
  const code=window.prompt(`${result.message} \n enter the code please`);
  
  let data1={email,activateCode:code}
  showLoading();
  let res1=await fetch("api/user/forgot",{
      method:'post',
      body:JSON.stringify(data1),
      headers:{
          'Content-Type':"application/json"
        }
    })
    hideLoading();
    
      let result1=await res1.json();
      if(!result1.success){
        document.querySelector("#forgotPasswordButton").style.display="block"
        return showError(result1.error)
      }
      
      document.querySelector("#forgotPasswordButton").style.display="block"
      alert(result1.message);
    }
    async function changePassword(){
  const password=window.prompt("enter your old password");
  if(!password){return alert("old password is required to change..")}
  const newPassword=window.prompt("enter your new password");
  if(newPassword.length<8){return alert("aleast 8 characters in your new password is required..")}
  const confirmPassword=window.prompt("enter your new password again..");
  if(newPassword!==confirmPassword){return alert("two times entered new password is not same..")}


    let data={password,newPassword}
    showLoading();
    let res1=await fetch("api/user/update/password",{
        method:'post',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':"application/json"
        }
    })
    hideLoading();
    let result1=await res1.json();
    if(!result1.success){
        return alert(result1.error)
    }

    alert(result1.message);
}


async function updateEmail(){

  const email=window.prompt("enter your new email to update !")
    if(!email){return alert("enter your email please!")}
 
    const password=window.prompt("enter here your password");

    let data1={email,password}
    showLoading();
    let res1=await fetch("api/user/update/email",{
        method:'post',
        body:JSON.stringify(data1),
        headers:{
            'Content-Type':"application/json"
        }
    })
    hideLoading();
    let result1=await res1.json();
    if(!result1.success){
        return alert(result1.error)
    }

    alert(result1.message);
    location.href="/myInfo";
    activateButton.style.display="block"
}
async function update(){
  let name=document.querySelector("#name").value
  let dob=document.querySelector("#dob").value
  let address=document.querySelector("#address").value
  let password=window.prompt("enter your password please");
  if(!password){return alert("password is required !!")}
   

    let data={name,dob,address,password};
showLoading();
    let res=await fetch("api/user/update/myInfo",{
        method:'post',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':"application/json"
        }
    })
hideLoading();
    let result=await res.json()
    if(!result.success){return alert(result.error)}

    alert(result.message)
    window.location.href="/myInfo";

}

async function isLoggedIn(){
    showLoading();
    let res=await fetch(`/api/user/me`);
    hideLoading();
    let result = await res.json();
    
    if(result.success){
        showMyInfo(result.message);
        userId=result.message.id
        user.style.display="flex"
        userName.innerText=result.message.name;
        login_button.style.display="none"
        logout_button.style.display="block"
    }else{

        logout_button.style.display="none"
        user.style.display="none"
        login_button.style.display="block"
        myInfo.innerHTML="Please login!!!"
    }
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


async function verifyEmail(email){
    const activateButton=document.getElementsByClassName("activateButton")[0];
    activateButton.style.display="none"
    
    if(!email){return alert("enter your email please!")}
   

    let data={email}
    showLoading();
    let res=await fetch("api/user/verify",{
        method:'post',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':"application/json"
        }
    })
    hideLoading();
    let result=await res.json();
    if(!result.success){return alert(result.error)}
    const code=window.prompt(`${result.message} \n enter the code please`);
    if(!code){
      alert("I cancel the process because no code found !!")
    }
    let data1={email,activateCode:code}
    showLoading();
    let res1=await fetch("api/user/activate",{
        method:'post',
        body:JSON.stringify(data1),
        headers:{
            'Content-Type':"application/json"
        }
    })
    hideLoading();
    let result1=await res1.json();
    if(!result1.success){
      activateButton.style.display="block"
      return alert(result1.error)
    }
    
    alert(result1.message);
    activateButton.style.display="block"
    location.href="/myInfo";
    
}


isLoggedIn();