
                const emailTag=document.getElementById("email");
                const password=document.getElementById("password");
                const login=document.getElementsByClassName("login")[0];
                const registerBTN=document.getElementById("registerBTN");

                registerBTN.onclick=()=>register()
                login.onclick=()=>location.href='/register'

                function showError(message){
                    document.getElementsByClassName("error")[0].innerHTML=`ERROR: ${message}`;
                    registerBTN.style.display="block"
                }
                async function register(){
                    registerBTN.style.display="none"
                    
                    if(!emailTag.value){return showError("enter your email please!")}
                    if(!password.value){return showError("enter your password please!")}
                  
        
                    let data={email:emailTag.value,password:password.value}
                    
                    let res=await fetch("http://localhost:8000/api/user/auth/login",{
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