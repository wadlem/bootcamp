/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    addTopic: function (req, res, next) {
        if (req.body) {
        let topic={
                author:req.body.author,
                content:req.body.topic
            }
        Topic.create(topic, function topicCreated(err, topic) {
            if (err) return err;
            res.json(topic);
          });
        } else {
          next();
        }
    },

    returnTopics: function (req, res, next) {
        Topic.find( function foundTopics (err, topics){
            if (err) return err;
            res.json(topics);
        })
    },

    
	
};

