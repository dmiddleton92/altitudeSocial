const Reaction = require('../models/reactionModel');
const Thought = require('../models/thoughtModel');

const createReaction = (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;


// create a new reaction

Reaction.create({ reactionBody, username })
.then(newReaction => {
    return Thought.findOneAndUpdate(
        thoughtId,
        { $push: { reactions: newReaction._id } },
        { new: true }
    );  
}) 
.then(updatedThought => res.json(updatedThought))
.catch(err => res.status(500).json(err));
};

// delete a reaction

const deleteReaction = (req, res) => {
    const { thoughtId, reactionId } = req.params;

    Thought.findOneAndUpdate(
        thoughtId,
        { $pull: { reactions: reactionId } },
        { new: true }
    )
    .then(() => {
        return Reaction.findOneAndDelete({ _id: reactionId });
    })
    .then(deletedReaction => res.json(deletedReaction))
    .catch(err => res.status(500).json(err));
};

module.exports = { createReaction, deleteReaction };
