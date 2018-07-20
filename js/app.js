$(() => {
  const colors = ['tan', 'teal', 'coral', 'peru', 'tomato', 'honeydew', 'sienna',
    'orchid', 'ivory', 'crimson', 'azure', 'indigo', 'purple', 'dodgerblue',
    'goldenrod','peachpuff', 'papayawhip', 'moccasin', 'thistle','wheat','snow', 'linen' ];
  const $display = $('.squares');
  const $answer = $('#choosen');
  const $levelNumber = $('#levelNumber');
  const $displayLevel = $('.level');


  let mustContainValue;
  let level = 4;
  //Would use the below for my wrong guess feature 
  // let wrongGuessTally = 0;
  // let levelInstanceTally = 0;
  let timerID = null;
  let $tiles;
  let backgroundMusic;

  let timerInterval;

  const $timer = $('#timer');
  let finishTime;

  function randomUpTo(n) {
    return Math.floor(Math.random()*n);
  }

  const answer = (colors) => {
    const answerIndex = randomUpTo(colors.length);
    const answerColor = colors[answerIndex];
    return answerColor;
  };
  //
  //
  //This secton is to genrate a array of four colors from the weird color names///////
  const pickRandomColors = (colors, n) => {
    const tileColors = [];
    for(let i = 0; i < n; i++) {
      const colorNumber = randomUpTo(colors.length );
      const color = colors[colorNumber];
      tileColors.push(color);
    }
    return tileColors;
  };

  // ///////////////////////////////////////////////////////////////////////////////////
  //

  //
  // /////////This section is to make sure the tiles contain the answer value///
  const pickColorsUntilContains = (colors, n, answer) => {
    mustContainValue = answer(colors);
    $answer.html(mustContainValue);
    let pickedColors = [];
    while(!pickedColors.includes(mustContainValue)) {
      pickedColors = pickRandomColors(colors, n);
      //  Display picked colors for a little while
      //only way is to run  intervals before the loop
      // console.log('picking...', pickedColors);
    }
    return pickedColors;

  };
  /////////////////////start button/////////////////////////////////
  $('#start-button').on('click', e => {
    backgroundMusic = playSound('sounds/Beach_Disco.mp3');
    // Hide the start screen
    $('.start-screen').css('visibility', 'hidden');
    //This section is to create a timer for the overall gameplay which is used
    timerInterval = setInterval(increaseTimes, 1000);
  });
  ///////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////////////////////



  function increaseTimes(){
    startTime+=1;
    $timer.text(startTime);
  }

  const finalTime = function(){
    if (level===4) {
      console.log('stop!');
      clearInterval(timerInterval);
      return startTime;
    }
  };
  //
  //
  let startTime = 0;



  //
  // /////////////////////////////////////////////////////////////////////////////
  function appendNDivsToDisplay(n) {
    const pickedColors = pickColorsUntilContains(colors, n, answer);
    console.log('colors picked', pickedColors);
    pickedColors.forEach((color) => {
      if (n===4){
        $display.append(`<div class="tile" id="${color}" style="background-color: ${color}; height: 190px; width: 190px;"></div>`);
      } else if (n===9){
        $display.append(`<div class="tile" id="${color}" style="background-color: ${color}; height: 120px; width: 120px;"></div>`);
      } else if (n===16){
        $display.append(`<div class="tile" id="${color}" style="background-color: ${color}; height: 90px; width: 90px;"></div>`);
      }
    });
  }
  //
  //This section creates a level //////////////////////////////////////////////////////////////////

  function createLevel(levelNumber, numberOfSquares) {
    const level = appendNDivsToDisplay(numberOfSquares);
    $tiles = $('.tile');
    $tiles.on('click', handleTileClick);
  }

  createLevel(1, 4); // this needs to run at the start

  ///////////////////////////////////////////////////////////////////////////


  ////////This section is to create a 3 second timeout feature////////////
  //
  // createLevel(4,1) {
  //   timerID=setTimeOut(()
  // 300)
  // }

  function showMessage(message) {
    console.log(message);
    $('.message').text(message);
    $('.message-container').addClass('fade');
    setTimeout(() => {
      $('.message-container').removeClass('fade');
    }, 1500);
  }





  ////////////////////////////////////////////////////////////////////
  function playSound(soundFile) {
    const soundEffect = new Audio();
    soundEffect.src = soundFile;
    soundEffect.play();
    return soundEffect;
  }

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


  // stageChangeSound('sounds/sounds/smb2_grow.wav',level);
  // stageChangeSound('sounds/sounds/smb2_grow.wav',level);
  // stageChangeSound('sounds/sounds/smb_stage_clear.wav',level);


  ////////////////
  function handleIncorrectGuess(mustContainValue, guess) {
    playSound('sounds/the-simpsons-nelsons-haha.mp3');
    showMessage(`Ha Ha ! Gotcha this is ${guess} \n `);
    wrongGuessTally+=1;
  }



  //this section to get diferent alerts and level change on user selection////
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
      //took out instances to make test easier changing level + 0.25 to 0.5
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
        // $display.append(`<h3>Congratulations you win the game \n Your time is ${startTime} seconds</h3>`);
        // $display.append(`<h3> and guessed wrong ${wrongGuessTally} times</h3>`);
        // showMessage(`Congratulations you win game complete \n Your time:     ${startTime} seconds \n Guessed wrong:     ${wrongGuessTally} times`);
        finalTime();
        gamecomplete();
        // $display.append(`<h1>Congratulations you win the game \n Your time is ${startTime} seconds</h1>`);
        backgroundMusic.volume = 0.1;
      }

    } else {
      handleIncorrectGuess(mustContainValue, guess);
    }
  }
  function gamecomplete(){
    setTimeout(() => {
      backgroundMusic.volume = 1;
      // $display.append('<iframe src="https://giphy.com/embed/ZJB5EPInvETQY" width="100%" height="80%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/disco-ZJB5EPInvETQY"></a></p>');
      // $display.append('<div class="gif"><img src="https://i.giphy.com/ZJB5EPInvETQY.gif" alt="disco stu dances"><div>');
      $display.append('<img class="gif" src="https://i.giphy.com/ZJB5EPInvETQY.gif" alt="disco stu dances">');
      $display.append('<button type="button" id="reload-button" style="height:17px;">Play Again!</button>');
      /////////////////////////Reload Button/////////////////////////
      $('#reload-button').on('click', e => {
        location.reload();
      });
      /////////////////////////////////////////////////////
    }, 6000);

  }

////////////////////////////status bar ////////////////
// function updateLevel(){}
// $displayLevel.append;

//////////////////////////////////////////////
});
