$(() => {
  console.log('this is a test');
  // const colors = ['tan', 'teal', 'coral', 'peru', 'tomato', 'honeydew', 'sienna',
  // 'ordchid', 'ivory', 'crimson', 'azure', 'indigo'];
  // const display = $('.squares');

  const answer = $('#choosen').text();

  const $tiles = $('.tile');

  $tiles.on('click',(e)=>{
    const guess = $(e.target).attr('id');
    if (guess === answer)
      alert(`this is ${answer} mate`);
    else alert(`Ha HA ! Gotcha this is not ${answer} mate try again`);
  });




  // colors.forEach((color) => {
  //   console.log(color);
  // });

  console.log(answer);


});





//
//  // let array1 = ['x', 'o']
//  const $square = $('.square');
//  let currentMove = 'x';
//  // const winCase = {case1:1,2,3 case2:4,5,6 case3:7,8,9 case4:1,4,7 case5:2,5,8 case6:3,6,9 case7:1,5,9 case8:3,5,7};
//
//
//  // const checkForClass = () => {
//  //
//  // }
//
//
//
//  $square.on('click', () => {
//    const $currentSq =$(event.target);
//    if (currentMove === '󠁧󠁢󠁥󠁮󠁧P1') {
//      $currentSq.text(currentMove);
//      currentMove = 'P2';
//      $(event.target).addClass('p1');
//      console.log(event);
//    } else {
//      $currentSq.text('P2');
//      currentMove = '󠁧󠁢󠁥󠁮󠁧P1';
//      $(event.target).addClass('p2');
//      console.log(event);
//    }
//    const scorePusher = () => {
//      player1.push($(event.target).attr('id'));
//      console.log(player1);
//    };
//  });
//
//
//
//  // const checkForWinner = () => {
//  //   switch ()
//  // }
//
//
//
// });
