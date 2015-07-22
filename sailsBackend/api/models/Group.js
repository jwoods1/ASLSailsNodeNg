/**
* Group.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      groupName: 'string',
      picture: 'string',
      events:{
        eventId: 'string',
        title:'string',
        memebers:'string'
      },
      members:{
        
      },
      owner:{
         model: 'user'
      }
     }
};

