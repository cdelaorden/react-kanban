var React = require("react"),
    Card = require("./card"),
    AppState = require("../appstate");


/** CardComposer - Form to create a new card **/
var CardComposer = React.createClass({
  setFocus: function(){
    this.refs.composer.getDOMNode().focus();
  },
  onSaveCard: function(event){
    //notify parent
    this.props.saveHandler.apply(null, [ this._createCard() ]);
  },
  saveOnEnter: function(event){
    if(event.keyCode === 13){
      this.props.saveHandler.apply(null, [ this._createCard() ]);
    }
  },
  render: function(){
    return (
      <div className="board-add-card">
        <div className="card-composer">
          <textarea ref="composer" onKeyUp={ this.saveOnEnter }></textarea>
        </div>
        <div className="card-composer-buttons">
          <button className="btn" onClick={ this.onSaveCard }>Add</button>
          <a href="#" onClick={ this.props.cancelHandler }>Cancel</a>
        </div>
      </div>);
  },
  _createCard: function(event){
    var cardText = this.refs.composer.getDOMNode().value;
    return {
      text: cardText
    };
  }
});

/** BoardActions - Board bottom menu **/
var BoardActions = React.createClass({
  render: function(){
    return (<ul>
              <li><a href="#" onClick={ this.props.addCardHandler }>Add card...</a></li>
            </ul>);
  }
});

/** Board - A single kanban board **/
var Board = React.createClass({
  getInitialState: function(){
    return {
      showComposer: false,
      cards: AppState.getCards(this.props.boardId)
    };
  },
  addCard: function(event){
    this.setState({ showComposer: true });
  },
  cancelCard: function() {
    this.setState({ showComposer: false });
  },
  saveCard: function(data){
    AppState.addCard(this.props.id, data);
    this.setState({ showComposer: false });
  },
  updateCard: function(data){
    AppState.updateCard(this.props.id, data.cardId, data.name);
  },
  render: function(){
    var cards = this.props.cards.map(function(card){
      return (<Card key={card.id} id={card.id} name={card.name} onUpdate={ this.updateCard } />);
    });

    var actions = this.state.showComposer ?
      <CardComposer ref="composer" saveHandler={ this.saveCard } cancelHandler={ this.cancelCard } /> :
      <BoardActions addCardHandler={ this.addCard } />;

    return (
      <div className="col-2 board-wrapper">
        <div className="board-header">
          <h2>{ this.props.name }</h2>
        </div>
        <div className="board-content">
          { cards }
          <div className="board-actions">
            { actions }
          </div>

        </div>
      </div>
    );
  },
  componentDidUpdate: function(){
    if(this.state.showComposer){
      //focus its textarea
      this.refs.composer.setFocus();
    }
  }
});

module.exports = Board;