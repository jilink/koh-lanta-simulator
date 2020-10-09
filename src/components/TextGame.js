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
  border: '1px solid white',
  height: 'max-content',
  padding: 5,
}

export default class TextGame extends React.PureComponent {
    constructor(props){
      super(props);
    }

  scrollToBottom = () => {
    setTimeout(() => this.messagesEnd.scrollIntoView({ behavior: "smooth" }), 150);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="overflow-auto" style={{ height: "500px"}}>
        <Transition
          items={this.props.texts} keys={item => item.key}
          //initial={null}
          from={{ overflow: 'hidden', opacity: 0 }}
          enter={{ opacity: 1}}
          leave={{ opacity: 1}}
          >
          {item => styles => (
            <animated.div style={{background:item.color,...defaultStyles }}>
              {item.text}
            </animated.div>
          )}
        </Transition>
         <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
         </div>
      </div>
    )
  }
}
