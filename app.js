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
let result = document.getElementById('result');
let rules = document.getElementById('rules');


let gameover = document.getElementById("gameover");
const overall = phrases.length;

let ms = 'hiiii';
let ul = phrase.getElementsByTagName('ul')[0];
let score = 0;


// console.log(ul);

function getRandomPhraseAsArray(arr){ //gets random phrase, divides it into array and remove it from list of phrases
  let randomphrase = arr[Math.floor(Math.random() * (arr.length-1))]; //gets random phrase
  let used = arr.indexOf(randomphrase); //finds passed phrase to remove it out of phrases array
  // console.log(arr);
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
        // if (li[i-1].innerHTML != ''){
        //
        // };
      } else {
        letters[i].className = "space";
      }
    }
};

function gOver() {
  if (phrases.length === 0) {

    let notif = 'You guessed '+ score +' out of '+ overall +'!';
    overlay.style.display = 'block';
    lose.style.display = 'none';
    win.style.display = 'none';
    gameover.style.display = 'block';
    result.textContent = notif;
    result.style.display = 'block';
    // overlay.appendChild(h3);
    start.textContent = 'Start again';
    phrases = [ 'Well nobody is perfect',
                'Bond James Bond',
                'Frankly my dear I do not give a damn',
                'One does not simply walk into Mordor',
                'Elementary my dear Watson' ];
    console.log(overlay);
    // overlay.removeChild(h3);
  };
}


function reset() {
  console.log(phrases.length);

  let ul = phrase.getElementsByTagName('ul')[0];
  let lis = ul.getElementsByTagName('li');
  let buttons = keyboard.getElementsByTagName('button');
  result.style.display = 'none';

  ul.textContent = "";
  missed = 0;
  // console.log(score);
  gameover.style.display = 'none';
  // console.log(h3);
  // h3.textContent = '';



  for(let i=0; i < buttons.length; i++){ //enables all buttons pressed in previous game
    buttons[i].classList.remove("chosen");
    buttons[i].disabled = false;
  }

  for(let i=0; i < 5; i++){ //set hearts back to five
    var parent = document.getElementsByTagName("ol")[0];
    var child = document.getElementsByClassName("tries")[i];
    child.style.display = 'inline-block';
  }
  for (let i = 0; i < allLetters.length; i++) {
      allLetters[i].classList.remove("show");
      letterFound = null;
  }

  gOver();

}

function checkWin() {
  // let win = document.getElementById("win");
    // let win = document.getElementById("win");
    // let lose = document.getElementById("lose");
    overlay.style.display = 'block';
    lose.style.display = 'none';
    win.style.display = 'block';
    score++;
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

      // let h2 = document.getElementsByClassName("lose")[0];
      // let win = document.getElementById("win");
      // let lose = document.getElementById("lose");
      overlay.style.display = 'block';
      win.style.display = 'none';
      if (phrases.length == 0)
        {lose.style.display = 'none';
      } else {
        lose.style.display = 'block';
      };
      reset();
    }
  }
});



start.addEventListener("click", function(){ //hides overlay when start game button pressed
  let button = event.target;
  if (button.tagName === 'A' ) {
    document.getElementById("overlay").style.display = "none";
    rules.style.display = 'none';
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray);
  }
});
