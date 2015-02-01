// var events = require("events");
var _ = require("lodash");

var emitter = {
  listeners: [],
  on: function(event, callback){
    if(!this.listeners[event]){
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },
  trigger: function(event, data){
    var handlers = this.listeners[event];
    if(handlers && handlers.length){
      handlers.map(function(handler){
        handler.apply(null, [data]);
      });
    }
  }
};

//appstate.js
var appState = {
  nextBoardId: 3,
  nextCardId: 5,
  boards: [
    {
      id: 1,
      name: "Backlog",
      cards: [
        { id: 1, name: "Como Cristina quiero que la fruta llegue siempre a tiempo" },
        { id: 2, name: "Como Cristina quiero que el chinoguarro acepte pago con tarjeta" }
      ]
    },
    {
      id: 2,
      name: "Doing",
      cards: [
        { id: 3, name: "Como Cristina quiero que React sea fácil de aprender" },
        { id: 4, name: "Como Cristina quiero que React sea fácil de utilizar" },
      ]
    }
  ]
};

module.exports = {
  addChangeListener: function(cb){
    emitter.on("change", cb);
  },
  getBoards: function(){
    return appState.boards;
  },
  getCards: function(boardId){
    return appState.boards.filter(function(b){
      return b.id === boardId;
    }).map(function(board){
      return board.cards;
    });
  },
  deleteCard: function(boardId, id){
    var board = _.find(appState.boards, function(b) { return b.id === boardId });
    if(board){
      board.cards = board.cards.filter(function(c){
        return c.id !== id;
      });
    }
    emitter.trigger("change");
  },
  updateCard: function(boardId, id, newText){
    var board = _.find(appState.boards, function(b){ return b.id === boardId });
    if(board){
      var card = _.find(board.cards, function(c){ return c.id === id });
      if(card){
        card.name = newText;
      }
    }
    emitter.trigger("change");
  },
  addBoard: function(name){
    appState.boards.push({
      id: ++appState.nextBoardId,
      name: name,
      cards: []
    });
    emitter.trigger("change");
  },
  removeBoard: function(id){
    appState.boards = appState.boards.filter(function(b){
      return b.id !== id;
    });
    emitter.trigger("change");
  },
  addCard: function(boardId, cardData){
    var board = _.find(appState.boards, function(b){ return b.id === boardId });
    if(board){
      board.cards.push({
        id: ++appState.nextCardId,
        name: cardData.text
      });
      emitter.trigger("change");
    }

  },
  removeCard: function(boardId, cardData){
    throw new Error("NOt implemented yet!");
  }
};