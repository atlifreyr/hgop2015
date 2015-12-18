var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function(){

  var given, when, then;

  it('should join game',function(){
    given= [{
      id:"666",
      gameId:"1",
      event:"GameCreated",
      userName: "Atli",
      timeStamp: "2015.12.09T11:29:44",
      name: "TestGame"
    }];
    when={
      id:"666",
      comm:"JoinGame",
      userName : "Kalli",
      name:"TestGame",
      timeStamp: "2015.12.09T11:30:50"
    };
    then=[{
      id:"666",
      event:"GameJoined",
      userName: "Kalli",
      otherUserName: "Atli",
      timeStamp: "2015.12.09T11:30:50"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should reject joining of a non-existing game',function(){
    given= [];
    when={
      id:"999",
      comm:"JoinGame",
      userName : "Kalli",
      name:"TheFirstGame",
      timeStamp: "2015.12.09T11:30:55"
    };
    then=[{
      id:"999",
      event:"GameDoesNotExist",
      userName: "Kalli",
      timeStamp: "2015.12.09T11:30:55"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
