// //this is where we store our strategies - one of which is facebook
// var User = require('../models/user');
// var GitHubStrategy = require('passport-github').Strategy;
//
// module.exports = function(passport){
//
//   passport.serializeUser(function(user, done){
//     console.log('serializing user: ', user);
//     done(null, user._id);
//   });
//
//   passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//       console.log('deserializing user: ', user);
//       done(err, user);
//     })
//   })
//
//   passport.use('github', new GitHubStrategy({
//     clientID: process.env.GITHUB_API_KEY_PULSE,
//     clientSecret: process.env.GITHUB_API_SECRET_PULSE,
//     callbackURL: "http://localhost:3000/auth/github/callback",
//   }, function(access_token, refresh_token, profile, done){
//       console.log(profile);
//        User.findOne({'github.email': profile._json.email}, function(err,user){  //if fb email or github email is current email entered. dont forget to run this test with fb too. if someone logged in with gh but not with fb yet
//          if(err) return done(err);
//          if(user){
//             if(!user.github){
//               user.github.id = profile.id;
//               user.github.access_token = access_token;
//               user.github.name = profile.displayName;
//               user.github.email = profile._json.email;
//               user.save(function(err){
// 							if(err) throw err;
//   							done(null, user);
//   						});
//             }
//             else {
//               done(null, user);
//             }
//          }
//          else {
//            user = new User();
//            user.github.id = profile.id;
//            user.github.access_token = access_token;
//            user.github.name = profile.displayName;
//            user.github.email = profile._json.email;
//            user.save(function(err){
//              if(err) throw err;
//              done(null, user);
//            })
//          }
//        })
//   }))
//
//
//
// }
