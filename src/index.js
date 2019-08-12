// console.log('%c HI', 'color: firebrick')
// const imageUrl = "https://dog.ceo/api/breeds/image/random/4"
// const breedUrl = "https://dog.ceo/api/breeds/list/all";



// //!--------------------------- Add Images -----------------------------------------------
// //need a DOMContentLoaded to allow fetched data to populate
// document.addEventListener('DOMContentLoaded', () => {
//     fetch(imageUrl).then(resp => resp.json()).then(addDogImages);
//     fetch(breedUrl).then(resp => resp.json()).then(addDogBreeds);
//     const ul = document.getElementById('dog-breeds');
//     ul.addEventListener('click', () => {  event.target.style.color = "#8CE8A4";}) 
//     //ul li will change color when clicked
//     //event = click, target = <li> terrier </li>, 
// });



// // function to add dog imgs as html in the dogContainer
// function addDogImages(images) {
//     images.message.forEach(element => {
//         const dogsContainer = document.querySelector('#dog-image-container')

//         const image = document.createElement("img");
//         image.src = element
//         image.width = 300
//         image.height = 300

//         let div = document.createElement('div')
//         div.appendChild(image)

//         dogsContainer.appendChild(div)
        
//     });
// }
// //! ---------------------- BREEDS ----------------------------------
// // document.addEventListener('DOMContentLoaded', () => {
// //     fetch(breedUrl).then(resp => resp.json()).then(addDogBreeds)
// // });

// function addDogBreeds(json) {
//     const breeds = json.message
//     const ul = document.getElementById('dog-breeds');
            
//     for (const key in breeds) {
//         const li = document.createElement("li");
//         li.innerText = key;
//         ul.appendChild(li);
//     }
    
// };
// add each breeds value(array of dog strings) to show up beneath
// if (array.length >= 1) => if the value array has at least 1 element, then add to html
// would need to change the breeds key to a ul inside of the container <ul> then add each element (["yorkshire"]) as an li. inside for in loop
//* ------------------------------ Adam code-along -------------------------------------------
//todo: have the structure of this page... init function at bottom of page, and all functions defined before they are called.
// try adding in defer to end of <script> in html file to avoid DOMContentLoaded 
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const imageContainer = document.getElementById('dog-image-container');
const dogBreedContainer = document.getElementById('dog-breeds')
const breedDropdown = document.getElementById('breed-dropdown')

let allBreeds = [];

dogBreedContainer.addEventListener('click', () => {
  if (event.target.style.color === 'blue') {
    event.target.style.color = ''
  } else {
    event.target.style.color = 'blue'
  }
})

breedDropdown.addEventListener('change', () => {
  const chosenOne = event.target.value
  if (chosenOne == 'all') {
    return renderBreeds(allBreeds)
  }
  const filteredArray = allBreeds.filter(breed => {
    return breed[0] === chosenOne
  })
  renderBreeds(filteredArray)
})

const renderImages = (images) => {
  images.forEach(image => {
    const newImg = document.createElement('img')
    newImg.src = image
    imageContainer.appendChild(newImg)
  })
}

const fetchImages = () => {
  fetch(imgUrl)
  .then(res => res.json())
  .then(data => renderImages(data.message))
}

const renderBreeds = (breeds) => {
  dogBreedContainer.innerHTML = '';
  breeds.forEach(breed => {
    const newLi = document.createElement('li')
    newLi.innerText = breed
    // newLi.addEventListener('click', () => {
    //   newLi.style.color = 'red'
    // })
    dogBreedContainer.appendChild(newLi)
  })
}

const fetchBreeds = () => {
  fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
      allBreeds = Object.keys(data.message)
      renderBreeds(allBreeds)
    })
}

/**
 * Alternative to include all sub breeds as well:
 */
// const fetchBreeds = () => {
//   fetch(breedUrl)
//     .then(res => res.json())
//     .then(data => {
//       for (const key in data.message) {
//         if (data.message[key]) {
//           if (data.message[key].length) {
//             data.message[key].forEach(breed => {
//               allBreeds.push(breed + ' ' + key)
//             })
//           } else {
//             allBreeds.push(key)
//           }
//         }
//       }
//       renderBreeds(allBreeds)
//     })
// }

const init = () => {
  fetchImages()
  fetchBreeds()
}
init()