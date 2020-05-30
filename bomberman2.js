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
    console.log(bombArray)
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
    let cell = e.target
    console.log(cell)
    let flag = false
    let bomb_val = parseInt(cell.id)
    console.log(typeof bomb_val)
    
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
    e.target.innerHTML = "!"
}
function checkClass(cell,flag,bomb_val){
    if (flag){
        
        makeDisable()
        console.log(cell)
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
        console.log('first time clicked')
        cell.classList.add(greenselect)
        score++
        document.querySelector('.score').innerHTML = `score : ${score}`
        let noB = noOfBombs(bomb_val)
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
    console.log(winningMessageDisplay)
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
    console.log(document.getElementById('bomb'))
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
        console.log(document.getElementById(cell))
    })
}

function noOfBombs(bomb_val)
{
    let temp = bomb_val;
    let val = 0;
    console.log(typeof temp,temp)

    //CORNER CASES
    if (temp === 1){
        console.log("1hi")
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        return val;
    }
    //console.log(val)
    if (temp === 9){
        console.log("9")
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        return val;
    }
    if (temp === 73){
        console.log("73")
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-8)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        return val;
    }
    if (temp === 81){
        console.log("81")
        if (bombArray.includes(temp-10)){val++;}
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-1)){val++;}
        return val;
    }
    //Edge CASES
    //Left
    if (temp % 9 == 1){
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-8)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        return val;
    }
    //Top
    if ((Math.floor(temp/9)) == 0){
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        if (bombArray.includes(temp+10)){val++;}
        return val;
    }
    //Right
    if (temp % 9 == 0){
        if (bombArray.includes(temp-10)){val++;}
        if (bombArray.includes(temp-9)){val++;}
        if (bombArray.includes(temp-1)){val++;}
        if (bombArray.includes(temp+8)){val++;}
        if (bombArray.includes(temp+9)){val++;}
        return val;
    }
    if ((Math.ceil(temp/9)) == 9){
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


