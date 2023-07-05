const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const cycleDurationSchema = new Schema({
    length: Number,
    frequency: [String], // Mon, Weds, Fri || Every 4th day
    // Maybe have "Assigning workouts to days" here
    // Maybe import a workout schema

})

const routineSchema = new Schema ({
    name: String,
    cycleDuration: [cycleDurationSchema]
})

const CycleDuration = mongoose.model("CycleDuration", cycleDurationSchema)
const Routine = mongoose.model("Routine", routineSchema)

module.exports = {CycleDuration, Routine}