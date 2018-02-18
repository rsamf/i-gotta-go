import React from 'react';
import {Route} from 'react-router-dom';
import Add from './add.jsx';
import networking from '../../networking/bathroom.jsx';

class Bathroom extends React.Component {
  constructor(props){
    super(props);

    console.log(this.props);
    this.state = {
      id: this.props.match.params[0],
      bathroom: {}
    };

    this.getBathroom();
  }

  getBathroom(){
    let self = this;
    networking.get(this.state.id, (res) => {
      self.setState({
        bathroom: res
      });
    });
  }

  render(){
    return(
      <div>
        {this.state.bathroom}
        <Route path="/bathroom/add" component={Add}/>
      </div>
    );
  }
}

module.exports = Bathroom;