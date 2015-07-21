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
	twitter: function(req,res){
		    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
		    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
		    var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

		    // Part 1 of 2: Initial request from Satellizer.
		    if (!req.body.oauth_token || !req.body.oauth_verifier) {
		        var requestTokenOauth = {
		            consumer_key: config.TWITTER_KEY,
		            consumer_secret: config.TWITTER_SECRET,
		            callback: req.body.redirectUri
		        };

		        // Step 1. Obtain request token for the authorization popup.
		        request.post({
		            url: requestTokenUrl,
		            oauth: requestTokenOauth
		        }, function(err, response, body) {
		            var oauthToken = qs.parse(body);

		            // Step 2. Send OAuth token back to open the authorization screen.
		            res.send(oauthToken);
		        });
		    } else {
		        // Part 2 of 2: Second request after Authorize app is clicked.
		        var accessTokenOauth = {
		            consumer_key: config.TWITTER_KEY,
		            consumer_secret: config.TWITTER_SECRET,
		            token: req.body.oauth_token,
		            verifier: req.body.oauth_verifier
		        };

		        // Step 3. Exchange oauth token and oauth verifier for access token.
		        request.post({
		            url: accessTokenUrl,
		            oauth: accessTokenOauth
		        }, function(err, response, accessToken) {

		            accessToken = qs.parse(accessToken);

		            var profileOauth = {
		                consumer_key: config.TWITTER_KEY,
		                consumer_secret: config.TWITTER_SECRET,
		                oauth_token: accessToken.oauth_token
		            };

		            // Step 4. Retrieve profile information about the current user.
		            request.get({
		                url: profileUrl + accessToken.screen_name,
		                oauth: profileOauth,
		                json: true
		            }, function(err, response, profile) {

		                // Step 5a. Link user accounts.
		                if (req.headers.authorization) {
		                    User.findOne({
		                        twitter: profile.id
		                    }, function(err, existingUser) {
		                        if (existingUser) {
		                            return res.status(409).send({
		                                message: 'There is already a Twitter account that belongs to you'
		                            });
		                        }

		                        var token = req.headers.authorization.split(' ')[1];
		                        var payload = jwt.decode(token, config.TOKEN_SECRET);

		                        User.findById(payload.sub, function(err, user) {
		                            if (!user) {
		                                return res.status(400).send({
		                                    message: 'User not found'
		                                });
		                            }

		                            user.twitter = profile.id;
		                            user.displayName = user.displayName || profile.name;
		                            user.picture = user.picture || profile.profile_image_url.replace('_normal', '');
		                            user.save(function(err) {
		                                res.send({
		                                    token: createJWT(user)
		                                });
		                            });
		                        });
		                    });
		                } else {
		                    // Step 5b. Create a new user account or return an existing one.
		                    User.findOne({
		                        twitter: profile.id
		                    }, function(err, existingUser) {
		                        if (existingUser) {
		                            return res.send({
		                                token: createToken(existingUser)
		                            });
		                        }

		                        User.create({
									twitter : profile.id,
									displayName : profile.name,
		                        	picture : profile.profile_image_url.replace('_normal', '')
								}).exec(function(err,user){
									var token = createToken(user);
									 res.send({
		                                token: createToken(user)
		                            });
								})
		                    });
		                }
		            });
		        });
		    }
		},
		facebook: function(req,res){
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
       //get user info 
       me: function(req, res) {
         User.findOne(req.userId, function(err, user) {
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


