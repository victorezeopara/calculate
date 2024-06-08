document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    function updateDisplay() {
        display.textContent = displayValue;
    }

    updateDisplay();

    buttons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            const element = event.target;
            const value = element.textContent;
            const action = element.dataset.action;
            const operatorValue = element.dataset.operator;

            if (!action) {
                handleNumber(value);
                updateDisplay();
            } else {
                handleAction(action, operatorValue);
                updateDisplay();
            }
        });
    });

    function handleNumber(value) {
        if (waitingForSecondValue) {
            displayValue = value;
            waitingForSecondValue = false;
        } else {
            displayValue = displayValue === '0' ? value : displayValue + value;
        }
    }

    function handleAction(action, operatorValue) {
        switch (action) {
            case 'clear':
                displayValue = '0';
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
                break;
            case 'sign':
                displayValue = (parseFloat(displayValue) * -1).toString();
                break;
            case 'percent':
                displayValue = (parseFloat(displayValue) / 100).toString();
                break;
            case 'operator':
                handleOperator(operatorValue);
                break;
            case 'calculate':
                handleCalculate();
                break;
            default:
                break;
        }
    }

    function handleOperator(nextOperator) {
        const value = parseFloat(displayValue);

        if (firstValue === null) {
            firstValue = value;
        } else if (operator) {
            const result = performCalculation(firstValue, value, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }

        waitingForSecondValue = true;
        operator = nextOperator;
    }

    function performCalculation(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }

    function handleCalculate() {
        if (firstValue !== null && operator !== null) {
            let result = performCalculation(firstValue, parseFloat(displayValue), operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
        }
    }
}); 