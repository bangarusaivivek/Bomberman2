let bombArray;
let newBombArray;
let score  = 0
const redselect = 'redselect'
const greenselect = 'greenselect'
const cellElements = document.querySelectorAll('.cell')
const winningMessageDisplay = document.querySelector('.messageDisplay')
const winningMessage = document.getElementById('winningMessage')
const restartButtton = document.getElementById("restartButton")
const scoreElement = document.querySelector(".scoreElement")
const resetButtton = document.querySelector(".restartButton")

// Start Game
startGame()
// Restart Game
restartButton.addEventListener('click',startGame);
// Reset Game
resetButton.addEventListener('click',startGame);

// Game Start Function
function startGame(){
    score = 0
    let h = ""
    document.querySelector('.score').innerHTML = `score : ${score}`
    bombArray = []
    createArray()
    newBombArray = []
    changeBombArray()
    cellElements.forEach(cell =>{
        cell.classList.remove(redselect,greenselect,"disabled","warning");
        cell.innerHTML = "";
        cell.removeEventListener('click',toClickClass)
        cell.removeEventListener('mouseover',highlightClass)
        cell.removeEventListener('mouseout',highlightClass1)
        cell.addEventListener('click',toClickClass,{once:true})
        cell.addEventListener('contextmenu',warningBombClass,{once:true})
    })
    winningMessage.classList.remove("show")
}

// On Clicking event
function toClickClass(e){
    e.preventDefault();
    let cell = e.target
    let flag = false
    let bomb_val = parseInt(cell.id)
    if (bombArray.includes(bomb_val)){ flag = true;}
    checkClass(cell,flag,bomb_val);
}

// Check whether bomb was there or not
function checkClass(cell,flag,bomb_val){
    if (flag){
        makeDisable()
       
        cell.classList.add(redselect)
        displayBombs()
        winningText(score)
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

// winning text displays
function winningText(score){
    if (score === 72){
        document.querySelector('.score').innerHTML = `score : ${score}`
        scoreElement.innerHTML = `score : ${score}`
        winningMessageDisplay.innerHTML = 'congratulations you won'
        
    }
    else{
        document.querySelector('.score').innerHTML = `score : ${score}`
        scoreElement.innerHTML = `score : ${score}`
        winningMessageDisplay.innerHTML = 'Best of luck'
          
    }
    setTimeout(function(){
        winningMessage.classList.add('show')
    },3000)
    
}
//disable clicking functionality
function makeDisable(){
    cellElements.forEach(cell => {
        cell.classList.add("disabled");
    });
};

//Flag display
function warningBombClass(e){
    e.preventDefault();
    if(e.target.classList.contains("greenselect")){
        return;
    }
    else{
        e.target.classList.add("warning")
    }
    
    // let node = document.createElement("span")
    // let textnode = document.createTextNode("bomb might be there")
    // node.appendChild(textnode)
    // node.className="child"
    // document.getElementById(e.target.id).appendChild(node);

}

//display bombs 
function displayBombs(){
    let i = 1;
    bombArray.forEach(cell => {
        (function(){
            setTimeout(() => {
                document.getElementById(cell).classList.add(redselect);                    
            },i*200);
        })();
            i += 1;
        });
}

// BombArray
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
}

//newBombArray with row and column

function changeBombArray(){
    console.log("i am new")
    for(let i=0;i<bombArray.length;i++){
        let row = Math.floor(bombArray[i]/9)
        let col = (bombArray[i]-1) % 9
        console.log(row,col)
        newBombArray.push([row,col]);
    }

}

// Number of bombs in my rectangle box
function noOfBombs(bomb_val,cell,h){
    let temp = bomb_val
    let row = Math.floor(temp/9)
    let col = (temp-1)%9
    let cnt = 0
    let neighbors = [[row-1,col-1],[row-1,col],[row-1,col+1],[row,col-1],[row,col+1],[row+1,col-1],[row+1,col],[row+1,col+1]]
    for(let i=0;i<neighbors.length;i++){
        let r = neighbors[i][0]
        let c = neighbors[i][1]
        if(r >= 0 && r < 9 && c >= 0 && c < 9){
            for(let j=0;j<newBombArray.length;j++){
                if(newBombArray[j][0] === r && newBombArray[j][1] === c){
                    cnt++;
                }
            }
        }
    }
    return cnt;
}



// for highlighting rectangle box
function highlightClass(event)
{
    console.log("i clicked")
    let temp = parseInt(event.target.id);
    let val = 0;
 
    //CORNER CASES
    if (temp === 1){
        console.log(typeof temp)      
            event.target.classList.add("firstedge")
            document.getElementById(temp+1).classList.add("firstedgeright")
            document.getElementById(temp+9).classList.add("firstedgedown")
            document.getElementById(temp+10).classList.add("firstedgedownright")
            console.log(cell)
    }
   
    if (temp === 9){
            event.target.classList.add("secondedge")
            document.getElementById(temp-1).classList.add("secondedgeleft")
            document.getElementById(temp+9).classList.add("secondedgedown")
            document.getElementById(temp+8).classList.add("secondedgedownleft")
        
    }
    if (temp === 73){
            event.target.classList.add("thirdedge")
            document.getElementById(temp+1).classList.add("thirdedgeright")
            document.getElementById(temp-9).classList.add("thirdedgeup")
            document.getElementById(temp-8).classList.add("thirdedgeupright")
    
    }
    if (temp === 81){
            event.target.classList.add("fourthedge")
            document.getElementById(temp-1).classList.add("fourthedgeleft")
            document.getElementById(temp-9).classList.add("fourthedgeup")
            document.getElementById(temp-10).classList.add("fourthedgeupleft")
            
    }
    //Edge CASES
    //Left
    else if (temp % 9 == 1){
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
            event.target.classList.add("rightedge")
            document.getElementById(temp+9).classList.add("rightedgedown")
            document.getElementById(temp-9).classList.add("rightedgeup")
            document.getElementById(temp-1).classList.add("rightedgeleft")
            document.getElementById(temp-10).classList.add("rightedgeleftup")
            document.getElementById(temp+8).classList.add("rightedgeleftdown")
    }
    //Bottom
    else if ((Math.ceil(temp/9)) == 9){
            event.target.classList.add("bottomedge")
            document.getElementById(temp-1).classList.add("bottomleft")
            document.getElementById(temp+1).classList.add("bottomright")
            document.getElementById(temp-9).classList.add("bottomup")
            document.getElementById(temp-10).classList.add("bottomupleft")
            document.getElementById(temp-8).classList.add("bottomupright")
       
    }
    else{
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
}


function highlightClass1(event)
{

    let temp = parseInt(event.target.id);
    let val = 0;
   
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