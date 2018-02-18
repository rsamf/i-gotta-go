import React from 'react';

class Review extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.children);
  }

  componentDidMount(){
    $('.ui.rating')
      .rating('disable')
    ;
  }
  render(){
    let up = this.props.children.upvotes;
    return (
      <div>
        <p>{this.props.children.text}</p>
        <div className="ui star rating" data-max-rating="5" data-rating={this.props.children.rating}></div>
        {this.props.children.pooped && <div className="ui label">Has pooped here</div>}
        {this.props.children.wouldRecommend && <div className="ui label">Would Recommend</div>}
        {this.props.children.stall && <div className="ui label">Stall {this.props.children.stall}</div>}
        
        <div className="ui horizontal divider"></div>
        <a className="ui label">
          Funny {(up && up.funny) || 0}
        </a>
        <a className="ui label">
          Serious {(up && up.serious) || 0}
        </a>
        <a className="ui label">
          Life-Changing {(up && up.lifeChanging) || 0}
        </a>
      </div>
    );
  }
}

module.exports = Review;