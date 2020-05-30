let bombArray;
let score  = 0
const redselect = 'redselect'
const greenselect = 'greenselect'
const cellElements = document.querySelectorAll('.cell')
const winningMessageDisplay = document.querySelector('.messageDisplay')
const winningMessage = document.getElementById('winningMessage')
const restartButtton = document.querySelector(".restartButton")
const scoreElement = document.querySelector(".scoreElement")

console.log(document.querySelector('body'))
startGame()
restartButton.addEventListener('click',startGame);
function startGame(){
    score = 0
    document.querySelector('.score').innerHTML = `score : ${score}`
    bombArray = []
    createArray()
    //console.log(bombArray)
    cellElements.forEach(cell =>{
        cell.classList.remove(redselect,greenselect,"disabled");
        cell.innerHTML = "";
        cell.removeEventListener('click',toClickClass)
        cell.addEventListener('click',toClickClass,{once:true})
        cell.addEventListener('contextmenu',warningBombClass,{once:true})
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
    // bombArray.forEach(curr =>{
    //     //console.log(curr,cell.id)
    //     if (curr == cell.id){
    //         flag = true;
    //     }
    // })

    checkClass(cell,flag,bomb_val);
    //console.log(fail)
}
function warningBombClass(e){
    //console.log('clicked')
    //console.log(e.target);
    e.target.innerHTML = "!"
    let node = document.createElement("span")
    let textnode = document.createTextNode("bomb might be there")
    node.appendChild(textnode)
    node.className="child"
    document.getElementById(e.target.id).appendChild(node);


    e.target.addEventListener("mouseover",(event)=>{
        //console.log(e.target)
        node.classList.add("show")
    })
    e.target.addEventListener("mouseout",(event)=>{
        node.classList.remove("show")
    })
    console.log(e.target)

    //document.querySelector('.warningdisplayhover').classList.add('show')
    //console.log(e.target)
    
}
function checkClass(cell,flag,bomb_val){
    if (flag){
        
        makeDisable()
        //console.log(cell)
        //cell.classList.add(redselect)
        //console.log(cell)
        document.getElementById('bomb').classList.add('show')
        setTimeout(function(){
            document.getElementById('bomb').classList.remove('show')
        },500)
        cell.classList.add(redselect)
        displayBombs()
        //hideBombs()
        //console.log("boom")
        //console.log(score);
        winningText(score)
        //displayBombs()
        
    }
    else{

        
        // document.getElementById('emoji').classList.add('show')
        // console.log(document.getElementById('emoji'+r))
        // setTimeout(function(){
        //     document.getElementById('emoji'+r).classList.remove('show')
        // },500)
        //console.log('first time clicked')
        cell.classList.add(greenselect)
        cell.addEventListener('mouseover',(event)=>{
            //console.log(cell)
            event.target.classList.add("one")
        })
        cell.addEventListener('mouseout',(event)=>{
            
            event.target.classList.remove("one")
            //console.log(cell)

        })
        score++
        document.querySelector('.score').innerHTML = `score : ${score}`
        let noB = noOfBombs(bomb_val,cell)
        cell.innerHTML = `${noB}`
        
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

function noOfBombs(bomb_val,cell)
{
    //console.log(cell)
    let temp = bomb_val;
    let val = 0;
    //console.log(typeof temp,temp)

    //CORNER CASES
    if (temp === 1){
        cell.addEventListener('mouseover',(event)=>{
            //console.log(cell)
            event.target.classList.add("firstedge")
            document.getElementById(temp+1).classList.add("firstedgeright")
            document.getElementById(temp+9).classList.add("firstedgedown")
            document.getElementById(temp+10).classList.add("firstedgedownright")
            console.log(document.getElementById(temp+1))
            console.log(document.getElementById(temp+9))
            console.log(document.getElementById(temp+10))
        })
        cell.addEventListener('mouseout',(event)=>{
            event.target.classList.remove("firstedge")
            document.getElementById(temp+1).classList.remove("firstedgeright")
            document.getElementById(temp+9).classList.remove("firstedgedown")
            document.getElementById(temp+10).classList.remove("firstedgedownright")
            
        })
        
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        //console.log(cell)
        return val;
    }
    //console.log(val)
    if (temp === 9){
        cell.addEventListener('mouseover',(event)=>{
            //console.log(cell)
            event.target.classList.add("secondedge")
            document.getElementById(temp-1).classList.add("secondedgeleft")
            document.getElementById(temp+9).classList.add("secondedgedown")
            document.getElementById(temp+8).classList.add("secondedgedownleft")
            
        })
        cell.addEventListener('mouseout',(event)=>{
            event.target.classList.remove("secondedge")
            document.getElementById(temp-1).classList.remove("secondedgeleft")
            document.getElementById(temp+9).classList.remove("secondedgedown")
            document.getElementById(temp+8).classList.remove("secondedgedownleft")
            
        })
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        return val;
    }
    if (temp === 73){
        cell.addEventListener('mouseover',(event)=>{
            //console.log(cell)
            event.target.classList.add("thirdedge")
            document.getElementById(temp+1).classList.add("thirdedgeright")
            document.getElementById(temp-9).classList.add("thirdedgeup")
            document.getElementById(temp-8).classList.add("thirdedgeupright")
            
        })
        cell.addEventListener('mouseout',(event)=>{
            //console.log(cell)
            event.target.classList.remove("thirdedge")
            document.getElementById(temp+1).classList.remove("thirdedgeright")
            document.getElementById(temp-9).classList.remove("thirdedgeup")
            document.getElementById(temp-8).classList.remove("thirdedgeupright")
            
        })
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-8)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        return val;
    }
    if (temp === 81){
        cell.addEventListener('mouseover',(event)=>{
            //console.log(cell)
            event.target.classList.add("fourthedge")
            document.getElementById(temp-1).classList.add("fourthedgeleft")
            document.getElementById(temp-9).classList.add("fourthedgeup")
            document.getElementById(temp-10).classList.add("fourthedgeupleft")
            
        })
        cell.addEventListener('mouseout',(event)=>{
            //console.log(cell)
            event.target.classList.remove("fourthedge")
            document.getElementById(temp-1).classList.remove("fourthedgeleft")
            document.getElementById(temp-9).classList.remove("fourthedgeup")
            document.getElementById(temp-10).classList.remove("fourthedgeupleft")
            
        })
        if (bombArray.includes(temp-10)){val++;}
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-1)){val++;}
        return val;
    }
    //Edge CASES
    //Left
    if (temp % 9 == 1){
        cell.addEventListener('mouseover',(event)=>{
            //console.log(cell)
            event.target.classList.add("leftedge")
            document.getElementById(temp+1).classList.add("leftedgeright")
            document.getElementById(temp+9).classList.add("leftedgedown")
            document.getElementById(temp+10).classList.add("leftedgedownright")
            document.getElementById(temp-8).classList.add("leftedgeupright")
            document.getElementById(temp-9).classList.add("leftedgeup")
            
        })
        cell.addEventListener('mouseout',(event)=>{
            //console.log(cell)
            event.target.classList.remove("leftedge")
            document.getElementById(temp+1).classList.remove("leftedgeright")
            document.getElementById(temp+9).classList.remove("leftedgedown")
            document.getElementById(temp+10).classList.remove("leftedgedownright")
            document.getElementById(temp-8).classList.remove("leftedgeupright")
            document.getElementById(temp-9).classList.remove("leftedgeup")
            
        })

        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-8)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        return val;
    }
    //Top
    if ((Math.floor(temp/9)) == 0){
        cell.addEventListener('mouseover',(event)=>{
            //console.log(cell)
            event.target.classList.add("topedge")
            document.getElementById(temp+1).classList.add("topedgeright")
            document.getElementById(temp+9).classList.add("topedgedown")
            document.getElementById(temp+10).classList.add("topedgedownright")
            document.getElementById(temp+8).classList.add("topedgedownleft")
            document.getElementById(temp-1).classList.add("topedgeleft")
            
        })
        cell.addEventListener('mouseout',(event)=>{
            //console.log(cell)
            event.target.classList.remove("topedge")
            document.getElementById(temp+1).classList.remove("topedgeright")
            document.getElementById(temp+9).classList.remove("topedgedown")
            document.getElementById(temp+10).classList.remove("topedgedownright")
            document.getElementById(temp+8).classList.remove("topedgedownleft")
            document.getElementById(temp-1).classList.remove("topedgeleft")
            
        })
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        return val;
    }
    //Right
    if (temp % 9 == 0){
        cell.addEventListener('mouseover',(event)=>{
            //console.log(cell)
            event.target.classList.add("rightedge")
            document.getElementById(temp+9).classList.add("rightedgedown")
            document.getElementById(temp-9).classList.add("rightedgeup")
            document.getElementById(temp-1).classList.add("rightedgeleft")
            document.getElementById(temp-10).classList.add("rightedgeleftup")
            document.getElementById(temp+8).classList.add("rightedgeleftdown")
            
        })
        cell.addEventListener('mouseout',(event)=>{
            //console.log(cell)
            event.target.classList.remove("rightedge")
            document.getElementById(temp+9).classList.remove("rightedgedown")
            document.getElementById(temp-9).classList.remove("rightedgeup")
            document.getElementById(temp-1).classList.remove("rightedgeleft")
            document.getElementById(temp-10).classList.remove("rightedgeleftup")
            document.getElementById(temp+8).classList.remove("rightedgeleftdown")
            
        })
        if (bombArray.includes(temp-10)){val++;}
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        return val;
    }
    //Bottom
    if ((Math.ceil(temp/9)) == 9){
        cell.addEventListener('mouseover',(event)=>{
            //console.log(cell)
            event.target.classList.add("bottomedge")
            document.getElementById(temp-1).classList.add("bottomleft")
            document.getElementById(temp+1).classList.add("bottomright")
            document.getElementById(temp-9).classList.add("bottomup")
            document.getElementById(temp-10).classList.add("bottomupleft")
            document.getElementById(temp-8).classList.add("bottomupright")
            
        })
        cell.addEventListener('mouseout',(event)=>{
            //console.log(cell)
            event.target.classList.remove("bottomedge")
            document.getElementById(temp-1).classList.remove("bottomleft")
            document.getElementById(temp+1).classList.remove("bottomright")
            document.getElementById(temp-9).classList.remove("bottomup")
            document.getElementById(temp-10).classList.remove("bottomupleft")
            document.getElementById(temp-8).classList.remove("bottomupright")
            
        })
        if (bombArray.includes(temp-10)){val++;}
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-8)){val++;}
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+1)){ val++;}
        return val;
    }
    else{
        cell.addEventListener('mouseover',(event)=>{
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
            
        })
        cell.addEventListener('mouseout',(event)=>{
            //console.log(cell)
            event.target.classList.remove("middle")
            document.getElementById(temp-1).classList.remove("middleleft")
            document.getElementById(temp+1).classList.remove("middleright")
            document.getElementById(temp-9).classList.remove("middleup")
            document.getElementById(temp-8).classList.remove("middleupright")
            document.getElementById(temp-10).classList.remove("middleupleft")
            document.getElementById(temp+8).classList.remove("middledownleft")
            document.getElementById(temp+9).classList.remove("middledown")
            document.getElementById(temp+10).classList.remove("middledownright")
            
        })
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


document.querySelectorAll(".greenselect").forEach(cell=>{
    console.log(cell)
    cell.addEventListener('mouseover',(event)=>{
        console.log(event.target)
        event.target.getElementById('id').classList.add('borderhover')
    })
    cell.addEventListener('mouseout',(event)=>{
        event.target.classList.remove('borderhover')
    })
})

