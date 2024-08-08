// Fetch data from the API
fetch("https://minecraft-api.vercel.app/api/items")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {

    startFetching(data, handleFilteredData);
})




// Function to generate random numbers and call the provided callback after a delay
function startFetching(data, callback) {
    function fetchAndUpdate() {
        let randomnum = Math.trunc(Math.random() * data.length); // Ensure the number is within the data array's length
        callback(data, randomnum);  
        setTimeout(fetchAndUpdate, 7000);
    }

    // Start the first call
    fetchAndUpdate();
}




function handleFilteredData(data, randomNumber) {
    if (data[randomNumber]) {
        console.log("Selected item:", data[randomNumber]);
        createContent(data[randomNumber]); 
    } else {
        console.log("No item found at index:", randomNumber);
    }
}

// Function to create and insert HTML content
function createContent(item) {
    const container = document.getElementById('bottom-container');
    
    // Clear previous content
    container.innerHTML = '';

    // Create elements
    const box = document.createElement('div');
    box.className = 'box';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.textContent = item.name || 'Name not available'; // Use item.name if available

    const pictureDiv = document.createElement('div');
    pictureDiv.className = 'picture';
    const img = document.createElement('img');
    img.src = item.image || 'https://via.placeholder.com/600x400'; // Fallback image if item.image is not available
    img.alt = item.name || 'No description';
    pictureDiv.appendChild(img);

    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'about';
    aboutDiv.textContent = item.description || 'No description available'; // Use item.description if available

    // Append elements to the box
    box.appendChild(nameDiv);
    box.appendChild(pictureDiv);
    box.appendChild(aboutDiv);

    // Append the box to the container
    container.appendChild(box);
}
