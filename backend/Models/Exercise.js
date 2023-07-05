const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    exerciseComment: String
})

const exerciseSchema = new Schema ({
    name: String,
    musclesTrained: [String],
    comments: [commentSchema]
})

const Exercise = mongoose.model("Exercise", exerciseSchema)
const ExerciseComment = mongoose.model("ExerciseComment", commentSchema)

module.exports = {Exercise, ExerciseComment, exerciseSchema}