const express = require("express")
const {Exercise, ExerciseComment} = require("../Models/Exercise")
const router = express.Router()

// Index
router.get("/exercise/:id/exComment", (req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise.comments))
    .catch((err) => {console.log(err)
        res.status(500).send("Internal Server Error")})
})

// Create
router.post("/exercise/:id/exComment", (req,res) => {
    ExerciseComment.create(req.body)
    Exercise.findOneAndUpdate(
        {_id: req.params.id},
        {$push: {comments: req.body}},
        {new:true}
    )
    .then((comments) => res.json(comments))
    .catch((err) => {console.log(err)
        res.status(500).send("Internal Server Error")})
})

// Read
router.get("/exercise/:id/exComment/:commentId", (req,res) => {
    Exercise.find(
        {
            _id: req.params.id,
            "comments._id": {_id: req.params.commentId}
        },
        {"comments.$": 1}
    )
    .then((data) => res.json(data[0].comments[0]))
    .catch((err) => {console.log(err)
        res.status(500).send("Internal Server Error")})
})

// Update
router.put("/exercise/:id/exComment/:commentId", (req,res) => {
    Exercise.findOneAndUpdate({
        _id: req.params.id,
        "comments._id": {_id: req.params.commentId},
    },
    {
        $set: {
            "comments.$.exerciseComment": req.body.exerciseComment
        }
    },
    {new:true}
    )
    .then((updatedComment) => res.json(updatedComment))
    .catch((err) => {console.log(err)
        res.status(500)
        .send("Internal Server Error")})
})

// Delete
router.delete("/exercise/:id/exComment/:commentId", (req,res) => {
    Exercise.findByIdAndUpdate(
        {
            _id:req.params.id,
        },
        {
            $pull: {
                comments: {_id: req.params.commentId}
            },
        },
        {new:true}
    )
    .then((deleteComment) => res.json(deleteComment))
    .catch((err) => {console.log(err)
        res.status(500)
        .send("Internal Server Error")})
})
module.exports = router