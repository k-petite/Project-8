let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let missed = 0;
let overlay = document.getElementById("overlay");
let keyboard = document.getElementById('qwerty');
let win = document.getElementById('win');
let lose = document.getElementById('lose');
let buttons = keyboard.getElementsByTagName('button');
let phrases = [ 'Well nobody is perfect',
                'Bond James Bond',
                'Frankly my dear I do not give a damn',
                'One does not simply walk into Mordor',
                'Elementary my dear Watson' ];
let letterFound;
let start = document.getElementsByClassName('btn__reset')[0];
let allLetters = document.getElementsByClassName('letter');

let ms = 'hiiii';
let ul = phrase.getElementsByTagName('ul')[0];
console.log(ul);

function getRandomPhraseAsArray(arr){ //gets random phrase, divides it into array and remove it from list of phrases
  let randomphrase = arr[Math.floor(Math.random() * (arr.length-1))]; //gets random phrase
  let used = arr.indexOf(randomphrase); //finds passed phrase to remove it out of phrases array
  let split = randomphrase.split(""); //splits passed array
  arr.splice(used, 1); //remove random phrase from phrases array
  // console.log(arr, split);
  return split;
};

function addPhrasetoDisplay(arr) { //put letters of the choosen phrase in LIs and adds letter class to letters
  // let ul = phrase.getElementsByTagName('ul')[0];

    for (i = 0; i < arr.length; i++){
      var li = document.createElement("LI");
      var letter = document.createTextNode(arr[i]);
      li.appendChild(letter);
      ul.appendChild(li);
      let letters = ul.getElementsByTagName('li');
      if (li.innerHTML != ' '){
        // console.log(li);
        letters[i].className = "letter";
      }
    }
};


function reset() {
  let ul = phrase.getElementsByTagName('ul')[0];
  let lis = ul.getElementsByTagName('li');
  let buttons = keyboard.getElementsByTagName('button');
  // console.log(lis);
  console.log(lis[0]);
  missed = 0;
  for(let i=0; i < lis.length; i++){ //removes all letter created in previous game
    ul.removeChild(lis[i]);
    // ul.removeChild(ul.childNodes[i]);
    // lis[0].parentNode.removeChild(lis[0]);
    // lis[i].classList.remove("show", 'letter');
  }
  console.log(ul);

  for(let i=0; i < buttons.length; i++){ //removes all letter created in previous game
    buttons[i].classList.remove("chosen");
    buttons[i].disabled = false;

  }
  for(let i=0; i < 5; i++){ //set hearts back to five
    // var parent = document.getElementsByTagName("ol")[0];
    // var child = document.createElement("li");
    // parent.appendChild(child);
    // console.log(child[i]);
    var parent = document.getElementsByTagName("ol")[0];
    var child = document.getElementsByClassName("tries")[i];
    // child[i].className = "tries";
    child.style.display = 'inline-block';
  }
  for (let i = 0; i < allLetters.length; i++) {
    // var letter = allLetters[i].innerHTML;
      allLetters[i].classList.remove("show");
      letterFound = null;
  }




}

function checkWin() {
  // let win = document.getElementById("win");
    let win = document.getElementById("win");
    let lose = document.getElementById("lose");
    overlay.style.display = 'block';
    lose.style.display = 'none';
    win.style.display = 'block';
    reset();
}


function checkLetter(but) {
  letterFound = null;
      for (let i = 0; i < allLetters.length; i++) {
        let letter = allLetters[i].innerHTML;
        if (letter.toLowerCase() === but){
          // console.log(allLetters[i].innerHTML);
          allLetters[i].classList.add("show");
          letterFound = allLetters[i].innerHTML;
        }
      }
};

keyboard.addEventListener('click', function(){
  let button = event.target;
  let show = document.getElementsByClassName('show');
  let letters = document.getElementsByClassName('letter');
  if (button.tagName === 'BUTTON' ) {
      let letter = button.innerHTML;
      checkLetter(letter);
      if (letterFound === null){ //counts mistakes  -should i add ===?
          missed++;

          var parent = document.getElementsByTagName("ol")[0];
          var child = document.getElementsByClassName("tries")[missed];
          if (missed < 5){
            child.style.display = 'none';
          }
        };
      button.className = 'chosen';
      button.disabled = true;

      if (show.length === letters.length){
        checkWin();
      }


      if (missed === 5){
        // let lose = document.getElementById("lose");
        reset();
        // let h2 = document.getElementsByClassName("lose")[0];
        let win = document.getElementById("win");
        let lose = document.getElementById("lose");
        overlay.style.display = 'block';
        lose.style.display = 'block';
        win.style.display = 'none';
        // button.style.display = 'inline-block';

        // console.log(overlay);
      }

}});


// for(let i=0; i < start.length; i++){
//  start = document.getElementsByClassName('btn__reset')[i];


start.addEventListener("click", function(){ //hides overlay when start game button pressed
  let button = event.target;
  if (button.tagName === 'A' ) {
    document.getElementById("overlay").style.display = "none";
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray);
  }
});
