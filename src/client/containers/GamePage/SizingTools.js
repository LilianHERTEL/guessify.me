import React from 'react';
import { CustomPicker } from 'react-color';
var { Hue } = require('react-color/lib/components/common');
var {Circle} = require('react-color/lib/components/circle/Circle.js');
class BlackWhiteColorPicker extends React.Component {
  
  constructor(props){
    super(props);
    
  }


  render() {
    return (
    <div style={{height:"50px",width:"50px",position:"relative", background:"whitesmoke"}}>
    
      <i class="fas fa-plus-circle"></i>

    </div>);
  }
}

export default CustomPicker(BlackWhiteColorPicker);