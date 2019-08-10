console.log('%c HI', 'color: firebrick')


const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", getImages);
document.addEventListener("DOMContentLoaded", getBreeds);

let allBreeds;

function resetBreeds() {
  var myList = document.getElementById('dog-breeds');
  myList.innerHTML = '';
}

function renderAllBreeds(param){
  resetBreeds();
  param.forEach(elem => {
    const dogBreed = document.createElement("li");
    dogBreed.innerHTML = elem;
    document.querySelector('ul').appendChild(dogBreed);
    dogBreed.addEventListener('click', changeFont)
    function changeFont() {
      dogBreed.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      dogBreed.style.fontSize = '22px';
      dogBreed.style.textAlign = 'center'
     }
  })
}



function getBreeds () {
  allBreeds = [];
  return fetch(breedUrl)
  .then(res => res.json())
  .then(breeds => {
    Object.keys(breeds["message"]).forEach( breed => {
        allBreeds.push(breed);
        renderAllBreeds(allBreeds);
        })
    })
}
const selectBreed = document.getElementById('breed-dropdown');

function getFilteredBreeds() {
  resetBreeds();
  return allBreeds.filter( breed =>
        breed[0] == selectBreed.options[selectBreed.selectedIndex].value).forEach( el => {
              const dogBreed = document.createElement("li");
              dogBreed.innerHTML = el;
              document.querySelector('ul').appendChild(dogBreed);
        });
}

selectBreed.addEventListener('change', getFilteredBreeds);

function getImages() {
    return fetch(imgUrl)
    .then(res => res.json())
  
}

getImages().then (el => {
  el['message'].forEach( image => {
        const im = document.createElement("img");
        im.src =image;
        im.style = 'width:200px; height:200px';
        document.getElementById('dog-image-container').appendChild(im);
  })
})





  
  
      
  




  

  

