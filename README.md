# WDI-project-one
## Colour Master 3000
![picture alt](https://i.imgur.com/ARNmli8.png "Title is optional")
### introduction
A simple game created using vanilla javascript and Jquery to help web developers remember funky and *cool* placeholder colour names when creating web pages. Injecting bytes of fun into coding and laughter when teaching coding.

The colour names have been chosen specifically on the basis that do not give away the colour name in the name and are very short or very intriguing, making this game a memorisation tool that is fun and useful.

[Demo](https://nasiratt92.github.io/WDI-project-one/)

### Technologies used
* HTML5
* CSS3
* JavaScript
* jQuery

### Instructions to play

![picture alt](https://i.imgur.com/mS9zxlE.png "Level 1")

On the grid click the correct colour tile corresponding to the displayed colour name underneath.

Once you have guessed the correct HTML colours three time correctly, you will progress to next level with added tiles to guess from.

There are three levels to clear before game is completed and you are given your completion time and opportunity to play again.
### bonus
As a bonus see if you can complete the game with less than 5 wrong guesses.
___
## Project brief

Your game should:

* Render a game in the browser

* Design logic for winning & visually display which player won

* Include separate HTML / CSS / JavaScript files

* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles

* Use Javascript or jQuery for DOM manipulation

* Deploy your game online, where the rest of the world can access it

* Use semantic markup for HTML and CSS (adhere to best practices)

***
### Challenges
As this was my first ever JavaScript endeavour, I found the project as a whole a challenge. I had to adopt to learn JavaScript coding skills within the code (e.g. declaring global variable and functions) and learn coder's skills outside of the code (e.g. mind mapping coding solutions and pre planning code to be written).


***
### Favourite feature

As much as I enjoyed going through my many code challenges throughout this project (like adding Simpsons nelson sound or Discos Stue's 80's dance off gif), my favourite achievement has to be deployment of Super Mario sounds throughout the gameplay. This was achieved through two blocks of code in the JavaScript file.


So throughout the game development I discovered the need to create a separate play sound function which would serve useful application throughout the code.
```js
function playSound(soundFile) {
  const soundEffect = new Audio();
  soundEffect.src = soundFile;
  soundEffect.play();
  return soundEffect;
}
```

After this I incorporated the function to the level change function

```js
function stageChangeSound(){
  if (level === 2){
    playSound('sounds/smb2_grow.wav');
    $levelNumber.html(2);
  } else if (level === 3) {
    playSound('sounds/smb2_grow.wav');
    $levelNumber.html(3);
  } else if (level === 4) {
    playSound('sounds/smb_stage_clear.wav');
    $display.append(`<h1 class='win-text'>Congratulations you win the game \n your time is ${startTime} seconds</h1>`);
  }
}
```
Also when creating a new level

```js
function handleTileClick(e) {
  const guess = $(e.target).attr('id');
  backgroundMusic.volume = 0.15;

  if (guess === mustContainValue) {

    stageChangeSound(); // play the level up sound (maybe)
    console.log('LEVEL: ', level);

    if (level <2 ) {
      showMessage(`Well done this is ${mustContainValue}`);
      // clearTimeout(timerID);
      $tiles.remove();
      level = parseFloat((level + 0.25).toFixed(2));
      levelInstanceTally+=1;
      playSound('sounds/super-mario-bros_hxyb1pX.mp3');
      createLevel(1, 4);
    } else if (level <3 ) {
      showMessage(`Well done this is ${mustContainValue}`);
      // clearTimeout(timerID);
      $tiles.remove();
      level = parseFloat((level + 0.25).toFixed(2));
      //took out instances to make test easier changing level + 0.25 to 0.5
      playSound('sounds/smb_coin.wav');
      createLevel(3, 9);
    } else if (level <4) {
      showMessage(`Well done this is ${mustContainValue}`);
      playSound('sounds/smb_coin.wav');
      $tiles.remove();
      level = parseFloat((level + 0.25).toFixed(2));
      //took out instances to make test easier changing level + 0.25 to 0.5
      createLevel(3, 16);
    } else if (level === 4) {
      $tiles.remove();
      playSound('sounds/smb_coin.wav');
      finalTime();
      gamecomplete();
      // $display.append(`<h1>Congratulations you win the game \n Your time is ${startTime} seconds</h1>`);
      backgroundMusic.volume = 0.1;
    }

  } else {
    handleIncorrectGuess(mustContainValue, guess);
  }
}
```


## Future features
There are plenty of features which given the time I would love to add to this game such as
* High Score League table
* Better clock Design
* Share screenshot on Facebook
* Better instructions
* create game difficulty like timeouts.
