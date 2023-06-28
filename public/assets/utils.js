
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
      return agoYear + " yr ago";
    } else if (agoMonth >= 1) {
      return agoMonth + " mth ago";
    } else if (agoDate >= 1) {
      return agoDate + " d ago";
    } else if (agoHour >= 1) {
      return agoHour + " hr ago";
    } else if (agoMinute >= 1) {
      return agoMinute + " min ago";
    } else {
      return agoSecond + "sec ago"
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
  
  export function getAgo(fullDate){
  let uploadedTime = dateSpliter(fullDate);
  return agoDate(uploadedTime)
  }


  export function scrolltoId(element){
    window.scrollTo({
    top: element.scrollTop,
    left: element.scrollLeft});
    }

    
    export function showLoading(){
      document.querySelector("#loading").style.display="flex"

    }
    export function hideLoading(){
      document.querySelector("#loading").style.display="none"
    }

    export function returnViews(number){
      if(number>=1000000){
        return `${Math.round(number/1000000)} m`;
      }else if(number>=1000){
        return number/1000+" k";
      }else{
        return number;
      }
    }


    export async function recommendVideo(elem,category){
      let nextPage=1
      let res=await fetch(`/api/blog/${nextPage}/15/search?title=${category}&order=${1}`);
      const data=await res.json();
console.log(data)
        elem.innerHTML="<h1 style=`color:red;`>loading....</h1>"
        if(data.message.length===0){return elem.innerHTML="<h1 style=`color:red;`>No result found !!</h1>";}
        elem.innerHTML=" ";
        data.message.forEach(element => {
            elem.innerHTML+=`<div class="blog" blog_id="${element.id}">
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

repeatFinder([1,1,2,3,5,6,2,1,])
  function repeatFinder(arr){

  // for(let i=0;i<arr.length;i++){
  //   for(let j=0;j<arr.length;i++){
  //     console.log(arr[j]===arr[i]);
  //   }
  // }
  for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr.length;j++){
    }
  }
  }
    