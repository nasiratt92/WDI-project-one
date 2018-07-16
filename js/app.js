$(() => {
  const colors = ['tan', 'teal', 'coral', 'peru', 'tomato', 'honeydew', 'sienna',
    'ordchid', 'ivory', 'crimson', 'azure', 'indigo', 'purple', 'dodgerblue', 'goldenrod'];
  const $display = $('.squares');
  const $answer = $('#choosen');


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
  const pickColorsUntilContains = (colors, n, mustContain) => {
    const mustContainValue = mustContain(colors);
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
  const level1 = appendNDivsToDisplay(4);

  const $tiles = $('.tile');
  // const level2 = appendNDivsToDisplay(9);

  // const level3 = appendNDivsToDisplay(16);

  //this section to get diferent alerts on user selection////

  $tiles.on('click',(e)=>{
    const guess = $(e.target).attr('id');
    if (guess === answer)
      alert(`this is ${answer} mate`);
    else alert(`Ha Ha ! Gotcha this is not ${answer} mate try again`);
  });



});
