import React, { useState, useMemo, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { inRange } from '../Utils.js';
const POSITION = { x: 0, y: 0 };
const height = 80;

const Draggable = ({
  children,
  onDrag = () => {},
  onDragEnd = () => {},
  id,
}) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState(state => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      };
      setState(state => ({
        ...state,
        translation,
      }));
      onDrag({ translation, id });
    },
    [state.origin, onDrag, id]
  );
  const handleMouseUp = useCallback(() => {
    setState(state => ({
      ...state,
      isDragging: false,
    }));
    onDragEnd();
  }, [onDragEnd]);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    setState({ ...state, translation: POSITION });
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
      transform: state.isDragging
        ? `translate(${state.translation.x}px, ${state.translation.y}px)`
        : null,
      transition: state.isDragging ? 'none' : `transform 500ms`,
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? 'absolute' : 'relative',
    }),
    [state.isDragging, state.translation]
  );

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

const DragAndDrop = () => {
  const items = [0, 1, 2, 3, 4, 5];
  const [state, setState] = useState({
    order: items,
    dragOrder: items,
    draggedIndex: null,
  });

  const handleDrag = useCallback(
    ({ translation, id }) => {
      const delta = Math.round(translation.y / height);
      const index = state.order.indexOf(id);
      const dragOrder = state.order.filter(index => index !== id);

      if (!inRange(index + delta, 0, items.length)) {
        return;
      }

      dragOrder.splice(index + delta, 0, id)

      setState(state => ({
        ...state,
        draggedIndex: id,
        dragOrder,
      }));
    },
    [state.order, items.length]
  );

  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null,
    }));
  }, []);
  return (
    <Container>
      {items.map(index => {
        const isDragging = state.draggedIndex === index;
        const draggedTop = state.order.indexOf(index) * (height + 10);
        const top = state.dragOrder.indexOf(index) * (height + 10);
        return (
          <Draggable
            onDrag={handleDrag}
            id={index}
            onDragEnd={handleDragEnd}
            key={index}>
            <Rect top={isDragging ? draggedTop : top} isDragging={isDragging}>
              {index}
            </Rect>
          </Draggable>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 80vw;
  height: 100vh;
`;

const Rect = styled.div.attrs(props => ({
  // style: {
  //   top: `${props.top}px`,
  // },
}))`
  width: 300px;
  height: ${height}px;
  user-select: none;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${props => `${props.top}px`};
  transition: ${props => (props.isDragging ? 'none' : 'all 500ms')};
  left: calc(50bw - 150px);
  font-size: 20px;
  color: #777;
`;

export default DragAndDrop;
