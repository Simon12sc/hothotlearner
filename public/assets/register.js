const nameTag=document.getElementById("name");
const emailTag=document.getElementById("email");
const password=document.getElementById("password");
const Cpassword=document.getElementById("Cpassword");
const registerBTN=document.getElementById("registerBTN");
const login=document.getElementsByClassName("login")[0];

registerBTN.onclick=()=>register();
login.onclick=()=>{location.href='/login'}
function showError(message){
    document.getElementsByClassName("error")[0].innerHTML=`ERROR: ${message}`;
    registerBTN.style.display="block"
}
async function register(){
    registerBTN.style.display="none"
    if(!nameTag.value){return showError("enter your name please!")}
    
    if(!emailTag.value){return showError("enter your email please!")}
    if(!password.value){return showError("enter your password please!")}
    if(!Cpassword.value){return showError("enter your confirm password please!")}
    if(password.value!==Cpassword.value){return showError("your password and confirm password doesn't matched")}

    let data={name:nameTag.value,email:emailTag.value,password:password.value}
    
    let res=await fetch("http://localhost:8000/api/user/auth/register",{
        method:'post',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':"application/json"
        }
    })
    
    let result=await res.json();
    registerBTN.style.display="block"
    if(!result.success){return showError(result.error)}
    
    window.location.href = "/";
    
}