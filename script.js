let container = document.getElementById("container");
if(localStorage.page === undefined){
    localStorage.setItem('page','1');
}
populate();
function populate(){
    let page = localStorage.page;
    if(page == 1){
        page1();
    }
    else if(page == 2){
        page2();
    }
    else if(page == 3){
        page3();
    }
    else if(page == 4){
        page4();
    }
    else{
        alertpage();
    }
}

function page1(){
    container.innerHTML = `
                                <h2>How many Teams here ?</h2>
                                <input type="number" id="noTeam">
                                <div class="btn" id='1'>Next</div>
                            `;

    let btn = document.getElementById('1');
    btn.addEventListener("click",function(){
        let teams= document.getElementById("noTeam").value;
        if(teams == ''){
            teams='2';
        }
        localStorage.setItem('page','2');
        storeNumber(teams);
        populate();
    })
}
function page2(){
    container.innerHTML = `
                            <h2>Give Me Name of Teams</h2>
                            <div class="input-cont"></div>
                            <div class="btn" id='1'>Next</div>
                            `;
    let inputContainer = document.querySelector('.input-cont');
    for(let i=0;i<localStorage.number;i++){
        inputContainer.innerHTML += `
        <input type="text" placeholder="Team ${i+1}" id='team${i+1}' class='teamname'>
        `
    }
    reset();
    let btn = document.getElementById('1');
    btn.addEventListener("click",function(){
        let teamname = document.querySelectorAll('.teamname');
        let nameArr = [];
        teamname.forEach(function(elm,index){
            let elmValue = elm.value;
            console.log(index);
            if(elmValue == ''){
                elmValue = `Team ${index+1}`;
            }
            nameArr.push(elmValue);
        })
        storeNames(nameArr);
        localStorage.setItem('page','3');
        populate();
        
    })
}
function page3(){
    let teamnames = getNames();
    container.innerHTML='';
    teamnames.forEach(function(elm){

        container.innerHTML += `
                                <div class="card">
                                    <h2>${elm}</h2>
                                    <h2 class="count" ></h2>
                                    <div class="btns">
                                        <div class="click" id='decrease-${elm}' onclick=countClick(this.id)>-</div>
                                        <div class="click" id='increase-${elm}' onclick=countClick(this.id)>+</div>
                                    </div>
                                </div>
                                `;
    });
    container.innerHTML += `<div class="btn" id='1'>Reset</div>`;
    displayGoal();
    let btn = document.getElementById('1');
    btn.addEventListener("click",function(){
        localStorage.setItem('page','1');
        populate();
        reset();
    })
}



function storeNumber(num){
    // console.log(localStorage.getItem(number));
    if(localStorage.number === null){
        localStorage.setItem('number',0);
    }
    num = parseInt(num);
    localStorage.setItem('number',num);
}

function storeNames(names){
    console.log(names);
    if(localStorage.teamname === null){
        localStorage.setItem('teamname','');
    }
    names = JSON.stringify(names)
    localStorage.setItem('teamname',names);
}

function getNames(){
    return JSON.parse(localStorage.teamname)
}

function countClick(elmID){
    let work = elmID.split('-');
    let names = getNames();
    for(let i=0;i<localStorage.number;i++){
        if(names[i]==work[1]){
            let goal = JSON.parse(localStorage.goal);
            if(work[0][0]=='i'){
                goal[i]=goal[i]+1;
            }
            else{
                goal[i]=goal[i]-1;
            }
            localStorage.setItem('goal',JSON.stringify(goal));
        }
    }
    displayGoal();
}

function reset(){
    if(localStorage.goal === null){
        localStorage.setItem('goal',JSON.stringify([]));
    }
    let temparr = [];
    for(let i=0;i<localStorage.number;i++){
        temparr.push(0);
    }
    
    localStorage.setItem('goal',JSON.stringify(temparr));
}

function displayGoal(){
    let display = document.querySelectorAll('.count');
    let goal = JSON.parse(localStorage.goal);
   

    for(let i=0;i<localStorage.number;i++){
        display[i].innerHTML = goal[i];
    }
}