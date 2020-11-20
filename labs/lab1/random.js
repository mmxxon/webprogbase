const {uniqueNamesGenerator, names, colors} = require('unique-names-generator');
const fs = require('fs');
const fetch = require('node-fetch');

var user = {
  "count": "rand",
  "path": "./data/users.json",
  "fields": {
    "id": "count",
    "login": "string",
    "fullname": "name",
    "role": "boolnum",
    "registeredAt": "isodate",
    "avaUrl": "pic",
    "isEnabled": "boolnum"
  }
}

var org = {
  "count": "rand",
  "path": "./data/orgs.json",
  "fields": {
    "id": "count",
    "name": "business",
    "founder": "name",
    "founded": "isodate",
    "employers": "number",
    "isActive": "boolnum"
  }
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomOrg() {
  name1 = [
    "Zephyr",
    "Dauntless",
    "Electric",
    "Overland",
    "Nerds of",
    "Oddity",
    "Eupheme",
    "Epic",
    "Quad",
    "Cool Cats of",
    "Vortex",
    "Tribbles",
    "Candor",
    "Focus",
    "Spotlight",
    "Bruhaha",
    "Spark",
    "Plutus",
    "Orpheus",
    "Olympia",
    "Napoleon",
    "The Brain",
    "The Department of",
    "Springboard",
    "Trials",
    "Easy",
    "Perfect",
    "Odysey",
    "Fortuna",
    "Brand",
    "Troublesome",
    "Xinitrack",
    "Century",
    "Legacy",
    "Snap",
    "I am no brand",
    "No One",
    "Acclaim"
  ];
  name2 = [
    "Agency",
    "Farpoint",
    "Inc",
    "Media",
    "Corp",
    "Digital",
    "Tech",
    "Point",
    "Influence",
    "Enterprises",
    "Concepts",
    "Hub",
    "Quest",
    "Technology",
    "Skyline",
    "Strategic",
    "Results",
    "Resource",
    "Company",
    "Solutions",
    "Consultancy",
    "Advocacy",
    "Innovations",
    "Fantastics",
    "Answers",
    "Inbound",
    "Marketing",
    "Leaverage",
    "Moonscape",
    "Performance",
    "Wizards"
  ];
  return name1[Math.floor(Math.random() * 38)] + " " + name2[Math.floor(Math.random() * 30)]
}

async function randomLink() {
  const value = await fetch('https://some-random-api.ml/img/cat', {timeout: 1500}).then(response => response.json()).then(data => data.link);
  return value;
}

async function genValues(config) {
  let count = config.count === "rand" ? Math.random() * (25) + 25 : config.count;
  var items = []
  for (let i = 1; i <= count; i++) {
    let node = {}
    for (const [key, type] of Object.entries(config.fields)) {
      let value;
      if (type === "count")
        value = i;
      else if (type === "string")
        value = (Math.random() + 1).toString(36).substring(7);
      else if (type === "name")
        value = uniqueNamesGenerator({
          dictionaries: [
            names, colors
          ],
          style: "capital",
          separator: ' ',
          length: 2
        });
      else if (type === "boolnum")
        value = Math.round(Math.random());
      else if (type === "isodate")
        value = randomDate(new Date(2012, 0, 1), new Date(2020, 10, 6)).toISOString().substr(0, 10);
      else if (type === "pic")
        value = await randomLink();
      else if (type === "business")
        value = randomOrg();
      else if (type === "number")
        value = Math.round(Math.random() * 5000 + 1)

      node[key] = value;
    }
    items.push(node);
  }
  var ready = {
    "nextId": Math.floor(count) + 1,
    "items": items
  }
  fs.writeFileSync(config.path, JSON.stringify(ready, null, 2));
}

genValues(user);
genValues(org);
// randomLink()
