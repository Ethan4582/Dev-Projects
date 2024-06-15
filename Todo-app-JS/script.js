// Get the input box and list container elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task to the list
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create a new list item
        let li = document.createElement("li");
        // Set the inner HTML of the list item to the input value
        li.innerHTML = inputBox.value;
        // Append the list item to the list container
        listContainer.appendChild(li);
        
        // Create a span element for the cross icon
        let span = document.createElement("span");
        span.innerHTML = "\u00d7 "; // Cross icon
        li.appendChild(span);
        
        // Save the updated content
        saveData();
    }
    // Clear the input box after adding the task
    inputBox.value = "";
}

// Event listener for handling click events on the list container
listContainer.addEventListener("click", function(e) {
    // Check if the clicked element is a list item
    if (e.target.tagName === "LI") {
        // Toggle the 'checked' class on the list item
        e.target.classList.toggle("checked");
    } 
    // Check if the clicked element is a span
    else if (e.target.tagName === "SPAN") {
        // Remove the parent element (list item) when the span is clicked
        e.target.parentElement.remove();
    }
    
    // Save the updated content after marking as checked or deleting
    saveData();
});

// Function to save the data in localStorage
function saveData() {
    // Store the HTML content of the list container in localStorage
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to display the saved tasks when the page loads
function showTasks() {
    // Retrieve the stored data and display it in the list container
    listContainer.innerHTML = localStorage.getItem("data");
}

// Display the saved tasks when the page loads
showTasks();
