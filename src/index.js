// console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', (event) => {
    fetchDogs()
    fetchBreeds()
});
fetchDogs = () => {
    fetch('https://dog.ceo/api/breeds/image/random/4')
      .then(response => response.json())
      .then(images => addDogImage(images))
}

let breeds

fetchBreeds = () => {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(json => {breedsArray = Object.keys(json.message)
    .then(breedsArray => {
        breeds = breedsArray
        addDogBreed(breedsArray)
    } )            
})
    
    
    // .then(breedsArray => addDogBreed(breedsArray))
}

const addDogImage = (images) => {
images.message.map(image => {
    const img = document.createElement("img");
    // Making Element <img />
    img.src = image
    // < img src="image" />
    const dogContainer = document.querySelector('#dog-image-container');
    // find container 
    dogContainer.append(img)
})
}

const addDogBreed = (breedsArray) => {
    breedsArray.map(breed => {
        const li = document.createElement("li");
        li.innerHTML = breed
        li.addEventListener('click', function() {li.style.color='red'})
        const dogBreedContainer = document.querySelector('#dog-breeds');
        dogBreedContainer.append(li)
    })
}
