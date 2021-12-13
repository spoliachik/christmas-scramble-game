import { React, useEffect, useState } from 'react';
import useMouseHover from './useMouseHover';
import './Tile.css';
import gift from './gift.png';

function SpecialTile(props) {
    const idNumber = props.idNumber;
    const hover = useMouseHover(true, idNumber);
    const [display, setDisplay] = useState('green');

    if (!hover.selectedElement) {
      hover.selectedElement = {
        isHover: false
      }
    }

    const onWin = () => {
        props.setDidWin(true);
    }

    useEffect(() => {
        if (hover.selectedElement) {
            if (hover.selectedElement.isHover) {
                // display image!!!!
                // and you WIN!!!
                console.log('this is the winning tile');
                setDisplay('image');
                props.onWin(true);
            } else {
                setDisplay('green');
                props.onWin(false);
            }
        }
    }, [hover])

    return (
        <div className={display} id={idNumber} onclick={onWin}>
            {hover.selectedElement.isHover &&
            <img className="giftImage" src={gift} alt="gift"/>
            }
        </div>
    );
}

export default SpecialTile;