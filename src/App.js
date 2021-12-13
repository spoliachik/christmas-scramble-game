import './App.css';
import Tile from './Tile';
import SpecialTile from './SpecialTile';
import { React, useState } from 'react';
import gift from './gift.png';

/*TODO:
- make it faster!
- make WINNER go across or something when the gift is uncovered
*/


function App() {

  const [didWin, setDidWin] = useState(false);

  let divArray = [];
  let count = 0;

  let specialID = Math.floor(Math.random() * 144);

  let winTitle = null;

  for (let i = 0; i < 12; i++) {
    let tilesArray = [];
    for (let i = 0; i < 12; i++) {
      if (count === specialID) {
        console.log('making a special tile');
        tilesArray.push(<SpecialTile idNumber={count} onWin={setDidWin}/>);
        console.log(specialID);
      } else {
        tilesArray.push(<Tile idNumber={count} key={count} specialIdNumber={specialID}/>);
      }
      count++;
    }
    divArray.push(<div className="row" key={i}>
      {tilesArray}
    </div>);
  }

  let tiles = (
    <div className="tiles">
        {divArray}
      </div>);

  if(didWin) {
    winTitle = (
      <div>
        <h1>YOU FOUND THE GIFT!</h1>
      </div>);
    tiles = (
      <div>
        <img className='bigGift' src={gift} alt='gift'/>
      </div>
    )
  } else {
    winTitle = (
    <div>
      <h1>Find the hidden present!</h1>
    </div>);
  }

  return (
    <div className="App">
      <div className="Win" >
        {winTitle}
      </div>
        {tiles}
    </div>
  );
}

export default App;
