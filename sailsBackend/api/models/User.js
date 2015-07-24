/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    email: { 
      type: 'string', 
      unique: true
      },
    password: { type: 'string'},
    displayName: 'string',
    picture: 'string',
    facebook: 'string',
    twitter: 'string',
    events: {
      collection: 'event',
      via:'personal'
    },
    group:{
      model:'group'
    }
    }
};

