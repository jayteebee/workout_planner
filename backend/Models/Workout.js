const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    name: String,
    exercise: String,
    sets: Number,
    reps: Number,
    weight: Number
})