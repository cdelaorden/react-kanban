var React = require("react"),
    AppState = require("../appstate");

/** Card - A single card view **/
var Card = React.createClass({
  propTypes: {
    onUpdate: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return {
      editing: false
    };
  },
  onTitleClick: function(){
    this.setState({ editing: true });
  },
  onCancel: function(){
    this.setState({ editing: false });
  },
  onSaveCard: function(){
    var name = this.refs.composer.getDOMNode().value;
    var callback = this.props.onUpdate;
    if(callback){
      callback.apply(null, [{
        cardId: this.props.id,
        name: name
      }]);
    this.setState({ editing: false });
    }
  },
  saveOnEnter: function(event){
    if(event.keyCode === 13){
      this.onSaveCard();
    }
  },
  componentDidUpdate: function(){
    if(this.state.editing){
      this.refs.composer.getDOMNode().focus();
    }
  },
  render: function(){
    var contents;
    if(this.state.editing){
      contents = (
        <div className="card-composer">
          <textarea ref="composer" onKeyUp={ this.saveOnEnter } defaultValue={this.props.name}></textarea>
          <button className="btn" onClick={ this.onSaveCard }>Save</button>
          <a href="#" onClick={ this.onCancel }>Cancel</a>
        </div>);
    }
    else {
      contents = (<div className="card-header" onClick={ this.onTitleClick }>
          <a href="#" className="card-title">{ this.props.name }</a>
        </div>)
    }
    return (
      <div className="card-wrapper">
        { contents }
        <div className="card-badges">
        </div>
      </div>
    );
  }

});

module.exports = Card;