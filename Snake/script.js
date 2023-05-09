console.log("wel");

let inputDir={
    x:0,
    y:0
};

let score=0;
let speed=10;
let lastPaintTime=0;

let snakeArr=[
    {x:13,y:15},
]

let food={x:6,y:7}

function main(ctime)
{
    window.requestAnimationFrame(main);

    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameengine();
}

 function iscollide(snake)
 {
    // return false;

    // if u eat urself then 
  for(let i=1;i<snake.length;i++)
  {
      if(snake[i].x===snake[0].x  && snake[i].y===snake[0].y )
      {
          return true;

      }
  }

    // if ur head bumb into the wall
      if(snake[0].x>=18 ||snake[0].x<=0 ||snake[0].y>=18 ||snake[0].y<=0)
      {
          return true;
      }
    //    return false;
 }

function gameengine()
{     

    //Part 1: updating the snake array & food
   if(iscollide(snakeArr))
   {
       inputDir={x:0,y:0};
       alert("Game over!!!")
      snakeArr=[{x:13,y:15}];
      score=0;   
   } 
   
     //If food is eated , score is incremented  and regenerate the food
     if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
     {
         score+=1;
        //  if(score>hiscoreval)
        //  {
        //      hiscoreval=score;
        //      localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
        //      hiscorebox.innerHTML="Hiscore: "+hiscoreval;
        //  }
        let sc=document.getElementById('score');
         sc.innerHTML="Score: "+score;
         snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
          let a=2;
          let b=16;
         food={x:Math.round(a+(b-1)*Math.random()),y:Math.round(a+(b-1)*Math.random())} 
     }

     //moving the snake 
     for(let i=snakeArr.length-2;i>=0;i--)
     {
        //  const element=
        snakeArr[i+1]={...snakeArr[i]};
     }
      snakeArr[0].x+=inputDir.x;
      snakeArr[0].y+=inputDir.y;  

    //Part 2: Display snake and Food 
    //Dsiplay the Snake 
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}


// let hiscore=localStorage.getItem("hiscore");
// if(hiscore===null)
// {
//     hiscoreval=0;
//     localStorage.setItem('hiscore',JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval=JSON.parse(hiscore);
//     hiscorebox.innerHTML="Hiscore: "+ hiscore;
// }

window.requestAnimationFrame(main);

window.addEventListener("keydown",e=>{
    inputDir={x:0,y:1}

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;

            break;
        case "ArrowDown":
             console.log("ArrowDown");
             inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
           console.log("ArrowRight");
           inputDir.x=1;
            inputDir.y=0;
           break;
        default :
             break;           
    }
});

