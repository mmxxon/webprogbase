const { uniqueNamesGenerator, names, colors } = require('unique-names-generator');
const fs = require('fs');
const fetch = require('node-fetch');

var conf = {
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

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function randomLink() {
    const value = await fetch('https://some-random-api.ml/img/cat', {timeout: 1500})
        .then(response => response.json())
        .then(data => data.link);
    return value;
}

async function genValues(config) {
    let count = config.count === "rand" ?
        Math.random() * (25) + 25 :
        config.count;
    var nodes = []
    for ( let i = 0; i < count; i++) {
        let node = {}
        for ( const [key, type] of Object.entries(config.fields) ) {
            let value;
            if (type === "count") value = i;
            else if (type === "string") value = (Math.random() + 1).toString(36).substring(7);
            else if (type === "name") value = uniqueNamesGenerator({
                                        dictionaries: [names, colors],
                                        style: "capital",
                                        separator: ' ',
                                        length: 2
                                    });
            else if (type === "boolnum") value = Math.round(Math.random());
            else if (type === "isodate") value = randomDate(new Date(2012, 0, 1), new Date(2020, 10, 6)).toISOString();
            else if (type === "pic") value = await randomLink();
            node[key] = value;
        }
        nodes.push(node);
    }
    var ready = {
        "count": Math.floor(count) + 1,
        "nodes": nodes
    }
    fs.writeFileSync(config.path, JSON.stringify(ready, null, 4));
}

genValues(conf);
// randomLink()