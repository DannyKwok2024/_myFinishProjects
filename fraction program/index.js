// create reference to the dom tags
const numerator = document.getElementById('numeratorTxt');
const denominator = document.getElementById('denominatorTxt');
const numeratorSimplify = document.getElementById('numeratorSimplify');
const denominatorSimplify = document.getElementById('denominatorSimplify');
const btnSimplify = document.getElementById('btnCalculate');
const btnClear = document.getElementById('btnReset');

// variables and arrays declaration
let numeratorArray = [];
let denominatorArray = [];
let simpleNumerator = '';
let simpleDenominator = '';

// event listener
btnSimplify.addEventListener('click', simplifyNumber);
btnClear.addEventListener('click', clearAll);

function simplifyNumber() {
    // reset all variables value
    numeratorArray = [];
    denominatorArray = [];
    simpleNumerator = '';
    simpleDenominator = '';

    if (numerator.value !== '' && denominator.value !== '') {
        // calling prcessNumber(user input value) for the numerator
        // then the denominator with return arrays
        numeratorArray = processNumber(numerator.value);
        denominatorArray = processNumber(denominator.value);

        removeDuplicate(numeratorArray, denominatorArray);

        const finalNumerator = eval(simpleNumerator);
        const finalDenominator = eval(simpleDenominator);

        // check to see if number can simplify even more
        if (finalDenominator % finalNumerator === 0) {
            numeratorSimplify.value = finalNumerator / finalNumerator;
            denominatorSimplify.value = finalDenominator / finalNumerator;
        } else {
            numeratorSimplify.value = finalNumerator;
            denominatorSimplify.value = finalDenominator;
        }
    } else {
        alert('Please fill values.');
    }
}

function processNumber(number) {
    // variable declaration
    const numbersArray = [];

    do {
        // if the number is greater 1 and not  0,3,5 or 7 then
        if (
            number > 1 &&
            number !== 0 &&
            number !== 3 &&
            number !== 5 &&
            number !== 7
        ) {
            // for as long as the valueCount is less than or eaqual to 9
            for (valueConnt = 2; valueConnt <= 9; valueConnt++) {
                // if the number does not have a remainder divided from 2 to 9
                if (number % valueConnt === 0) {
                    numbersArray.push(valueConnt);
                    // assign the new number
                    number = number / valueConnt;
                    break;
                }

                // valueCount reach 9 then number then
                else if (valueConnt === 9) {
                    // store the remainder into the numbersArray array
                    numbersArray.push(number);
                    number = 0;
                }
            }
        } else {
            // store it to the numbersArray and set the number to 0
            // that way we can get out of the while loop
            numbersArray.push(number);
            number = 0;
        }
    } while (number > 1);

    return numbersArray;
}

// compare array1 to array2 remove duplicate values
function removeDuplicate(array1, array2) {
    // going from right to left array1
    for (
        let counterArray1 = array1.length;
        counterArray1 >= 0;
        counterArray1--
    ) {
        // going from left to right of array2
        for (
            let counterArray2 = 0;
            counterArray2 < array2.length;
            counterArray2++
        ) {
            // array1 value equal array2 value
            if (array1[counterArray1] === array2[counterArray2]) {
                // if array1 or array2 contain only 1 value
                if (array1.length === 1 || array2.length === 1) {
                    //counterArray1 = array1.length;
                    //counterArray2 = array2.length;
                    break;
                }
                array1.splice(counterArray1, 1);
                array2.splice(counterArray2, 1);
            }
        }
    }

    // in each element in the array adding '*' to it for example (2*2*2)
    array1.forEach((element) => {
        // the first time around simppleNumberator value === "" so don't add '*' to the value
        simpleNumerator =
            simpleNumerator === ''
                ? simpleNumerator + element
                : simpleNumerator + '*' + element;
    });

    array2.forEach((element) => {
        simpleDenominator =
            simpleDenominator === ''
                ? simpleDenominator + element
                : simpleDenominator + '*' + element;
    });
}

// reset all values
function clearAll() {
    numerator.value = '';
    denominator.value = '';
    numeratorSimplify.value = '';
    denominatorSimplify.value = '';
}
