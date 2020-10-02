import React from 'react';
import { Transition, animated } from 'react-spring/renderprops'

import Game from '../classes/Game';

const defaultStyles = {
  overflow: 'hidden',
  width: '100%',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  fontFamily: "'Kanit', sans-serif",
}

export default class TextGame extends React.PureComponent {
    constructor(props){
      super(props);
    }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#70C1B3',
          overflow: 'hidden',
          cursor: 'pointer',
          margin: 0,
          padding: 0,
        }}>
        <Transition
          items={this.props.texts} keys={item => item.key}
          //initial={null}
          from={{ overflow: 'hidden', height: 0, opacity: 0 }}
          enter={{ height: 50, opacity: 1}}
          leave={{ height: 0, opacity: 0}}
          trail={500}>
          {item => styles => (
            <animated.div style={{background:item.color,...defaultStyles, ...styles }}>
              {item.text}
            </animated.div>
          )}
        </Transition>
      </div>
    )
  }
}
