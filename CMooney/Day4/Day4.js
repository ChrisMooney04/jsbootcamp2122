//Import ExpressJS Module
const express = require('express');

//Create an Express application object
const app = express();

app.set("view engine", "ejs");

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

var characterList = [];
characterList.push(new Character('Jeff', "Demon", `Reaper`))

characterList[0].pickupItem("Sword");
characterList[0].unequipItem("arm_p");
//Create a Get endpoint
app.get('/profile/:characterid', (req, res) => {
  console.log(req.params.characterid)

  var foundProfile = characterList.find(character => character.id == req.params.characterid)
  if (foundProfile) {

    //Render a template called profile from the views folder
    //And send it a variable called "sendData"
    res.render('profile', {
      sendData: JSON.stringify(foundProfile)
    });
  } else {
    res.redirect('/new')
  }
  //Each of the characters stats
});


//This enpoint creates a new character
app.get('/new', (req, res) => {
  characterList.push(new Character("John", "Reaper", `Demon`))
  res.redirect('/profile/' + characterList[characterList.length - 1].id)

})



//Start a HTTP Listen Server
app.listen(3000)
