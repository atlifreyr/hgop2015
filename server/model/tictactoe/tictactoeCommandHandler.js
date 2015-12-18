var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']]
  };

  var eventHandlers={
    'MoveMade': function(event){
      gameState.board[event.x][event.y] = event.side;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          name: cmd.name

        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          userName: cmd.userName,
          otherUserName: gameState.gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "MakeMove": function(cmd){
      var a,b,c;
      var won = false;
      // Check for horizontal win
      a = cmd.side;
      b = gameState.board[(cmd.x+1)%3][cmd.y];
      c = gameState.board[(cmd.x+2)%3][cmd.y];
      if (a === b && b === c) won = true;

      // Check for vertical win
      a = cmd.side;
      b = gameState.board[cmd.x][(cmd.y+1)%3];
      c = gameState.board[cmd.x][(cmd.y+2)%3];
      if (a === b && b === c) won = true;

      // Check for diagonal win
      a = cmd.side;
      b = gameState.board[(cmd.x+1)%3][(cmd.y+1)%3];
      c = gameState.board[(cmd.x+2)%3][(cmd.y+2)%3];
      if (a === b && b === c) won = true;

      // Return a win event
      if (won) {
        return [{
          id: cmd.id,
          event: "GameWon",
          userName: cmd.userName,
          name: gameState.gameCreatedEvent.name,
          x: cmd.x,
          y: cmd.y,
          side: cmd.side,
          timeStamp: cmd.timeStamp
        }];
      }

      // Check for draw
      var draw = true;
      for (var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
          if (!(i == cmd.x && j == cmd.y)) {
            if (gameState.board[i][j] === '') draw = false;
          }
        }
      }

      if (draw) {
        return [{
          id: cmd.id,
          event: "GameDraw",
          userName: cmd.userName,
          name: gameState.gameCreatedEvent.name,
          x: cmd.x,
          y: cmd.y,
          side: cmd.side,
          timeStamp: cmd.timeStamp
        }];
      }

      var eventName = "";
      if(gameState.board[cmd.x][cmd.y]!==''){
        eventName = "IllegalMove";
      }
      else {
        eventName = "MoveMade";
      }
      return [{
        id: cmd.id,
        event: eventName,
        userName: cmd.userName,
        name:gameState.gameCreatedEvent.name,
        x:cmd.x,
        y:cmd.y,
        side:cmd.side,
        timeStamp: cmd.timeStamp
      }]
    }
  };

  return {
    executeCommand: function (cmd) {
      var handler = handlers[cmd.comm];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};
