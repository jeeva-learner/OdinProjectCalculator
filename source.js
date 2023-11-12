/* --phase 1*/
/* Variables */
let UserInputArea = document.querySelector('.UserInput');
let ResultArea = document.querySelector('.Result');
let Result = '';
let UserInput = '';
let Operator = '';

/* Functions */

function NumberHandler(value){
    if (value.className!=="AC"){
    UserInput += value.innerText;   
    }
};

function OperatorHandler(value){
    Operator = value.innerText;
};

function UpdateUserInputArea(){
    if(UserInput.length < 31){
        UserInputArea.textContent = UserInput;
    }
};

/* Execution and data handling */
buttons = document.querySelectorAll('button');
buttons.forEach((item) => {

    item.addEventListener('click',()=>{
        if(item.className == "AC"){
            UserInput = '';
        }
        else if(['+','-','*','/','^'].includes(item)){
            OperatorHandler(item);
        }
        NumberHandler(item);
        UpdateUserInputArea();
    });
});

