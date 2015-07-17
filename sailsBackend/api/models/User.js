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
      unique: true, 
      lowercase: true 
      },
    password: { type: 'string', 
      select: false 
      },
    displayName: 'string',
    picture: 'string',
    facebook: 'string',
    twitter: 'string'
    }
};

