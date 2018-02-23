/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {


  login: function (req, res) {
    res.view();
  },


  logout: function (req, res) {
    req.session.destroy(function (err) {
      return res.redirect('http://localhost:8080/');
    });
  },

  facebook: function (req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] })(req, res);
  },

  facebookCallback: function (req, res, next) {
    passport.authenticate('facebook', function (err, user) {
        User.findOne({ id: user.id }, function createdUser(err, user) {
          if(!user.topicliked) user.topicliked=[];
          user.save();
          if (err) console.log(err);
        });
        // res.json(user);
        res.redirect("http://localhost:8080/connected/?id=" + user.id);
      })(req, res, next);
  },

  returnUser: function (req, res, next) {
    if (req.query.id) {
      User.findOne({ id: req.query.id }, function (err, user) {
        if (err) {
          next(new Error("Couldn't find user: " + err));
          return;
        }
        res.json(user);
      });
    } else {
      next();
    }
  },

  likeTopic: function (req, res, next) {
    if (req.body.id && req.body.topicId) {
        User.findOne({ id: req.body.id }, function (err,user) {
          if (err) {
            next(new Error(err));
            return;
          }
          user.topicliked.push(req.body.topicId);
          user.save();
          res.json("ok!");
        });
    } else {
        next();
    }
  },

  unlikeTopic: function (req, res, next) {
    if (req.body.id && req.body.topicId) {
        User.findOne({ id: req.body.id }, function (err,user) {
          if (err) {
            next(new Error(err));
            return;
          }
          user.topicliked.splice(user.topicliked.indexOf(req.body.topicId),1);
          user.save();
          res.json("ok!");
        });
    } else {
        next();
    }
  }
};

