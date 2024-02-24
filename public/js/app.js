const view = document.querySelector(".view");
const viewSvg = document.querySelector(".svg");
const search = document.querySelector("svg");
const viewMoreBox = document.querySelector(".info-card");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const viewLess = document.querySelector(".less");

const searchInput = document.querySelector('#city');
const searchHistoryDropdown = document.querySelector('.search-history');


// Function to fetch and display search history
const displaySearchHistory = async () => {
    try {
        const response = await fetch('/search-history'); 
        const searchHistory = await response.json();
        searchHistoryDropdown.innerHTML = ''; // Clear previous history
        searchHistory.forEach(location => {
            const listItem = document.createElement('li');
            listItem.textContent = location;
            listItem.addEventListener('click', () => {
                searchInput.value = location; // Populate search input with selected location
                searchHistoryDropdown.innerHTML = ''; // Clear history list after selection
            });
            searchHistoryDropdown.appendChild(listItem);
        });
        // Show dropdown after loading search history
        searchHistoryDropdown.style.display = "block";
    } catch (error) {
        console.error('Error fetching search history:', error);
    }
};

// Event listener for search input focus
searchInput.addEventListener('focus', displaySearchHistory);

// Event listener to hide dropdown when clicking outside
document.addEventListener("click", function(event) {
    if (!searchInput.contains(event.target) && !searchHistoryDropdown.contains(event.target)) {
        searchHistoryDropdown.style.display = "none";
    }
});

// Event listener to keep dropdown visible when interacting with it
searchHistoryDropdown.addEventListener("click", function(event) {
    event.stopPropagation(); // Prevent the click event from reaching the document listener
});








let currTime = () => {
    let currDate = new Date();
    let localTime = currDate.toLocaleTimeString();
    time.innerHTML = localTime;
};

let currDay = () => {
    let day = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    let today = day.toLocaleDateString('en-US', options);
    date.innerHTML = today;
};

currDay();

setInterval(currTime, 1000);

view.addEventListener("click", ()=>{
    viewSvg.classList.toggle("rotate");
    viewMoreBox.classList.toggle("visible");
    view.classList.toggle("less");
    if(view.classList.contains("less")){
        view.innerHTML = "View Less";
    }else{
        view.innerHTML = "View More";
    }
});

viewSvg.addEventListener("click", ()=>{
    viewSvg.classList.toggle("rotate");
    viewMoreBox.classList.toggle("visible");
    view.classList.toggle("less");
    if(view.classList.contains("less")){
        view.innerHTML = "View Less";
    } else{
        view.innerHTML = "View More";
    }
});



function goBack() {
    window.history.back();
}



