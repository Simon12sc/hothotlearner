
                const emailTag=document.getElementById("email");
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
                   
        
                    let data={email:emailTag.value}
                    
                    let res=await fetch("api/user/verify",{
                        method:'post',
                        body:JSON.stringify(data),
                        headers:{
                            'Content-Type':"application/json"
                        }
                    })
                    
                    let result=await res.json();
                    if(!result.success){return showError(result.error)}
                    const code=window.prompt(`${result.message} \n enter the code please`);
                    
                    let data1={email:emailTag.value,activateCode:code}
                    let res1=await fetch("api/user/forgot",{
                        method:'post',
                        body:JSON.stringify(data1),
                        headers:{
                            'Content-Type':"application/json"
                        }
                    })
                    
                    let result1=await res1.json();
                    if(!result1.success){
                        return showError(result1.error)
                    }

                    alert(result1.message);
                    location.href="login";
                    registerBTN.style.display="block"
                    
                }