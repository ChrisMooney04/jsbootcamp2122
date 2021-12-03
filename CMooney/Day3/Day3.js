//Import ExpressJS Module
const express = require('express');

//Create an Express application object
const app = express();

app.set("view engine", "ejs");

//Create one character object
var character = {
  name: 'Jeff',
  race: 'Elf',
  profession: 'Archer',
  equiptment: {
    head: {},
    chest: {},
    legs: {},
    arm_p: {},
    arm_s: {}
  },
  inventory: [],
  abilities: [],
  stats: {
    attack: 5,
    defense: 5,
    hp_current: 20,
    hp_max: 20
  },
  //This method searches for an item in the item list with this
  //and adds it to this characters inventory
  pickupItem: function(searchName){
    console.log(searchName)
    for (var item of itemList) {
      if (item.name == searchName)
        console.log("Found a Match");
        this.inventory.push(item)
      break;
    }
  },
  //This method searches for a given slot and overwrites
  //it with an empty object.
  unequipItem: function(slot) {
    for (var slotName in this.equiptment) {
      console.log(slotName);
      if (slotName == slot) {
        console.log("Found item in slot. Removing");
        this.equiptment.slotName = {};
        break;
      }
    }
  }
};

//Create a Get endpoint
app.get('/', (req, res) => {
  character.pickupItem("Sword");
  character.unequipItem("arm_p");
  res.render('profile', {sendData: JSON.stringify(character)});
  //Each of the characters stats
});

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

//Start a HTTP Listen Server
app.listen(3000)
