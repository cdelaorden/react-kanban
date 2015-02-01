var React = require("react");
var AppState = require("./appstate");

var MyComp = React.createClass({
  getInitialState: function(){
    return AppState;
  },
  render: function(){
    var items = this.state.todos.map(function(todo){
      return <li key={todo.id}>{ todo.text }</li>;
    });

    return (
      <div className="wrapper">
        <div className="row">
          <h1>Trellin</h1>
        </div>
        <div className="row">
          <div className="col-3 board">
          col1
          </div>
          <div className="col-3 board">
          col2
          </div>
          <div className="col-3 board">
          col3
          </div>
          <div className="col-3 board">
          col4
          </div>
        </div>
        <div className="row">
          <div className="col-12">footer</div>
        </div>
      </div>
      );
  }
});

module.exports = MyComp;