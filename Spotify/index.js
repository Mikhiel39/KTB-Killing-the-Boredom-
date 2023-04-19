console.log("jghfghjgf")


let songindex=0;
let audioelement = new Audio("songs/1.mp3");
let masterplay=document.getElementById("masterplay");
let myprogressbar=document.getElementById("myprogressbar");

let songItems=Array.from(document.getElementsByClassName("songItem"));

let songs=[
{songname:"Perfect",filepath:"songs/1.mp3"},
{songname:"Until I Found U",filepath:"songs/2.mp3"},
// {songname:"Perfect",filepath:"songs/3.mp3"},
// {songname:"Perfect",filepath:"songs/4.mp3"},

]
songItems.forEach((element,i)=>{


    element.getElementsByClassName("songname")[0].innerText=songs[i].songname;
})

masterplay.addEventListener("click",()=>{
    if(audioelement.paused || audioelement.currentTime<=0)
    {
        audioelement.play();
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");

    }
    else{
        audioelement.pause();
        masterplay.classList.remove("fa-circle-pause");
        masterplay.classList.add("fa-circle-play");

    }

})
audioelement.addEventListener("timeupdate", ()=>{

   let progress=parseInt((audioelement.currentTime/audioelement.duration)*100);
   myprogressbar.value=progress;

})


myprogressbar.addEventListener("change", ()=>{


audioelement.currentTime=((myprogressbar.value*audioelement.duration)/100);

});   

const makeallplay=()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>
    {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })


}

Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeallplay();
        songindex=parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioelement.src=`songs/${songindex+1}.mp3`;
        audioelement.currentTime=0;
        audioelement.play();
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");
    })
})



document.getElementById("next").addEventListener("click",()=>{
    if(songindex>=1){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioelement.src=`songs/${songindex+1}.mp3`;
    audioelement.currentTime=0;
    audioelement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause"); 

})
document.getElementById("previous").addEventListener("click",()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1;
    }
    audioelement.src=`songs/${songindex+1}.mp3`;
    audioelement.currentTime=0;
    audioelement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause"); 

})



