/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    addComment: function (req, res, next) {
        if (req.body) {
        let comment={
                author:req.body.author,
                content:req.body.comment,
                topicId:req.body.topicId
            }
        Comment.create(comment, function commentCreated(err, comment) {
            if (err) return err;
            res.json(comment);
          });
        } else {
          next();
        }
    },

    returnComments: function (req, res, next) {
        if (req.query.id) {
            Comment.find({ topicId: req.query.id }, function (err, comments) {
              if (err) {
                next(new Error("Couldn't find comments: " + err));
                return;
              }
              res.json(comments);
            });
        } else {
            next();
        }
    }
	
};

