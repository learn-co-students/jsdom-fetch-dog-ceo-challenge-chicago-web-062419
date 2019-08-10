// Assign the image URL to a variable
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
// Retrieve the correct HTML item and assign it to a variable
const imageBox = document.getElementById('dog-image-container');
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogBreedContainer = document.getElementById('dog-breeds')
const breedDropdown = document.getElementById('breed-dropdown')
let allBreeds = [];

dogBreedContainer.addEventListener('click', () => {
  if (event.target.style.color === 'blue') {
    event.target.style.color = 'black'
  } else {
    event.target.style.color = 'blue'
  }
})

breedDropdown.addEventListener('change', () => {
  const chosenOne = event.target.value
  if (chosenOne == 'all') {
    return renderBreeds(allBreeds)
  }
  // Returns true or false. If true, add to filteredArray
  const filteredArray = allBreeds.filter(breed => {
    return breed[0] === chosenOne
  })
  renderBreeds(filteredArray)
})

// Fetch, parse the JSON from the API URL, pass the data to the renderDogs function
function fetchDogs() {
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(data => renderDogs(data));
}

// Iterate through the parsed JSON
function renderDogs(data) {
  // Message is an array (console.log to check) containing image URLs
  data.message.forEach(message => {
    // For each item in the array, create an img tag
    const newImage = document.createElement('img')
    // Img tags have attributes, including src. Assign the message to the src
    newImage.src = message
    newImage.height = 500
    newImage.width = 400
    // Add each created image to the image container
    imageBox.appendChild(newImage)
  })
}

// Same as above fetch function but with arrow
const fetchBreeds = () => {
  fetch(breedUrl)
  .then(resp => resp.json())
  .then(data => {
    renderBreeds(Object.keys(data.message))
    allBreeds = Object.keys(data.message)
  })
}

const renderBreeds = (breeds) => {
  dogBreedContainer.innerHTML = '';
  breeds.forEach(breed => {
    const newLi = document.createElement('li')
    newLi.innerText = breed
    dogBreedContainer.appendChild(newLi)
    // Add event listeners to each individual li on creation (instead of on the ul with bubbling)
    // newLi.addEventListener('click', () => {
    //   newLi.style.color = 'red'
    // })
  })
}

// Make the fetchDogs function wait until the page has loaded before running (or add defer to script tag)
document.addEventListener('DOMContentLoaded', function(){
  // fetchDogs()
})

// Runner
const init = () => {
  fetchDogs()
  fetchBreeds()
}

init()