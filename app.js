const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');
let missed = 0;

let phrasescaps = [
    'Kyle Broflovski',
    'Eric Cartman',
    'Kenny McCormick',
    'Stan Marsh',
    'Token Black'
];

const phrases = phrasescaps.map(name => name.toLowerCase());

//event handler to hide the overlay
const overlay = document.getElementById('overlay');

btnReset.addEventListener('click',()=>{
    if(overlay.className ==='win' || overlay.className ==='lose'){
        location.reload();     
    }else{
        overlay.style.display ='none';
    }
});

//function to get a random phrase
function getRandomPhraseAsArray(arr){    
    let randomNum = Math.floor(Math.random() * phrases.length);
    return phrases[randomNum];
}
getRandomPhraseAsArray(phrases);

    
// function to display the random phrase selected
function addPhraseToDisplay(arr){    
    for (let i=0; i<arr.length; i++) {
        const li = document.createElement('LI');
        const ul = document.querySelector('UL');
        li.textContent = arr[i];
        ul.appendChild(li);
            if (arr[i] == " ") {
                li.className = "space";
            } else {
                li.className = "letter";
            }
    }
}   
addPhraseToDisplay(getRandomPhraseAsArray(phrases));
 
//To check matching letters
function checkLetter(keyClicked){
    const checkLetter = document.querySelectorAll('.letter');
    let match = null;

    for (let i=0; i<checkLetter.length; i++){
        if(keyClicked === checkLetter[i].textContent){
            checkLetter[i].className += ' show';
            match= checkLetter[i].textContent;
        }
    }
    return match;   
}

qwerty.addEventListener('click', (e)=>{
    const clickedBtn = e.target;
    let lostHeartSrc = "images/lostHeart.png";

    if (clickedBtn.tagName === 'BUTTON'){
        clickedBtn.className = 'chosen';
        clickedBtn.disabled = 'true';
    
        let letterFound = checkLetter(clickedBtn.textContent);
        if (letterFound === null){
            const tries = document.querySelectorAll('.tries');
            const heartImg = document.querySelectorAll('.tries img');
            missed++;
            heartImg[0].src = lostHeartSrc;
            tries[0].className = ' ';
        }
    checkWin();    
    }
});

function checkWin(){
    const letter = document.querySelectorAll('.letter'); 
    const show = document.querySelectorAll('.show');
    const h2 = document.querySelector('h2');
    
    if(letter.length == show.length){
        overlay.className = 'win';
        h2.textContent = 'Congrats you win!';
        overlay.style.display = 'flex';
        btnReset.textContent ="Try Again";
    } else if (missed > 4){
        overlay.className = 'lose';
        h2.textContent = 'You lost!';
        overlay.style.display = 'flex';
        btnReset.textContent ="Try Again";
    }
}

