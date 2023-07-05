const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const {exerciseSchema} = require("./Exercise")

const exerciseModuleSchema = new Schema ({
    exercise: [{exerciseSchema}],
    sets: Number,
    reps: Number,
    weight: String
})

const ExerciseModule = mongoose.model("ExerciseModule", exerciseModuleSchema)

module.exports = {ExerciseModule}