$(() => {
  const colors = ['tan', 'teal', 'coral', 'peru', 'tomato', 'honeydew', 'sienna',
    'ordchid', 'ivory', 'crimson', 'azure', 'indigo', 'purple', 'dodgerblue', 'goldenrod'];
  const $display = $('.squares');
  const $answer = $('#choosen');

  let mustContainValue;
  let level = 1;
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
  // answerColor.('#choosen').text();
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
      console.log('picking...', pickedColors);
    }
    return pickedColors;

  };
  // ///////////////////////////////////////////////////////////////////////////////////
  // // console.log(pickColorsUntilContains(colors, 3, answer));
  //
  //
  let startTime = 0;

  const timerInterval = setInterval(increaseTimes, 1000);

  function increaseTimes(){
    startTime+=1;
    $timer.text(startTime);
  }

  const finalTime = function(){
    if (level===3) {
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
    console.log('createLevel');
    const level = appendNDivsToDisplay(numberOfSquares);
    $tiles = $('.tile');
    console.log($tiles);
    $tiles.on('click', handleTileClick);
  }

  // const level1 = appendNDivsToDisplay(4);
  createLevel(1, 4); // this needs to run at the start

  // let $tiles = $('.tile');
  // const level2 = appendNDivsToDisplay(9);

  // const level3 = appendNDivsToDisplay(16);

  //this section to get diferent alerts on user selection////
  function handleTileClick(e) {
    const guess = $(e.target).attr('id');
    // console.log('mustContainValue', mustContainValue, guess);

    if (guess === mustContainValue) {

      if (level === 1) {
        alert(`Well done this is ${mustContainValue}`);
        $tiles.remove();
        level+=1;
        createLevel(2, 9);
      } else if (level === 2) {
        alert(`Well done this is ${mustContainValue}`);
        $tiles.remove();
        level+=1;
        createLevel(3, 16);
      } else if (level === 3) {
        $tiles.remove();
        $display.append('<h1>You win!</h1>');
        alert(`You win game complete your time is ${startTime} seconds`);
        finalTime();
      }

    } else {
      alert(`Ha Ha ! Gotcha this is not ${mustContainValue} mate try again`);
    }
  }


// level2 =
//    $tiles.on('click',(e)=>{
//      const guess2 = $(e.target).attr('id');
//
//      if (guess2 === mustContainValue) {
//        alert(`Well done this is ${mustContainValue}`);
//        $tiles.remove();
//        appendNDivsToDisplay(16);
//        level3;
//      } else {
//        alert(`Ha Ha ! Gotcha this is not ${mustContainValue} mate try again`);
//      }
//    });
//   }
  // if (level === 3){
  //
  //   level3 =
  //  $tiles.on('click',(e)=>{
  //    const guess3 = $(e.target).attr('id');
  //
  //    if (guess3 === mustContainValue) {
  //      alert(`Well done this is ${mustContainValue}`);
  //      alert('Game complete');
  //      level3;
  //    } else {
  //      alert(`Ha Ha ! Gotcha this is not ${mustContainValue} mate try again`);
  //    }
  //  });
  // }
});
