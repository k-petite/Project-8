let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
var missed = 0;
let start = document.getElementsByClassName('btn__reset')[0];
let overlay = document.getElementById("overlay");

let phrases = [ 'Well nobody is perfect',
                'Bond James Bond',
                'Frankly my dear I do not give a damn',
                'One does not simply walk into Mordor',
                'Elementary my dear Watson' ];



// console.log(phrases);


// function remove() { //remove random phrase from phrases array
//   phrases.splice(used, 1);
//   console.log(phrases);
// }

// function split(arr){
//   // let split = randomphrase.split(" ");
//   // console.log(split);
// };



function getRandomPhraseAsArray(arr){
  let randomphrase = arr[Math.floor(Math.random() * (arr.length-1))]; //gets random phrase
  let used = arr.indexOf(randomphrase); //finds passed phrase to remove it out of phrases array
  let split = randomphrase.split(" "); //splits passed array
  arr.splice(used, 1); //remove random phrase from phrases array
  console.log(arr, split);
};





document.getElementsByClassName('btn__reset')[0].addEventListener("click", function(){
    document.getElementById("overlay").style.display = "none";
    getRandomPhraseAsArray(phrases);
});



console.log(overlay);
