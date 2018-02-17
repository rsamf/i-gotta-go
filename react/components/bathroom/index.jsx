import React from 'react';
import {Route} from 'react-router-dom';
import Add from './add.jsx';

class Bathroom extends React.Component {
  constructor(props){
    super(props);


  }

  render(){
    return(
      <div>
        Bathroom
        <Route path="/bathroom/add" component={Add}/>
      </div>
    );
  }
}

module.exports = Bathroom;