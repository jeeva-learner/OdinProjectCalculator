/* Phase-1 14 Nov 23 */

// Variables

let FirstOperand = '';
let SecondOperand = '';
let Operator = '';
let Buttons = document.querySelectorAll('button');
let UserInputArea = document.querySelector('.UserInput');
let ResultArea = document.querySelector('.Result');
let Result = '';

// Functions

function ValueHandler(value){
    if(Operator.length === 0 ){
        FirstOperand += value.innerText;
    }
    else if(Operator.length !==0){
        SecondOperand += value.innerText
    }
}

function OperatorHandler(value){
    if(Operator.length === 0){
        Operator = value.innerText;
    }
    else if(Operator.length !==0 && FirstOperand.length!==0 && SecondOperand.length ===0){
        Operator = value.innerText;
    }
    else if(Operator.length !==0 && FirstOperand.length!==0 && SecondOperand.length!==0){
        Operate(FirstOperand,SecondOperand,Operator)
        Operator = value.innerText
        UserInputArea.textContent = `${Result} ${Operator}`
        FirstOperand = Result;
        SecondOperand = '';
        Result = '';
    }
}

function UpdateDisplay(){
        UserInputArea.textContent = `${FirstOperand} ${Operator} ${SecondOperand}`;
        Result=''
}

function ClearDisplay(){
    UserInputArea.textContent = '';
    ResultArea.textContent = '';
    FirstOperand = '';
    SecondOperand = '';
    Operator = '';
}

function EqualCalculation(){
    console.log("From equal")
    if (FirstOperand.length === 0 || SecondOperand.length === 0 || Operator.length === 0){
        ResultArea.textContent = "Incomplete Inputs"  
    }
    else{
        Operate(FirstOperand,SecondOperand,Operator)
        ResultArea.textContent = Result.toString()
        FirstOperand = '';
        SecondOperand = '';
        Operator = '';
        Result = '';
    }
}

function Operate(first,second,Operator){
    a = Number(first)
    b = Number(second)
    switch(Operator){
        case '+':
            Result += add(a,b)
            break;
        case '-':
            Result += sub(a,b)
            break;
        case 'x':
            Result += mul (a,b)
            break;
        case '%':
            if(b===0){
                Result = "Error: Division by Zero"
                break;
            }
            else{
                Result += div(a,b);
                break;
            }
        default:
            console.log("Error !")
    }
}

function add(a,b){
    return a+b
}

function sub(a,b){
    return a-b
}

function mul(a,b){
    return a*b
}

function div(a,b){
    return a/b
}

// Operation Flow and event handling

Buttons.forEach((button)=>{
    button.addEventListener('click',() => {
    if(['+','-','x','%'].includes(button.innerText)){
        OperatorHandler(button)
        UpdateDisplay()
    }
    else if(button.innerText == 'AC'){
        ClearDisplay()
    }
    else if(button.className == 'equals'){
        EqualCalculation()
    }
    else{
        ValueHandler(button)
        UpdateDisplay()
        }
    }) 
})