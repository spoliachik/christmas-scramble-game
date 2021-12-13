import { useEffect, useState } from 'react';

const firstMouse = {
    position: {
        client: {
            x: null,
            y: null
        },
        screen: {
            x: null,
            y: null
        },
        page: {
            x: null,
            y: null
        },
        boundingRect: {
            left: null,
            top: null,
            width: null,
            height: null
        }
    }
}

function useMouseHover (
    touchEnabled = true, 
    selectedElementId,
    selectedElementOffset = {x: 0, y: 0}
    ) {
        const [mouse, setMouse] = useState(firstMouse);
        let selectedEl;

        const onMouseTouchEvent = (event) => {
            let clientX;
            let clientY;
            let screenX;
            let screenY;
            let pageX;
            let pageY;

            const selectedElPosition = { ...mouse.position };
            const selectedElBoundingRect = { ...mouse.boundingRect };
            if (selectedEl) {
                const { left, top, width, height } = selectedEl.getBoundingClientRect();
                selectedElPosition.x = clientX - left - selectedElementOffset.x;
                selectedElPosition.y = clientY - top - selectedElementOffset.y;
                const rad2Deg = 180 / Math.PI;
                const angleOffset = 180;
                selectedElPosition.angle =
                  Math.atan2(selectedElPosition.y, -selectedElPosition.x) * rad2Deg + angleOffset;
                selectedElBoundingRect.left = left;
                selectedElBoundingRect.top = top;
                selectedElBoundingRect.width = width;
                selectedElBoundingRect.height = height;
            }
            
            setMouse(prevState => ({
                ...prevState,
                position: {
                  client: { x: clientX, y: clientY },
                  screen: { x: screenX, y: screenY },
                  page: { x: pageX, y: pageY },
                },
                eventType: event.type,
                selectedElement: {
                  ...prevState.selectedElement,
                  position: selectedElPosition,
                  boundingRect: selectedElBoundingRect,
                },
            }));
        }

        const onLeave = ()  => {
            setMouse(firstMouse);
        };

          const onSelectedElementEnter = () => {
            const selectedElement = { ...mouse.selectedElement };
            selectedElement.isHover = true;
            setMouse(prevState => ({
              ...prevState,
              selectedElement,
            }));
        };

        const onSelectedElementLeave = () => {
            const selectedElement = { ...mouse.selectedElement };
            selectedElement.isHover = false;
            setMouse(prevState => ({
              ...prevState,
              selectedElement,
            }));
        };


        useEffect(() => {
            if (selectedElementId) {
                selectedEl = document.getElementById(selectedElementId);
                if (!selectedEl) {
                    throw new Error(`Element with id="${selectedElementId}" doesn't exist"`);
                }
                selectedEl.addEventListener('mouseenter', onSelectedElementEnter);
                selectedEl.addEventListener('mouseleave', onSelectedElementLeave);
            }
            document.addEventListener('mousemove', onMouseTouchEvent);
            document.addEventListener('mousedown', onMouseTouchEvent);
            document.addEventListener('mouseup', onMouseTouchEvent);

            if (touchEnabled) {
                window.addEventListener('touchend', onLeave);
            }

            return () => {
                document.removeEventListener('mousemove', onMouseTouchEvent);
                document.removeEventListener('mousedown', onMouseTouchEvent);
                document.removeEventListener('mouseup', onMouseTouchEvent);
                if(touchEnabled) {
                    window.removeEventListener('touchend', onLeave);
                }
            }
        }, []);
        return mouse;
    }

    export default useMouseHover;

