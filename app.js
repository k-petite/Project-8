let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
var missed = 0;
let start = document.getElementsByClassName('btn__reset')[0];
let overlay = document.getElementById("overlay");
let keyboard = document.getElementById('qwerty');
let buttons = keyboard.getElementsByTagName('button');

let phrases = [ 'Well nobody is perfect',
                'Bond James Bond',
                'Frankly my dear I do not give a damn',
                'One does not simply walk into Mordor',
                'Elementary my dear Watson' ];

function getRandomPhraseAsArray(arr){ //gets random phrase, divides it into array and remove it from list of phrases
  let randomphrase = arr[Math.floor(Math.random() * (arr.length-1))]; //gets random phrase
  let used = arr.indexOf(randomphrase); //finds passed phrase to remove it out of phrases array
  let split = randomphrase.split(""); //splits passed array
  arr.splice(used, 1); //remove random phrase from phrases array
  // console.log(arr, split);
  return split;
};

function addPhrasetoDisplay(arr) {

  let ul = document.getElementById('phrase');

    for (i = 0; i < arr.length; i++){
      // let letter = arr[i];
      // let t = li.createTextNode(letter);
      // ul.appendChild(t);
      // console.log(arr[i]);

      var li = document.createElement("LI");
      var letter = document.createTextNode(arr[i]);
      li.appendChild(letter);
      ul.appendChild(li);
      if (letter != ''){
        li.className = "letter"
      }
    }
    // console.log(document.getElementsByClassName('letter'));

};

let letterFound;


function checkLetter(but) {
  // console.log('hi');
  let allLetters = document.getElementsByClassName('letter');
      for (i = 0; i < allLetters.length; i++) {
        let letter = allLetters[i];
        if (letter == but){
          li.className = "show";
          letterFound = letter;
        } else {
          letterFound = null;
      }
      return letterFound;
      // console.log(letterFound);

      }
}


for (var i=0; i< buttons.length; i++) {
  let button = buttons[i];
       button.addEventListener("click",  function(){ //
          checkLetter(button);
          if (letterFound == null){
            console.log(letterFound);

          };
          button.className = 'chosen';
          button.disabled = true;
          console.log(button);

})};




//     var input, filter, ul, li, a, i;
//     input = document.getElementById('myInput');
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("myUL");
//     li = ul.getElementsByTagName('li');
//
//     // Loop through all list items, and hide those who don't match the search query
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("a")[0];
//         if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }


start.addEventListener("click", function(){ //hides overlay when start game button pressed
    document.getElementById("overlay").style.display = "none";
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray);
});
