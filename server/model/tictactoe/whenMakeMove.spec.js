var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when make move command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"663",
      gameId:"1",
      event:"GameCreated",
      name:"TestGame",
      userName: "Atli",
      timeStamp: "2015.12.09T11:29:44"
    }, {
      id:"664",
      event:"GameJoined",
      userName: "Kalli",
      otherUserName: "Atli",
      timeStamp: "2015.12.09T11:30:50"
    }];
  });

  describe('on new game', function(){
    it('should join game',function(){
      when={
        id:"666",
        comm:"MakeMove",
        userName : "Kalli",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.09T11:30:50"
      };
      then=[{
        id:"666",
        event:"MoveMade",
        userName:"Kalli",
        name:"TestGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.09T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });

  describe("on placing on an occupied square", function(){
    it('should return IllegalMove', function(){
      given.push({
        id:"123",
        event:"MoveMade",
        userName:"Atli",
        name:"TestGame",
        x:0,
        y:0,
        side:'X',
        timeStamp: "2015.12.09T11:30:55"
      });
      when={
        id:"124",
        comm:"MakeMove",
        userName:"Kalli",
        x:0,
        y:0,
        side:'Y',
        timeStamp: "2015.12.09T11:30:59"
      };
      then=[{
        id:"124",
        event:"IllegalMove",
        userName:"Kalli",
        x:0,
        y:0,
        side:'Y',
        timeStamp: "2015.12.09T11:30:59"
      }];
    });
  });

  describe("one previous move", function(){
    it('placing move in same place should be illegal',function(){
      given.push({
        id:"665",
        event:"MoveMade",
        userName:"Kalli",
        name:"TestGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.09T11:30:50"
      });

      when={
        id:"666",
        comm:"MakeMove",
        userName : "Kalli",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.09T11:30:50"
      };

      then=[{
        id:"666",
        event:"IllegalMove",
        userName:"Kalli",
        name:"TestGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.09T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });
  describe("on placing 3 in a horizontal line", function(){
    it('should announce game won', function(){
      given.push({
        id:"1",
        event:"MoveMade",
        userName:"Atli",
        name:"TestGame",
        x:0,
        y:0,
        side:'X',
        timeStamp: "2015.12.09T12:30:00"
      }, {
        id:"2",
        event:"MoveMade",
        userName:"Kalli",
        name:"TestGame",
        x:0,
        y:1,
        side:'Y',
        timeStamp: "2015.12.09T12:31:00"
      }, {
        id:"3",
        event:"MoveMade",
        userName:"Atli",
        name:"TestGame",
        x:1,
        y:0,
        side:'X',
        timeStamp: "2015.12.09T12:32:00"
      }, {
        id:"4",
        event:"MoveMade",
        userName:"Kalli",
        name:"TestGame",
        x:1,
        y:1,
        side:'Y',
        timeStamp: "2015.12.09T12:33:00"
      });

      when={
        id:"5",
        comm:"MakeMove",
        userName:"Atli",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.09T12:34:00"
      };

      then=[{
        id:"5",
        event:"GameWon",
        userName:"Atli",
        name:"TestGame",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.09T12:34:00"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });
});
