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

// console.log(siCalc, ciCalc)
showDefaultSelectionOfSICalc()

let isSiClicked = true
let isCiClicked = false

siCalc.addEventListener('click', function(e) {
    isSiClicked = true
    isCiClicked = false
    selectCalculatorType()
    siCalc.style.background = "rgb(0, 255, 123)"
    ciCalc.style.background = "rgb(239, 236, 236)"
})
ciCalc.addEventListener('click', function(e) {
    isCiClicked = true
    isSiClicked = false
    selectCalculatorType()
    ciCalc.style.background = "rgb(0, 255, 123)"
    siCalc.style.background = "rgb(239, 236, 236)"
})


function selectCalculatorType() {
    if(isSiClicked) {
        console.log(`Is Si Clicked: ${isSiClicked}`)
            compoundingTypeDropdown.style.visibility = "hidden"
            compoundingTypeLabel.style.visibility = "hidden"
    } else if(isCiClicked) {
        console.log(`Is Ci Clicked: ${isCiClicked}`)
            compoundingTypeDropdown.style.visibility = "visible"
            compoundingTypeLabel.style.visibility = "visible"
    }
}

function showDefaultSelectionOfSICalc() {
        siCalc.style.background = "rgb(0, 255, 123)"
        compoundingTypeDropdown.style.visibility = "hidden"
        compoundingTypeLabel.style.visibility = "hidden"
}

