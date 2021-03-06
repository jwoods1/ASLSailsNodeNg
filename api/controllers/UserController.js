/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var qs = require('querystring');
 var request = require('request');
 var jwt = require('jwt-simple');
 var moment = require('moment');

module.exports = {
	


  /**
   * `UserController.facebook()`
   */
  facebook: function (req, res) {
   var accessTokenUrl = 'https://graph.facebook.com/v2.3/oauth/access_token';
      var graphApiUrl = 'https://graph.facebook.com/v2.3/me';
      var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.FACEBOOK_SECRET,
        redirect_uri: req.body.redirectUri
      };
    
      // Step 1. Exchange authorization code for access token.
      request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: accessToken.error.message });
        }
    
        // Step 2. Retrieve profile information about the current user.
        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
          if (response.statusCode !== 200) {
            return res.status(500).send({ message: profile.error.message });
          }
          if (req.headers.authorization) {
            User.findOne({ facebook: profile.id }, function(err, existingUser) {
              if (existingUser) {
                return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
              }
              var token = req.headers.authorization.split(' ')[1];
              var payload = jwt.decode(token, config.TOKEN_SECRET);
              User.findById(payload.sub, function(err, user) {
                if (!user) {
                  return res.status(400).send({ message: 'User not found' });
                }
                user.facebook = profile.id;
                user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                user.displayName = user.displayName || profile.name;
                user.save(function() {
                  var token = createJWT(user);
                  res.send({ token: token });
                });
              });
            });
          } else {
            // Step 3b. Create a new user account or return an existing one.
        
           User.findOne({
                        facebook: profile.id
                    }, function(err, existingUser) {
                        if (existingUser) {
                            var token = createToken(existingUser);
                            return res.send({
                                token: token
                            });
                        }

                        User.create({
              facebook : profile.id,
              displayName : profile.name,
                          picture : 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
            }).exec(function(err, user){
              var token = createToken(user);
               res.send({
                                token: token
                            });
            })
                    });
          }
        });
      });
  },



  //email password signup
 signup: function(req,res){
     User.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        return res.status(409).send({ message: 'Email is already taken' });
      }
      User.create({
  email : req.body.email,
  displayName : req.body.displayName,
        password: req.body.password
}).exec(function(err, user){
  var token = createToken(user);
   res.send({
              token: token
          });
})
  });
 },
  /**
   * `UserController.me()`
   */
     //get user info 
 me: function(req, res) {
   User.findOne(req.userId).populate('events')
   .exec( function(err, user) {
        res.send(user);
   });
  }
};

function createToken(user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

