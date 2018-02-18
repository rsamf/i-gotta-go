import React from 'react';
import networking from '../../networking/review.jsx';

class Review extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.children);
    let up = this.props.children.upvotes;
    this.state = {
      funny: (up && up.funny)|| 0,
      serious: (up && up.serious) || 0,
      lifeChanging: (up && up.lifeChanging) || 0
    };
  }

  componentDidMount(){
    $('.ui.rating')
      .rating('disable')
    ;
  }
  up(attr){
    let state = this.state;
    state[attr]++;
    this.setState(state);

    networking.upvote(this.props.children._id, attr, (res) => {
      console.log(res);
      //do nothing
    });
  }

  render(){
    let votes = this.state;
    return (
      <div className="ui segment">
        <div className="item">
          <div className="content">
            <p>{this.props.children.text}</p>

            <div className="extra ui grid">
              <div className="three column row">
                <div className="left floated column">
                  <div className="ui star rating" data-max-rating="5" data-rating={this.props.children.rating}></div>
                </div>
                <div className="right floated aligned column">
                  {this.props.children.pooped && <div className="ui label">Has pooped here</div>}
                  {this.props.children.wouldRecommend && <div className="ui label">Would Recommend</div>}
                  {this.props.children.stall && <div className="ui label">Stall {this.props.children.stall}</div>}
                </div>
              </div>
            </div>
            
            
            <div className="ui horizontal divider"><i className="thumbs up outline icon"></i></div>
            <a onClick={()=>this.up("funny")} className="ui label">
              Funny {votes.funny || 0}
            </a>
            <a onClick={()=>this.up("serious")} className="ui label">
              Serious {votes.serious || 0}
            </a>
            <a onClick={()=>this.up("lifeChanging")} className="ui label">
              Life-Changing {votes.lifeChanging || 0}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Review;