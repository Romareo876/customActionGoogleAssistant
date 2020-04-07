const express = require("express"); 
const bodyParser = require("body-parser");
const server = express();

var sl = require('./libraries/simplelambda');

server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.use(bodyParser.json());

server.post("/", function (req, res) {
 
  var intent = req.body.queryResult.intent.displayName;
  console.log(intent+ ' ');

  var responseToUser = " ";

  switch (intent.toString()) {
    case "About":
      responseToUser='APL class of 2019/2020 semester 2 project, the group members are'+
                      ' \nRomareo Bromfield, \nSashamoy Palmer \nand Krisane Blackwood';      
      break;

    case "Semantics":
      responseToUser == 'Semantics formally describes how programs should be evaluated.'+
                        'Programs that are well-formed according to its semantics do not get stuck.'+
                        'The semantics describes what it should do. In otherwords, its speaks to meaning.\n\n'+

                        'There are three major classes of Semantics, the Denotational semantics,'+
                        'the Operational semantics and the Axiomatic semantics.\n'+

                        'Operational semantics\n'+
                        'Operational semantics uses the idea that languages are abstract machines and'+
                        'evaluation of a program is a series of state transitions from an initial to a final state.'+

                        'Denotational semantics\n'+
                        'Denotational semantics uses the idea that languages are mathematical objects.'+
                        'Unlike operational semantics, evaluation and implementation details are abstracted away.'+

                        'Axiomatic semantics\n'+
                        'Intuitively related to Hoare Logic. Instead of deriving laws from operational or' + 
                        'denotational behaviour definitions, the laws themselves define the semantics of the language.';      
      break;

    case "Lambda Calculus":
      var userInput = req.body.queryResult.parameters.userInput; //'(\\x.y)((\\z.zz)(\\w.w))';
      reduce(userInput);
      function reduce(userInput) {      
        var term = sl.parse(userInput);
    
        while (term) {
            console.log(term.toString());
            responseToUser= responseToUser +'\n'+ term.toString()
            term = sl.reduce(term);
        }    
      }

          
      break;

    case "Quit":
      responseToUser='Goodbye!';      
      break;
  
    default:
      break;
  }

   

  var response = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: responseToUser,
            },
          },
        ],
      },
    },
  };

  return res.json({
    payload: response,
    //data: speechResponse,
    fulfillmentText: responseToUser,
    speech: responseToUser,
    displayText: responseToUser,    
  });

});

server.listen(process.env.PORT || 4449, function () {
  console.log("Server up and listening");
});

