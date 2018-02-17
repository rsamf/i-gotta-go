import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home.jsx';
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
          <Route path="*" component={Error404}/>
        </Switch>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  console.info("justsignin");
  ReactDOM.render(
    <HashRouter> 
      <Index/>
    </HashRouter>, document.getElementById("app")
  );
});