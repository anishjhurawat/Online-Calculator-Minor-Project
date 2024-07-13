// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function(){
    // Get the display element and relevant buttons
    const display = document.getElementById('calc-display');
    const buttons = document.getElementsByClassName('btn');
    const undoButton = document.getElementById('undo');

    // Initialize variable to store current input value
    let currentValue = "";

    // Function to evaluate and display the result
    function evaluateResult() {
        // Convert special symbols and functions before evaluation
        const convertedValue = currentValue
            .replace(/×/g, "*")     // Replace '×' with '*'
            .replace(/÷/g, "/")     // Replace '÷' with '/'
            .replace(/%/g, "*0.01") // Replace '%' with '*0.01' (percentage)
            .replace(/π/g, Math.PI) // Replace 'π' with the value of Math.PI
            .replace(/√/g, "Math.sqrt") // Replace '√' with 'Math.sqrt'
            .replace(/\^2/g, "**2");    // Replace '^2' with '**2' (square operation)

        try {
            // Evaluate the converted expression
            const result = eval(convertedValue);
            // Update currentValue with the result as a string
            currentValue = result.toString();
            // Update the display with the result
            display.value = currentValue;
        } catch (e) {
            // Handle any errors that occur during evaluation
            display.value = "Error";
        }
    }

    // Function to handle special operations like π, √, x²
    function handleSpecialOperations(value) {
        if (value === "π") {
            currentValue += Math.PI.toString(); // Append the value of π to currentValue
        } else if (value === "√") {
            currentValue += "Math.sqrt("; // Append 'Math.sqrt(' to currentValue
        } else if (value === "x²") {
            currentValue += "^2"; // Append '^2' to currentValue (square operation)
        }
    }

    // Loop through all buttons and add event listeners
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function(){
            const value = button.innerText; // Get the text content of the clicked button

            // Handle different button clicks based on their value
            if (value === "AC") {
                // Clear the current value and update the display
                currentValue = "";
                display.value = currentValue;
            } else if (value === "=") {
                // Evaluate the current expression and display the result
                evaluateResult();
            } else if (value === "π" || value === "√" || value === "x²") {
                // Handle special operations like π, √, x²
                handleSpecialOperations(value);
                display.value = currentValue; // Update the display with the current value
            } else if (value === "←") {
                // Remove the last character from currentValue
                currentValue = currentValue.slice(0, -1);
                display.value = currentValue; // Update the display
            } else {
                // Append the clicked button's value to currentValue
                currentValue += value;
                display.value = currentValue; // Update the display
            }
        });
    }
});
