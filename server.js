'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(bodyParser.json()); // for Content-Type 'application/json'
app.use(bodyParser.text()); // for Content-Type 'text/plain'
// for Content-Type 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(cors());

const groups = [
  {
    groupType: 'secret',
    groupName: 'Super Users',
    groupDescription: 'super user lover group'
  },
  {
    groupType: 'private',
    groupName: 'Upper Management',
    groupDescription: 'the big guys'
  },
  {
    groupType: 'public',
    groupName: 'coworkers',
    groupDescription: 'coworker`s group'
  }
];

app.post('/groups', (req, res) => {
  const item = req.body;
  const name = item.groupName.toLowerCase();
  const found = groups.some(group => group.groupName.toLowerCase() === name);

  if (!found) {
    res.status(201).send('Group created succesfully');
    groups.push(item);
  } else {
    res.status(403).send('Group already exists');
  }
});

app.listen(8083, () => console.log('ready'));
