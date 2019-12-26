import React from 'react';
import { CustomPicker } from 'react-color';
import {Button,Grid} from '@material-ui/core';

class SizingTools extends React.Component {
  
  constructor(props){
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked(type){
      switch(type){
            case "plus":
                break;
            case "minus":
                break;
            default:
                console.log("error");
      }
      console.log("clicked !! !! ! !");
  }


  render() {
    return (
    <Grid container direction="row" style={{height:"50px",width:"50px",position:"relative", background:"whitesmoke"}}>
        <Button onClick={() => { this.props.onClickPlus() }} color="primary" ><i class="fas fa-plus-circle"></i></Button>
        <Button onClick={() => { this.props.onClickMinus() }} color="primary"><i class="fas fa-minus-circle"></i></Button>
      

    </Grid>);
  }
}

export default CustomPicker(SizingTools);