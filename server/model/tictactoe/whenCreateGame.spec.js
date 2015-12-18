var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){
  var given, when, then;

  it('should create game',function(){
    given= [];
    when={
      id:"666",
      gameId:"1",
      comm:"CreateGame",
      userName : "Atli",
      name:"TestGame",
      timeStamp: "2015.12.07T11:29:44"
    };
    then=[{
      id:"666",
      gameId:"1",
      event:"GameCreated",
      userName: "Atli",
      timeStamp: "2015.12.07T11:29:44",
      name:"TestGame"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should create game with another id, user, and time',function(){
    given= [];
    when={
      id:"999",
      gameId:"1",
      comm:"CreateGame",
      userName : "Kalli",
      name:"TestGame",
      timeStamp: "2015.12.07T10:29:44"
    };
    then=[{
      id:"999",
      gameId:"1",
      event:"GameCreated",
      userName: "Kalli",
      timeStamp: "2015.12.07T10:29:44",
      name:"TestGame"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
