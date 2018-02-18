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
        </div>
      </div>
    );
  }
}

module.exports = Review;