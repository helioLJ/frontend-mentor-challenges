let bill = document.getElementById('bill')
let buttons = document.querySelectorAll('.calc__buttons___button')
let activeButton = document.querySelector('.activeButton')
let customTip = document.getElementById('custom')
let people = document.getElementById('num-of-people')
let peopleError = document.getElementById('people__error')
let tipAmount = document.getElementById('tip-amount')
let totalPerson = document.getElementById('total-person')
let reset = document.getElementById('reset')

let firstTime = true, billValue, peopleCount, tipButton, customTipValue, tipPerc = 0.05;

const calcTip = () => {
    if (peopleCount == 0 || !peopleCount) {
        if (!firstTime) {
            peopleError.textContent = "Can't be zero";
            people.classList.add('input__error');
        }
        tipAmount.textContent = '$0.00';
        totalPerson.textContent = '$0.00';
        return;
    }
    
    people.classList.remove('input__error');
    peopleError.textContent = '';
    const tipPerPerson = (billValue * tipPerc) / peopleCount;
    const totalPerPerson = (billValue / peopleCount) + tipPerPerson;

    tipAmount.textContent = '$' + tipPerPerson.toFixed(2);
    totalPerson.textContent = '$' + totalPerPerson.toFixed(2);
}

const getBill = () => {
    if(!bill.value || Number(bill.value) === 0) {
        billValue = 0;
        calcTip();
        return;
    }
    billValue = Number(bill.value)
    calcTip();
}

const getNoOfPeople = () => {
    firstTime = false;
    if (!people.value || Number(people.value) === 0) {
        peopleCount = 0;
        calcTip();
        return;
    }
    peopleCount = Number(people.value)
    calcTip();

}

const getTipPerc = () => {
    switch (activeButton.textContent) {
        case '5%':
            tipPerc = 0.05;
            break;
        case '10%':
            tipPerc = 0.10;
            break;
        case '15%':
            tipPerc = 0.15;
            break;
        case '25%':
            tipPerc = 0.25;
            break;
        case '50%':
            tipPerc = 0.50;
            break;
        default:
            tipPerc = customTipValue / 100;
            break;
    }
}

bill.addEventListener('input', getBill);
people.addEventListener('input', getNoOfPeople);

buttons.forEach((tipButton) => {
    tipButton.addEventListener('click', () => {
        activeButton.classList.remove('activeButton');
        customTip.value = '';
        tipButton.classList.add('activeButton');
        activeButton = tipButton;
        getTipPerc();
        calcTip();

    })
})

customTip.addEventListener('input', () => {
    activeButton.classList.remove('activeButton');
    customTipValue = Number(customTip.value);
    activeButton = customTip;
    getTipPerc();
    calcTip();
})

reset.addEventListener('click', () => {
    bill.value = '';
    people.value = '';
    tipAmount.textContent = '$0.00';
    totalPerson.textContent = '$0.00';
    peopleError.textContent = '';
    people.classList.remove('input__error');
    activeButton.classList.remove('activeButton');
    const defaultActive = document.querySelector('.default');
    defaultActive.classList.add('activeButton');
    activeButton = defaultActive;
    customTip.value = '';
    billValue = 0, peopleCount = 0, tipButton = 0, customTipValue = 0, tipPerc = 0.05, firstTime = true;
})