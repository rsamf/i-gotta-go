import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home.jsx';
import Bathroom from './components/bathroom/index.jsx';
import Add from './components/bathroom/add.jsx';
import User from './components/user.jsx';
import Error404 from './components/404.jsx';

class Index extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/bathroom/add" component={Add}/>
          <Route path="/b/*" component={Bathroom}/>
          <Route path="/ub/*" component={Bathroom}/>
          <Route path="*" component={Error404}/>
        </Switch>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  console.info("i-gotta-go v0.0.1");
  ReactDOM.render(
    <HashRouter> 
      <Index/>
    </HashRouter>, document.getElementById("app")
  );
});