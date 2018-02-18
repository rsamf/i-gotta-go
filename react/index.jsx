import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home.jsx';
import Bathroom from './components/bathroom/index.jsx';
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
          <Route path="/" component={Bathroom}/>
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