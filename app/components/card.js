var React = require("react");

var Card = React.createClass({
  render: function(){
    return (
      <div className="card-wrapper">
        <div className="card-header">
          <a href="#" className="card-title">{ this.props.name }</a>
        </div>
        <div className="card-badges">
        </div>
      </div>
    );
  }

});

module.exports = Card;