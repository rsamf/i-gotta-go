import React from 'react';
import networking from '../../networking/bathroom.jsx';

class Bathroom extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      location: {
        coordinates: [],
        street: "",
        city: "",
        state: "",
        zip: "",
        buildingName: "",
        locatingDetails: ""
      }
    };
  }

  upForm(id, evt){
    let val = evt.target.value;
    let location = this.state.location;
    location[id] = val;
    this.setState({
      location: location
    });
    console.log(this.state);
  }

  submit(){
    let _ = this.state.location;
    let toSend;
    if(_.street){
      let address = `${_.street}, ${_.city}, ${_.state} ${_.zip}`;
      toSend = Object.assign(this.state, {address: address});
    } else if(_.coordinates){
      toSend = this.state;
    }
    networking.add(toSend, (err, res) => {
      if(!err) console.log(res);
    });
  }

  render(){
    return (
      <div>
        <div className="row container">
          <div className="col s3">
            <a className="btn-floating btn-large waves-effect waves-light red">
              <i className="material-icons">navigation</i>
            </a>
          </div>
          <form className="col s9">
            <div className="row">
              <div className="input-field col s8">
                <input id="street" type="text" className="validate" onChange={(e)=>this.upForm("street",e)}/>
                <label htmlFor="street">Street Address</label>
              </div>
              <div className="input-field col s4">
                <input id="city" type="text" className="validate" onChange={(e)=>this.upForm("city",e)}/>
                <label htmlFor="city">City</label>
              </div>
              <div className="input-field col s8">
                <input id="state" type="text" className="validate" onChange={(e)=>this.upForm("state",e)}/>
                <label htmlFor="state">State</label>
              </div>
              <div className="input-field col s4">
                <input id="zip" type="text" className="validate" onChange={(e)=>this.upForm("zip",e)}/>
                <label htmlFor="zip">Zip Code</label>
              </div>
            </div>
          </form>
          <div className="input-field col s12">
            <input id="buildingName" type="text" className="validate" onChange={(e)=>this.upForm("buildingName",e)}/>
            <label htmlFor="buildingName">Building Name</label>
          </div>
          <div className="input-field col s12">
            <textarea id="locatingDetails" className="materialize-textarea" onChange={(e)=>this.upForm("locatingDetails",e)}>
            </textarea>
            <label htmlFor="locatingDetails">Locating Details</label>
          </div>
          <button onClick={()=>this.submit()} className="waves-effect waves-light btn">Submit</button>
        </div>
      </div>
    );
  }
}

module.exports = Bathroom;