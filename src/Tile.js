import { React, useEffect, useState } from 'react';
import useMouseHover from './useMouseHover';
import './Tile.css';


function Tile(props) {
    const idNumber = props.idNumber;

    //DEBUG: 
    const specialIdNumber = props.specialIdNumber;

    const hover = useMouseHover(true, idNumber);
    const [color, setColor] = useState('green');

    if (!hover.selectedElement) {
      hover.selectedElement = {
        isHover: false
      }
    }

    //DEBUG: 
    if (idNumber === specialIdNumber) {
        console.log('oops! making a normal tile for the special id');
    }

    useEffect(() => {
        if (hover.selectedElement) {
            if (hover.selectedElement.isHover) {
                console.log(idNumber);
                setColor('transparent');
            } else {
                setColor('green');
            }
        }
    }, [hover, idNumber])

    return (
        <div className={color} id={idNumber}>
        </div>
    );
}

export default Tile;