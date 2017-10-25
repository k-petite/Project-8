let phrase = document.getElementById('phrase');
let missed = 0; //number of the wrong letter pressed
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
// let ms = 'hiiii';
let ul = phrase.getElementsByTagName('ul')[0];
let score = 0;
var randomphrase;
let winphrase = document.getElementById('description');



function getRandomPhraseAsArray(arr){ //gets random phrase, divides it into array and remove it from list of phrases
  randomphrase = arr[Math.floor(Math.random() * (arr.length))]; //gets random phrase
  let used = arr.indexOf(randomphrase); //finds passed phrase to remove it out of phrases array
  let split = randomphrase.split(""); //splits passed array
  arr.splice(used, 1); //remove random phrase from phrases array
  // console.log(randomphrase);
  return split;
} //end of getRandomPhraseAsArray(arr) function



function preventBreak() {//this function prevents from breaking one word into lines

  let words = randomphrase.split(" "); //set of words from random phrase
  let wordslength = 0; //counts the sum of the letters of all the words in one row
  let liN = 0; //order of li prior to which we need to add a break
  let wordscount = 0; //count how many words are in the line
  let exact = 0; //needed in case if the line will start with the space

  for (i = 0; i < words.length; i++){
    wordslength += words[i].length;
    if (wordslength < 11){
      wordscount++;
      if (wordslength === 10 && wordscount === 1){
        exact++; //addes plus one space as we know that next line will start with break and we should count one extra space for the next row
      }
    } else {
      wordslength -= words[i].length;
      let br = document.createElement('br');
      liN += wordslength;

        if (wordscount > 1){
          liN += wordscount + exact;
          exact = 0;
        }

      ul.insertBefore(br, ul.childNodes[liN]);
      wordslength = 0;
      wordscount = 0;
      i--;
      }
  }
}//end of preventBreak() function



function show(ovl){//shows elements
  ovl.style.display = 'block';
}



function hide(ovl){//hides elements
  ovl.style.display = 'none';
}


function addPhrasetoDisplay(arr) { //put letters of the choosen phrase in LIs and adds letter class to letters
  for (let i = 0; i < arr.length; i++){
    var li = document.createElement("LI");
    var letter = document.createTextNode(arr[i]);
    li.appendChild(letter);
    ul.appendChild(li);
    let letters = ul.getElementsByTagName('li');
    if (li.innerHTML != ' '){
      letters[i].className = "letter";
    } else {
      letters[i].className = "space";
    }
  }
  preventBreak();
} //end of addPhrasetoDisplay(arr) function



function gOver() {

    let notif = 'You guessed '+ score +' out of '+ overall +'!';
    show(overlay);
    overlay.style.backgroundColor ='#7bdec9';
    hide(lose);
    hide(win);
    show(gameover);
    result.textContent = notif;
    show(result);
    start.textContent = 'Play again';
    phrases = [ 'Well nobody is perfect',
                'Bond James Bond',
                'Frankly my dear I do not give a damn',
                'One does not simply walk into Mordor',
                'Elementary my dear Watson' ];

} //end of gOver() function



function reset() { //reset the game for playing again
  let ul = phrase.getElementsByTagName('ul')[0];
  hide(result);
  ul.textContent = "";
  missed = 0;
  hide(gameover);

  for(let i=0; i < buttons.length; i++){ //enables all buttons pressed in previous game
    buttons[i].classList.remove("chosen");
    buttons[i].disabled = false;
  }

  for(let i=0; i < 5; i++){ //set hearts back to five
    var child = document.getElementsByClassName("tries")[i];
    child.style.display = 'inline-block';
  }
  for (let i = 0; i < allLetters.length; i++) {
      allLetters[i].classList.remove("show");
      letterFound = null;
  }

  if (phrases.length === 0) {
  gOver();
  }
} //end of reset() function



function checkWin() {
  let description = winphrase.getElementsByTagName('h3')[0];
  let image = winphrase.getElementsByTagName('img')[0];
  let keywords = ['NOBODY', 'JAMES', 'FRANKLY', 'SIMPLY','ELEMENTARY'];

  description.textContent = '';
  image.removeAttribute("src");
  description.textContent = randomphrase.toString();
  image.setAttribute("alt", "picture");

  for (let i=0; i < keywords.length; i++){
    let divided = description.textContent.toUpperCase().split(' ');
    let index = divided.indexOf(keywords[i]);
    if (index > -1) {
        if (i === 0){
          image.setAttribute("src", "images/nobody.gif");
        } else if (i == 1){
          image.setAttribute("src", "images/james.jpg");
        } else if (i == 2){
          image.setAttribute("src", "images/mydear.jpg");
        } else if (i == 3){
          image.setAttribute("src", "images/simplywalk.jpg");
        } else if (i == 4){
          image.setAttribute("src", "images/elementary.gif");
        }
    }
  }
  show(overlay);
  hide(lose);
  overlay.style.backgroundColor ='#b2ecc3';
  show(win);
  winphrase.style.display = 'flex';
  start.textContent = 'Next \u2192';
  score++;
  reset();
} //end of checkWin() function



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
} //end of checkLetter(but) function



keyboard.addEventListener('click', function(){ //check clicked buttons for correctness and ends game
  let button = event.target;
  let show = document.getElementsByClassName('show');
  let letters = document.getElementsByClassName('letter');
  if (button.tagName === 'BUTTON' ) {
    let letter = button.innerHTML;
    checkLetter(letter);
    if (letterFound === null){ //counts mistakes
        missed++;
        var child = document.getElementsByClassName("tries")[missed];
        if (missed < 5){
          hide(child);
        }
      }
    button.className = 'chosen';
    button.disabled = true;

    if (show.length === letters.length){
      checkWin();
    }

    if (missed === 5){
      show(overlay);
      hide(win);
      if (phrases.length === 0){
        hide(lose);
      } else {
        show(lose);
        overlay.style.backgroundColor ='#e68a8a';
        start.textContent = 'Next \u2192';
      }
      reset();
    }
  }
});



start.addEventListener("click", function(){ //hides overlay when start game button pressed
  let button = event.target;
  if (button.tagName === 'A' ) {
    hide(overlay);
    hide(winphrase);
    hide(rules);
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray);
  }
});
