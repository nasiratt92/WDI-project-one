$(() => {
  const colors = ['tan', 'teal', 'coral', 'peru', 'tomato', 'honeydew', 'sienna',
    'ordchid', 'ivory', 'crimson', 'azure', 'indigo', 'purple', 'dodgerblue', 'goldenrod','peachpuff', 'papayawhip', 'moccasin' ];
  const $display = $('.squares');
  const $answer = $('#choosen');

  let mustContainValue;
  let level = 1;
  let wrongGuessTally = 0;
  let $tiles;

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
  // ///////////////////////////////////////////////////////////////////////////////////
  //This section is to create a timer for the overall gameplay which is used
  //
  //
  let startTime = 0;

  const timerInterval = setInterval(increaseTimes, 1000);

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
  //

  function createLevel(levelNumber, numberOfSquares) {
    const level = appendNDivsToDisplay(numberOfSquares);
    $tiles = $('.tile');
    $tiles.on('click', handleTileClick);
  }

  createLevel(1, 4); // this needs to run at the start


  //this section to get diferent alerts and level change on user selection////
  function handleTileClick(e) {
    const guess = $(e.target).attr('id');

    if (guess === mustContainValue) {

      console.log('LEVEL: ', level);

      if (level <2 ) {
        alert(`Well done this is ${mustContainValue}`);
        // clearTimeout(timerID);
        $tiles.remove();
        level = parseFloat((level + 0.25).toFixed(2));
        createLevel(1, 4);
      } else if (level === 2 ) {
        alert(`Well done this is ${mustContainValue}`);
        // clearTimeout(timerID);
        $tiles.remove();
        level+=1;
        createLevel(3, 9);
      } else if (level === 3) {
        alert(`Well done this is ${mustContainValue}`);
        $tiles.remove();
        level+=1;
        createLevel(3, 16);
      } else if (level === 4) {
        $tiles.remove();
        $display.append(`<h3>Congratulations you win the game \n Your time is ${startTime} seconds</h3>`);
        $display.append(`<h3> and guessed wrong ${wrongGuessTally} times</h3>`);
        // alert(`Congratulations you win game complete \n Your time:     ${startTime} seconds \n Guessed wrong:     ${wrongGuessTally} times`);
        finalTime();
      }

    } else {
      alert(`Ha Ha ! Gotcha this is not ${mustContainValue} mate try again`);
      wrongGuessTally+=1;
    }
  }


});
