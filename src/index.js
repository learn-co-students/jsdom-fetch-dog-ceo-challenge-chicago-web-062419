console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogHolder = document.getElementById("dog-image-container")
const breedHolder = document.getElementById("dog-breeds")
const selector = document.getElementById("breed-dropdown")
let allBreeds = []



const fetchImages = () =>{
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => addImage(images))
}

const addImage = (images) =>{
    images['message'].forEach(element => {
    let imgTag = document.createElement("img")
    let breakTag = document.createElement("br")
    imgTag.src = element
    imgTag.height = 500
    imgTag.width = 350
    dogHolder.appendChild(imgTag)
    dogHolder.appendChild(breakTag)
    });
}

const fetchBreeds = () => {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
        addBreed(breeds)})
}

const addBreed = (breeds) => {
    for(const key in breeds['message']){
        let breedLine = document.createElement("li")
        breedLine.innerText = key
        breedHolder.appendChild(breedLine)
        breedLine.addEventListener("click", () => {
            breedLine.style.color = "red"
            breedLine.addEventListener("click", () => {
                breedLine.style.color = "black"
        })
        })
        allBreeds.push(breedLine)
    }
}

const filterBreeds = (array) => {
    array.forEach(dog => {
        if(dog.innerText[0] !== selector.value){
            dog.style.display = "none"
        } else {
            dog.style.display = ""
        }
    })
}

selector.addEventListener("change", () => filterBreeds(allBreeds))
fetchImages()
fetchBreeds()