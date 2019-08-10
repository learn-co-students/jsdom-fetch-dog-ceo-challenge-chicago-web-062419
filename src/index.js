console.log('%c HI', 'color: firebrick')




// 1. ON PAGE LOAD 2.  FETCH IMAGES 3. PARSE AS JSON 4. ADD IMAGE ELEMENTS FOR EACH
window.addEventListener('DOMContentLoaded', fetchData);
let allDogArray

function fetchData() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(res => res.json())
        .then(json => {
            return json.message.forEach(addToPage)
        });    
    fetch("https://dog.ceo/api/breeds/list/all")    
    .then(res => res.json())
    .then(json => {
        allDogArray = Object.keys(json.message)
        // let breedArray = [] // array of breed names
        // let breedLiTags = document.querySelectorAll('li')
        // breedLiTags.forEach(breed => newArray.push(breed.innerText))
        // let newArray = breedChange(array)
        // debugger
    //    let newArray = array.filter(i => {
    //         return i[0] === "a"
    //     })
        allDogArray.forEach(addBreed)
    })    
}    


const breedDrop = document.getElementById('breed-dropdown')
let newArray
breedDrop.onchange = function() {
    let letter = this.value
    newArray = allDogArray.filter(i => i[0] === letter)
    console.log(newArray)
    newArray.forEach(addBreed)
}

// function breedChange(array) {
//     debugger
// }


function addToPage(json) {
    
    const dogs = document.getElementById('dog-image-container')
    const img = document.createElement('img')
    img.src = String(json)
    img.height = 100
    img.width = 100
    
    dogs.appendChild(img)
    
}     

function addBreed(json) {
    const breed = document.getElementById("dog-breeds")
    const addLi = document.createElement('li')
    let fontColor = true
    addLi.innerText = json
    breed.appendChild(addLi)
    addLi.addEventListener("click", changeColor => {
        const font = document.createElement('font')
        if (fontColor) {
            font.color = "green"
        } else {
            font.color = "black"
        }    
        fontColor = !fontColor
        font.innerText = json
        addLi.replaceChild(font, addLi.childNodes[0])
    })    
}    

// ------------------------------------------------------------


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

