import React from 'react';

class Review extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      created: false,
      review: {
        text: "",
        rating: 0
      }
    };

  }

  renderForm(){
    return (
      <form className="ui form container">
        <h4 className="ui dividing header">Submit a Review</h4>
        <div className="field">
          <label>Review</label>
          <input type="text" name="" onChange={(e)=>this.upForm("text", e)}>
        </div>
        <div className="field">
          <label htmlFor="">Rating</label>
          <div class="ui star rating" data-rating="3" onChange={(e)=>this.upForm("rating", e)}/>
        </div>
        <button onClick={()=>this.submit()} className="waves-effect waves-light btn">Submit</button>
      </form>
    );
  }

  renderReview(){
    return (
      

    );
  }
  render(){
    return (
      <div>
        {this.state.created ? renderReview() : renderForm()}
      </div>
    );
  }
}

module.exports = Review;