import React from 'react';
import {Route} from 'react-router-dom';
import Add from './add.jsx';
import Review from './review.jsx';
import networking from '../../networking/bathroom.jsx';

class Bathroom extends React.Component {
  constructor(props){
    super(props);

    console.log(this.props);
    this.state = {
      id: this.props.match.params[0],
      bathroom: {},
      loading: true,
      verified: this.props.match.path.substring(0, 2) !== '/u'
    };
    console.log(this.state.id);
    console.log(this.state.verified);

    if(this.state.verified) this.getBathroom();
    else this.getGBathroom();
  }
  getGBathroom(){
    let self = this;
    networking.gGet(this.state.id, res => {
      console.log(res);
      self.setState({
        bathroom: res,
        loading:false
      });
    });
  }
  getBathroom(){
    let self = this;
    networking.get(this.state.id, (res) => {
      console.log(res);
      self.setState({
        bathroom: res,
        loading:false
      });
    });
  }

  eachReview(i, review){
    return(
      <Review key={i}>{review}</Review>
    );
  }

  render(){
    return(
      <div>
        {this.state.loading ? this.renderLoader() : this.renderState()}
      </div>
    );
  }
  renderLoader(){
    return <div>Loading...</div>;
  }

  renderState(){
    if(this.state.bathroom){
      let b = this.state.bathroom;
      if(this.state.verified){
        return (
          <div className="ui container">
            <div className="ui dividing header">{b.location.buildingName || b.location.formatted}</div>
            <div className="ui grid">
              <div className="eight wide column">
                <div className="sixteen wide column">
                  <div className="ui card">
                    <div className="content">
                      <div className="header">Location</div>
                      TODO
                    </div>
                    <div className="content">
                      <div className="header">Rating</div>
                      TODO
                    </div>
                  </div>
                  <div className="ui horizontal divider"><i className="location arrow icon"></i></div>
                </div>
                <div className="sixteen wide column">
                  <div className="ui header">Locator</div>
                  <div className="ui segment">TODO</div>
                </div>
              </div>
              <div className="eight wide column">
                <div className="ui grid">
                  <div className="three column row">
                    <div className="left floated column">
                      <div className="ui header">Reviews</div>
                    </div>
                    <div className="right floated column">
                      <div className="ui basic button">Add a Review</div>
                    </div>
                  </div>
                </div>
                
                
                

                <div className="ui segment">
                  {b.reviews.length === 0 ? 
                    <div>No reviews yet</div> : 
                    b.reviews.map((i, r)=>this.eachReview(i,r))
                  }
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return(
          <div className="ui container">
            <div className="ui dividing header">{b.name}</div>
            <div className="ui text container segment">
              This bathroom is unverified, click here: if you would like to verify it:
              <button onClick={()=>this.verifyCurrent()} className="ui basic button">Verify</button>
            </div>
          </div>
        );
      }
    } else {
      return(
        <div></div>
      );
    }
  }
  verifyCurrent() {
    let curr = this.state.bathroom;
    let coords = curr.geometry.location;
    coords = [coords.lat, coords.lng];
    networking.add({coords: coords, location: {buildingName: curr.name}, gId: curr.place_id}, bathroom => {
      bathroom.verified = true;
      console.log(bathroom);
      this.setState({
        bathroom: bathroom
      });
    });
  }
}

module.exports = Bathroom;