var React = require("react"),
    AppState = require("./appstate"),
    Board = require("./components/board");

var MainView = React.createClass({
  getInitialState: function(){
    return {
      boards: AppState.getBoards(),
      showNewBoard: false
    };
  },
  getDefaultProps: function(){
    return { boards: [] };
  },
  addBoard: function(data){
    this.setState({
      showNewBoard: true
    });
  },
  saveOnEnter: function(event){
    if(event.keyCode === 13){
      this.saveBoard(event);
    }
  },
  saveBoard: function(event){
    var text = this.refs.boardname.getDOMNode().value;
    if(text){
      AppState.addBoard(text);
    }
    this.setState({ showNewBoard: false });
  },
  cancelBoard: function(){
    this.setState({ showNewBoard: false });
  },
  componentDidUpdate: function(){
    if(this.state.showNewBoard){
      this.refs.boardname.getDOMNode().focus();
    }
  },
  render: function(){
    var boardViews = this.state.boards.map(function(board){
      return <Board key={board.id} id={board.id} name={board.name} cards={board.cards} />;
    });

    var addTitle = (<h3 ref="addTitle"><a href="#" onClick={ this.addBoard }>+ Add Board...</a></h3>);
    var addForm = (<div ref="addForm" className="board-add-form">
                <input type="text" ref="boardname" placeholder="Board name..." onKeyUp={ this.saveOnEnter } className="board-name" />
                <button className="btn" onClick={ this.saveBoard }>Save</button>
                <a href="#" onClick={ this.cancelBoard }>Cancel</a>
              </div>);
    var actions = this.state.showNewBoard ? addForm : addTitle;

    return (
      <div className="wrapper">
        <div className="row header">
          <div className="col-12">
            <h1 className="title">Trellin</h1>
          </div>
        </div>

        <div className="row toolbar">
          <div className="col-12">
            some stuff
          </div>
        </div>

        <div className="row board-container">
          { boardViews }

          <div className="col-2 board-wrapper">
            <div className="board-add-wrapper">
              { actions }
            </div>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = MainView;