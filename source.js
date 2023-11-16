/* Phase-1 14 Nov 23 */

// Variables

let FirstOperand = '';
let SecondOperand = '';
let Operator = '';
let Buttons = document.querySelectorAll('button');
let UserInputArea = document.querySelector('.UserInput');
let ResultArea = document.querySelector('.Result');
let Result = '';
let EqualPressed = false

// Functions

function ValueHandler(value){
    if(Operator.length === 0 ){
        if (FirstOperand.includes('.') && value.innerText === '.') {
            // If the FirstOperand already contains a decimal and the pressed value is also a decimal, do nothing.
            return;
        } else if (FirstOperand.length + value.innerText.length <= 31) {
            FirstOperand += value.innerText;
        }
    }
    else if(Operator.length !==0){
        if (SecondOperand.includes('.') && value.innerText === '.'){
            return
        }
        else if(SecondOperand.length + value.innerText.length <=31){
            SecondOperand += value.innerText;
        }
    }
}

function OperatorHandler(value){
    if(Operator.length === 0  && FirstOperand.length === 0){
        Operator = '' ;
    }
    else if(Operator.length === 0){
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

function DelHandler(){
    if(ResultArea.textContent.length > 0){
        ResultArea.textContent = '';
        Result = '';
    }
    else {
        UserInputArea.textContent = UserInputArea.textContent.slice(0,-1)
        let UserInput = UserInputArea.textContent;
        let LastOperatorIndex = FindLastOperatorIndex(UserInput);     
        if (LastOperatorIndex == -1){           // if an operator is not found
            FirstOperand = UserInput;
            SecondOperand = '';
            Operator = '';
        }
        else{            // If an Operator is found
            FirstOperand = UserInput.slice(0,LastOperatorIndex).trim()
            Operator = UserInput[LastOperatorIndex].trim()
            SecondOperand = UserInput.slice(LastOperatorIndex+1).trim()
        }
    }
}

function FindLastOperatorIndex(value){
    const Operators = ['+','-','%','x']
    for(let i = value.length -1; i>=0; i--){
        if (Operators.includes(value[i])){
            return i;
        }
    }
    return -1
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
    if(EqualPressed){
        FirstOperand = Result;
        Operator = '';
        SecondOperand = '';
        equalsPressed = false;
        UpdateDisplay()
    }
    else if (FirstOperand.length === 0 || SecondOperand.length === 0 || Operator.length === 0) {
        ResultArea.textContent = "Incomplete Inputs";
    }
    else {
        Operate(FirstOperand, SecondOperand, Operator);
        ResultArea.textContent = Result.toString();
        equalsPressed = true;  // Set the flag after the first equals press
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
        UpdateDisplay()
    }
    else if(button.className == 'del'){
        DelHandler()
    }
    else{
        ValueHandler(button)
        UpdateDisplay()
        }
    }) 
})