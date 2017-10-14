let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let missed = 0;
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
      var li = document.createElement("LI");
      var letter = document.createTextNode(arr[i]);
      li.appendChild(letter);
      ul.appendChild(li);
      if (li.innerHTML != ' '){
        let letters = document.getElementsByTagName('li');
        letters[i].className = "letter";
      }
    }
};

let letterFound;

function checkLetter(but) {
  letterFound = null;
  let allLetters = document.getElementsByClassName('letter');
      for (let i = 0; i < allLetters.length; i++) {
        let letter = allLetters[i].innerHTML;
        // console.log(but);
        // console.log(allLetters[i]);


        if (letter.toLowerCase() === but){
          // console.log(allLetters[i].innerHTML);
          allLetters[i].classList.add("show");
          letterFound = allLetters[i].innerHTML;
        }
      }
      // console.log(letterFound);

      // if (letterFound == null){
      //   return null;
      // }

};
// console.log(letterFound);


keyboard.addEventListener('click', function(){
  let button = event.target;
  if (button.tagName === 'BUTTON' ) {
    // console.log(button.innerHTML);
      let letter = button.innerHTML;
          checkLetter(letter);
          // console.log('hi');

          if (letterFound == null){
            missed++;
            // console.log(missed);

            let tries = document.getElementsByTagName('img');
            console.log(tries);
            tries[0].style.display = 'hide';
            // let img = trY.getElementsByTagName('img')[0];

            // tries.pop();
            // console.log(scoreboard, trY);

            // trY.removeChild(img);

            // document.getElementsByClassName("tries").innerHTML = tries;

          };

          // console.log(letterFound);

          button.className = 'chosen';
          button.disabled = true;
          // console.log(button);
          let show = document.getElementsByClassName('show');
          let letters = document.getElementsByClassName('letter');

          let div = document.createElement('div');
          var h2 = document.createElement("h2");
          var won = document.createTextNode('You won!');
          console.log(div);

          h2.appendChild(won);
          div.appendChild(h2);
          div.className = 'win';
          div.style.display = "block";



          if (show.length == letters.length){



          }

}});




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
