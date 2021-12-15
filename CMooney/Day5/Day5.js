//Import ExpressJS Module
const express = require('express');

//Create an Express application object
const app = express();

app.set("view engine", "ejs");

class GameMatch{
  constructor(){
    this.turn = 0;
    this.id = gameList.length + 1000;
    this.players = [

    ];
    this.round = 0;

  }
}

class Character {
  constructor(name, race, profession) {
    this.id = characterList.length + 1000
    this.name = name
    this.race = race
    this.profession = profession
    this.equiptment = {
      head: {},
      chest: {},
      legs: {},
      arm_p: {},
      arm_s: {}
    }
    this.inventory = []
    this.abilities = []
    this.stats = {
      attack: 5,
      defense: 5,
      speed: 5,
      hp_current: 20,
      hp_max: 20
    }
    //This method searches for an item in the item list with this
    //and adds it to this characters inventory
    this.pickupItem = function(searchName) {
      console.log(searchName)
      for (var item of itemList) {
        if (item.name == searchName)
          this.inventory.push(item)
        break;
      }
    }
    //This method searches for a given slot and overwrites
    //it with an empty object.
    this.unequipItem = function(slot) {
      for (var slotName in this.equiptment) {
        console.log(slotName);
        if (slotName == slot) {
          this.equiptment.slotName = {};
          break;
        }
      }
    }
  }
};
//This holds all possible equipable items
var itemList = [{
  name: 'Sword',
  slot: 'arm_p',
  bonouses: {
    attack: 5
  }
}, {
  name: 'Sheild',
  slot: 'arm_s',
  bonouses: {
    defense: 5
  }
}];

var gameList= []
var characterList = [];
characterList.push(new Character('Jeff', "Demon", `Reaper`))
characterList.push(new Character('John', "Reaper", `Spirit`))


for (var character of characterList) {
  character.pickupItem("Sword");
}

app.get('/game', (req, res) => {
  console.log(req.params.gameid)
  //Search for game in gameList
  var foundGame = gameList.find(game => game.id == req.query.gameid)
  //If a game is found we can manipulate it
  if (foundGame) {
    //Check to see if the use sent the addCharacter query param (&addcharacter=####)
    if (req.query.addcharacter) {
      //Check to see if there is room in this games player list to add a character
      if (foundGame.players.length < 2) {
        //Find the character with the given addcharacter id
        var foundProfile = characterList.find(character => character.id == req.query.addcharacter)
        //If the character exists, add its id to this game's player list
        if (foundProfile) {
          foundGame.players.push(foundProfile.id);
        }
      }
    }
    //Render a template called game from the views folder
    //And send it a variable called "sendData"
    res.render('game', {
      sendData: JSON.stringify(foundGame)
    });
  } else {
    res.redirect('/newgame')
  }
  //Each of the characters stats
});

app.get('/newgame', (req, res) => {
  gameList.push( new GameMatch());
  res.redirect('/game/?gameid=' + gameList[gameList.length - 1].id)

})

//Create a Get endpoint
app.get('/profile', (req, res) => {
  var foundProfile = characterList.find(character => character.id == req.query.characterid)
  if (foundProfile) {
    //Render a template called profile from the views folder
    //And send it a variable called "sendData"
    res.render('profile', {
      sendData: JSON.stringify(foundProfile)
    });
  } else {
    res.redirect('/newprofile')
  }
  //Each of the characters stats
});


//This enpoint creates a new character
app.get('/newprofile', (req, res) => {
  characterList.push(new Character("John", "Reaper", `Demon`))
  res.redirect('/profile/?characterid=' + characterList[characterList.length - 1].id)

})



//Start a HTTP Listen Server
app.listen(3000)
