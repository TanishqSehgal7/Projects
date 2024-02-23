const siCalc = document.querySelector('.si')
const ciCalc = document.querySelector('.ci')
const principalInput = document.getElementById('Principal')
const principalLabel = document.getElementsByClassName('principalLabel')
const interestRateInput = document.getElementById('Rate')
const interestRateLabel = document.getElementById('rateLabel')
const durationInput = document.getElementById('Duration')
const durationLabel = document.getElementById('durationLabel')
const compoundingTypeDropdown = document.getElementById('dropdown')
const compoundingTypeLabel = document.getElementById('compoundingTypeLabel')
const calculateInterestBtn = document.querySelector('.submit')

showDefaultSelectionOfSICalc()

let isSiClicked = true
let isCiClicked = false
console.log(`SI: ${isSiClicked}`)
console.log(`CI: ${isCiClicked}`)


siCalc.addEventListener('click', function(e) {
    isSiClicked = true
    isCiClicked = false
    selectCalculatorType()
    siCalc.style.background = "rgb(0, 255, 123)"
    ciCalc.style.background = "rgb(239, 236, 236)"
    console.log(`Is SI Clicked: ${isSiClicked}`)
    console.log(`Is CI Clicked: ${isCiClicked}`)

})
ciCalc.addEventListener('click', function(e) {
    isCiClicked = true
    isSiClicked = false
    selectCalculatorType()
    ciCalc.style.background = "rgb(0, 255, 123)"
    siCalc.style.background = "rgb(239, 236, 236)"
    console.log(`Is CI Clicked: ${isCiClicked}`)
    console.log(`Is SI Clicked: ${isSiClicked}`)
})

calculateInterestBtn.addEventListener('click', function(e){
    e.preventDefault()
    console.log(`SubmitClicked SI: ${isSiClicked}`)
    console.log(`Submit Clicked CI: ${isCiClicked}`)
    
    if(isSiClicked && !isCiClicked) {
        
        if(principalInput.value === ''|| isNaN(parseInt(principalInput.value)) || durationInput.value === ''|| 
            isNaN(parseInt(durationInput.value)) || interestRateInput.value === '' || isNaN(parseInt(interestRateInput.value))) {
                    
                showErrorMsgOnScreen()
        } else {
            // calculate SI HERE
            const p = parseInt(principalInput.value)
            const r = parseInt(interestRateInput.value)
            const t = parseInt(durationInput.value)
            console.log(`p: ${p}, r: ${r}, t: ${t}`)
            const result = calculateSI(p, r,t)
            showResultOnScreen(result)
            showResetCalculatorButton()
        }

    } else if(isCiClicked && !isSiClicked) {
        
        if(principalInput.value === ''|| isNaN(parseInt(principalInput.value)) || durationInput.value === ''|| 
            isNaN(parseInt(durationInput.value)) || interestRateInput.value === '' || compoundingTypeDropdown.value === '') {

                showErrorMsgOnScreen()
        } else {
            // calculate CI here
            const p = parseInt(principalInput.value)
            const r = parseInt(interestRateInput.value)
            const t = parseInt(durationInput.value)
            const ct = String(compoundingTypeDropdown.value)
            console.log(`Dropdownvalue: ${ct}`)
            const result = calculateCI(p,r,t,ct)
            showResultOnScreen(result)
        }

    }
})


function selectCalculatorType() {
    if(isSiClicked) {
        console.log(`Is Si Clicked: ${isSiClicked}`)
        console.log(`Is Ci Clicked: ${isCiClicked}`)
            compoundingTypeDropdown.style.visibility = "hidden"
            compoundingTypeLabel.style.visibility = "hidden"
    } else if(isCiClicked) {
        console.log(`Is Ci Clicked: ${isCiClicked}`)
        console.log(`Is Si Clicked: ${isSiClicked}`)
            compoundingTypeDropdown.style.visibility = "visible"
            compoundingTypeLabel.style.visibility = "visible"
    }
}

function showDefaultSelectionOfSICalc() {
        siCalc.style.background = "rgb(0, 255, 123)"
        compoundingTypeDropdown.style.visibility = "hidden"
        compoundingTypeLabel.style.visibility = "hidden"
}

function showErrorMsgOnScreen() {
    const error = document.createElement("p")
            error.innerText = "Please check the values entered for SI/CI calc"
            error.style.fontSize = "30px"
            error.style.color = "rgb(255, 92, 92)"
            document.querySelector(".myform").appendChild(error)

            setTimeout(function(){
                error.remove()
            },2000)
}

function calculateSI(principal, rate, duration) {
    return ((principal*rate*duration)/100);
}

function calculateCI(principal, rate, duration, compoundingType) {
    let n = 1
    let result = 0;
    switch(compoundingType) {
        case "Annual":
            n = 1;
            break;
        case "Semi Annual":
            n = 2;
            break;
        case "Quarterly":
            n=4;
            break;
        case "Monthly":
            n=12;
            break;
        case "Weekly":
            n = 52;
            break;
        case "Daily":
            n = 365;
            break;
        default:
            n = 1;
    }
    result = (Math.floor(principal * Math.pow((1 + (rate/(100*n))), (n*duration))) - principal)
    return result
}

function showResultOnScreen(result) {
    const resultValueHolder = document.createElement("p.result")
    resultValueHolder.innerText = `Amount of interest collected is: ${result}`
    resultValueHolder.style.fontSize = "30px"
    resultValueHolder.style.color = "rgb(1, 1, 1)"
    resultValueHolder.style.background = "rgb(165, 240, 201)"
    resultValueHolder.style.borderRadius = "10px"
    resultValueHolder.style.padding = "10px"
    document.querySelector(".myform").appendChild(resultValueHolder)

    const resetCalculator = document.createElement("button")
    resetCalculator.innerText = "Reset Calculator"
    resetCalculator.style.padding = "10px"
    resetCalculator.style.borderRadius = "10px"
    resetCalculator.style.background = "rgb(239, 236, 236)"
    resetCalculator.style.margin = "20px"
    document.querySelector(".cta").appendChild(resetCalculator)

    calculateInterestBtn.disabled = true
    calculateInterestBtn.style.background = "rgb(239, 236, 236)"

    resetCalculator.addEventListener('click', function(e){
        e.preventDefault()
        e.target.remove()
        principalInput.value = ""
        durationInput.value = ""
        interestRateInput.value = ""
        resultValueHolder.remove()
        calculateInterestBtn.disabled = false
        calculateInterestBtn.style.background = "rgb(93, 254, 155)"
    })

}


