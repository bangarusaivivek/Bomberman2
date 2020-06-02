let bombArray;
let score  = 0
const redselect = 'redselect'
const greenselect = 'greenselect'
const cellElements = document.querySelectorAll('.cell')
const winningMessageDisplay = document.querySelector('.messageDisplay')
const winningMessage = document.getElementById('winningMessage')
const restartButtton = document.getElementById("restartButton")
const scoreElement = document.querySelector(".scoreElement")
const resetButtton = document.querySelector(".restartButton")
//console.log(document.querySelector('body'))
startGame()
restartButton.addEventListener('click',startGame);
resetButton.addEventListener('click',startGame);
function startGame(){
    console.log(document.querySelector('body'))
    score = 0
    let h = ""
    document.querySelector('.score').innerHTML = `score : ${score}`
    bombArray = []
    createArray()
    //console.log(bombArray)
    cellElements.forEach(cell =>{
        cell.classList.remove(redselect,greenselect,"disabled","warning");
        //cell.classList.remove("firstedge","firstedgeright","firstedgedown","firstedgedownright")
        cell.innerHTML = "";
        cell.removeEventListener('click',toClickClass)
        cell.removeEventListener('mouseover',highlightClass)
        cell.removeEventListener('mouseout',highlightClass1)



        cell.addEventListener('click',toClickClass,{once:true})
        cell.addEventListener('contextmenu',warningBombClass,{once:true})
        // cell.addEventListener('mouseover',edge)
        // cell.removeEventListener('mouseout',edge1)
    })
    winningMessage.classList.remove("show")
}

function toClickClass(e){
    //console.log(e.target.id)
    let cell = e.target
    //console.log(cell)
    let flag = false
    let bomb_val = parseInt(cell.id)
    //console.log(typeof bomb_val)
    
    if (bombArray.includes(bomb_val)){ flag = true;}

    checkClass(cell,flag,bomb_val);
    //console.log(fail)
}
function warningBombClass(e){
    //console.log('clicked')
    //console.log(e.target);
    e.target.classList.add("warning")
    let node = document.createElement("span")
    let textnode = document.createTextNode("bomb might be there")
    node.appendChild(textnode)
    node.className="child"
    document.getElementById(e.target.id).appendChild(node);

}
function checkClass(cell,flag,bomb_val){
    if (flag){
        
        makeDisable()
        
        document.getElementById('bomb').classList.add('show')
        setTimeout(function(){
            document.getElementById('bomb').classList.remove('show')
        },500)
        cell.classList.add(redselect)
        displayBombs()
    
        winningText(score)
        //displayBombs()
        
    }
    else{
        cell.classList.remove("warning")
        cell.classList.add(greenselect)
        let h = "highlight"
        score++
        document.querySelector('.score').innerHTML = `score : ${score}`
        let noB = noOfBombs(bomb_val,cell,h)
        cell.innerHTML = `${noB}`
        cell.addEventListener('mouseover',highlightClass)
        cell.addEventListener('mouseout',highlightClass1)
        if (score === 72){
            makeDisable();
            winningText(score);
        }
        
    }
}

function winningText(score){
    //console.log(score)
    if (score === 72){
        document.querySelector('.score').innerHTML = `score : ${score}`
        scoreElement.innerHTML = `score : ${score}`
        winningMessageDisplay.innerHTML = 'congratulations you won'
        //console.log("1")
        
    }
    else{
        document.querySelector('.score').innerHTML = `score : ${score}`
        scoreElement.innerHTML = `score : ${score}`
        winningMessageDisplay.innerHTML = 'Best of luck'
        //console.log("2")        
    }
    //console.log(winningMessageDisplay)
    setTimeout(function(){
        winningMessage.classList.add('show')
    },3000)
    
}
function makeDisable(){
    cellElements.forEach(cell => {
        cell.classList.add("disabled");
    });
};

function bombDisplay(){
    //console.log(document.getElementById('bomb'))
    document.getElementById('bomb').classList.add('show')
}
function displayBombs(){

        bombArray.forEach(cell => {
            setTimeout(function(){
                document.getElementById(cell).classList.add(redselect);
                console.log(document.getElementById(cell))
                
            },1000)
            //console.log(cell)
            setTimeout(function(){
                document.getElementById(cell).classList.remove(redselect);
                console.log(document.getElementById(cell))
                
            },2500)

    })   
}
function createArray(){
    bombArray.push(Math.ceil(Math.random()*81))
    for(let i=0;i<8;i++){
            let random = Math.ceil(Math.random()*81)
            for(let j=0;j<bombArray.length;i++){
                if (random !== bombArray[j]){
                    bombArray.push(random)
                    break
                }
                else{
                    continue;
                }
            }
    }
    //console.log(createArray)
}
function hideBombs(){
    bombArray.forEach(cell=>{
        document.getElementById(cell).classList.remove(redselect);
        //console.log(document.getElementById(cell))
    })
}
function removeMouseEvent(e){
    document.querySelectorAll(".cell")
}
function noOfBombs(bomb_val,cell,h)
{
    console.log("i clicked")
    let temp = bomb_val;
    let val = 0;
    //console.log(typeof temp,temp)
    
    //console.log(clsname) 
    //CORNER CASES
    if (temp === 1){
        
        
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        //console.log(cell)
        return val;
    }
    //console.log(val)
    if (temp === 9){
        
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        return val;
    }
    if (temp === 73){
        
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-8)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        return val;
    }
    if (temp === 81){
        
        if (bombArray.includes(temp-10)){val++;}
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-1)){val++;}
        return val;
    }
    //Edge CASES
    //Left
    else if (temp % 9 == 1){
        

        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-8)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        return val;
    }
    //Top
    else if ((Math.floor(temp/9)) == 0){
        
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        return val;
    }
    //Right
    else if (temp % 9 == 0){
        
        if (bombArray.includes(temp-10)){val++;}
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        return val;
    }
    //Bottom
    else if ((Math.ceil(temp/9)) == 9){
        
        if (bombArray.includes(temp-10)){val++;}
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-8)){val++;}
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+1)){ val++;}
        return val;
    }
    else{
        
        if (bombArray.includes(temp-10)){val++;}
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-8)){val++;}
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        return val;

    }
    //console.log(val)
}


// document.querySelectorAll(".greenselect").forEach(cell=>{
//     console.log(cell)
//     cell.addEventListener('mouseover',(event)=>{
//         console.log(event.target)
//         event.target.getElementById('id').classList.add('borderhover')
//     })
//     cell.addEventListener('mouseout',(event)=>{
//         event.target.classList.remove('borderhover')
//     })
// })

function highlightClass(event)
{
    console.log("i clicked")
    let temp = parseInt(event.target.id);
    let val = 0;
    //console.log(typeof temp,temp)
    
    //console.log(clsname) 
    //CORNER CASES
    if (temp === 1){
        console.log(typeof temp)
            //console.log(cell.className)        
            event.target.classList.add("firstedge")
            document.getElementById(temp+1).classList.add("firstedgeright")
            document.getElementById(temp+9).classList.add("firstedgedown")
            document.getElementById(temp+10).classList.add("firstedgedownright")
            console.log(cell)
            // console.log(document.getElementById(temp+1))
            // console.log(document.getElementById(temp+9))
            // console.log(document.getElementById(temp+10))
        
        
    }
    //console.log(val)
    if (temp === 9){
    
            //console.log(cell)
            event.target.classList.add("secondedge")
            document.getElementById(temp-1).classList.add("secondedgeleft")
            document.getElementById(temp+9).classList.add("secondedgedown")
            document.getElementById(temp+8).classList.add("secondedgedownleft")
        
    }
    if (temp === 73){
            //console.log(cell)
            event.target.classList.add("thirdedge")
            document.getElementById(temp+1).classList.add("thirdedgeright")
            document.getElementById(temp-9).classList.add("thirdedgeup")
            document.getElementById(temp-8).classList.add("thirdedgeupright")
    
    }
    if (temp === 81){
       
            //console.log(cell)
            event.target.classList.add("fourthedge")
            document.getElementById(temp-1).classList.add("fourthedgeleft")
            document.getElementById(temp-9).classList.add("fourthedgeup")
            document.getElementById(temp-10).classList.add("fourthedgeupleft")
            
    }
    //Edge CASES
    //Left
    else if (temp % 9 == 1){

            //console.log(cell)
            event.target.classList.add("leftedge")
            document.getElementById(temp+1).classList.add("leftedgeright")
            document.getElementById(temp+9).classList.add("leftedgedown")
            document.getElementById(temp+10).classList.add("leftedgedownright")
            document.getElementById(temp-8).classList.add("leftedgeupright")
            document.getElementById(temp-9).classList.add("leftedgeup")
            
        
        
    }
    //Top
    else if ((Math.floor(temp/9)) == 0){
            //console.log(cell)
            event.target.classList.add("topedge")
            document.getElementById(temp+1).classList.add("topedgeright")
            document.getElementById(temp+9).classList.add("topedgedown")
            document.getElementById(temp+10).classList.add("topedgedownright")
            document.getElementById(temp+8).classList.add("topedgedownleft")
            document.getElementById(temp-1).classList.add("topedgeleft")
        
    }
    //Right
    else if (temp % 9 == 0){
       
            //console.log(cell)
            event.target.classList.add("rightedge")
            document.getElementById(temp+9).classList.add("rightedgedown")
            document.getElementById(temp-9).classList.add("rightedgeup")
            document.getElementById(temp-1).classList.add("rightedgeleft")
            document.getElementById(temp-10).classList.add("rightedgeleftup")
            document.getElementById(temp+8).classList.add("rightedgeleftdown")
       
    }
    //Bottom
    else if ((Math.ceil(temp/9)) == 9){
       
            //console.log(cell)
            event.target.classList.add("bottomedge")
            document.getElementById(temp-1).classList.add("bottomleft")
            document.getElementById(temp+1).classList.add("bottomright")
            document.getElementById(temp-9).classList.add("bottomup")
            document.getElementById(temp-10).classList.add("bottomupleft")
            document.getElementById(temp-8).classList.add("bottomupright")
       
    }
    else{
        
            //console.log(cell)
            event.target.classList.add("middle")
            document.getElementById(temp-1).classList.add("middleleft")
            document.getElementById(temp+1).classList.add("middleright")
            document.getElementById(temp-9).classList.add("middleup")
            document.getElementById(temp-8).classList.add("middleupright")
            document.getElementById(temp-10).classList.add("middleupleft")
            document.getElementById(temp+8).classList.add("middledownleft")
            document.getElementById(temp+9).classList.add("middledown")
            document.getElementById(temp+10).classList.add("middledownright")

        }
    //console.log(val)
}

function highlightClass1(event)
{
    console.log("i clicked")
    let temp = parseInt(event.target.id);
    let val = 0;
    //console.log(typeof temp,temp)
    
    //console.log(clsname) 
    //CORNER CASES
    if (temp === 1){
    
        
            document.getElementById(temp).classList.remove("firstedge")
            document.getElementById(temp+1).classList.remove("firstedgeright")
            document.getElementById(temp+9).classList.remove("firstedgedown")
            document.getElementById(temp+10).classList.remove("firstedgedownright")
            

    }
    //console.log(val)
    if (temp === 9){
        
       
            document.getElementById(temp).classList.remove("secondedge")
            document.getElementById(temp-1).classList.remove("secondedgeleft")
            document.getElementById(temp+9).classList.remove("secondedgedown")
            document.getElementById(temp+8).classList.remove("secondedgedownleft")
            
        
    }
    if (temp === 73){
        
            document.getElementById(temp).classList.remove("thirdedge")
            document.getElementById(temp+1).classList.remove("thirdedgeright")
            document.getElementById(temp-9).classList.remove("thirdedgeup")
            document.getElementById(temp-8).classList.remove("thirdedgeupright")
       
    }
    if (temp === 81){
        
            document.getElementById(temp).classList.remove("fourthedge")
            document.getElementById(temp-1).classList.remove("fourthedgeleft")
            document.getElementById(temp-9).classList.remove("fourthedgeup")
            document.getElementById(temp-10).classList.remove("fourthedgeupleft")
            
    
    }
    //Edge CASES
    //Left
    else if (temp % 9 == 1){
            document.getElementById(temp).classList.remove("leftedge")
            document.getElementById(temp+1).classList.remove("leftedgeright")
            document.getElementById(temp+9).classList.remove("leftedgedown")
            document.getElementById(temp+10).classList.remove("leftedgedownright")
            document.getElementById(temp-8).classList.remove("leftedgeupright")
            document.getElementById(temp-9).classList.remove("leftedgeup")
        
    }
    //Top
    else if ((Math.floor(temp/9)) == 0){
        
            document.getElementById(temp).classList.remove("topedge")
            document.getElementById(temp+1).classList.remove("topedgeright")
            document.getElementById(temp+9).classList.remove("topedgedown")
            document.getElementById(temp+10).classList.remove("topedgedownright")
            document.getElementById(temp+8).classList.remove("topedgedownleft")
            document.getElementById(temp-1).classList.remove("topedgeleft")
       
    }
    //Right
    else if (temp % 9 == 0){
        
            document.getElementById(temp).classList.remove("rightedge")
            document.getElementById(temp+9).classList.remove("rightedgedown")
            document.getElementById(temp-9).classList.remove("rightedgeup")
            document.getElementById(temp-1).classList.remove("rightedgeleft")
            document.getElementById(temp-10).classList.remove("rightedgeleftup")
            document.getElementById(temp+8).classList.remove("rightedgeleftdown")
       
    }
    //Bottom
    else if ((Math.ceil(temp/9)) == 9){
        
            document.getElementById(temp).classList.remove("bottomedge")
            document.getElementById(temp-1).classList.remove("bottomleft")
            document.getElementById(temp+1).classList.remove("bottomright")
            document.getElementById(temp-9).classList.remove("bottomup")
            document.getElementById(temp-10).classList.remove("bottomupleft")
            document.getElementById(temp-8).classList.remove("bottomupright")
      
    }
    else{
        
            event.target.classList.remove("middle")
            document.getElementById(temp-1).classList.remove("middleleft")
            document.getElementById(temp+1).classList.remove("middleright")
            document.getElementById(temp-9).classList.remove("middleup")
            document.getElementById(temp-8).classList.remove("middleupright")
            document.getElementById(temp-10).classList.remove("middleupleft")
            document.getElementById(temp+8).classList.remove("middledownleft")
            document.getElementById(temp+9).classList.remove("middledown")
            document.getElementById(temp+10).classList.remove("middledownright")
            
       

    }
    //console.log(val)
}