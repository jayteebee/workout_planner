const express = require("express")
const {Exercise} = require("../Models/Exercise")
const router = express.Router()

// Index 
router.get("/exercise", (req,res) => {
    Exercise.find({})
    .then((exercise) => {res.json(exercise)})
    .catch((err) => {console.log(err)
    res.status(500)
    .send("Internal Server Error")})
})

// Create
router.post("/exercise", (req,res) => {
    Exercise.create(req.body)
    .then((createdExercise) => res.json(createdExercise))
    .catch((err) => {console.log(err)
    res.status(500).send("Internal Server Error")})
})

// Read
router.get("/exercise/:id", (req,res) => {
    Exercise.findById(req.params.id)
    .then((exerciseByID) => res.json(exerciseByID))
    .catch((err) => {console.log(err)
    res.status(500).send("Internal Server Error")})
})

// Update
router.put("/exercise/:id", (req,res) => {
    Exercise.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then((updateByID) => res.json(updateByID))
    .catch((err) => {console.log(err)
    res.status(500).send("Internal Server Error")})
})

// Delete
router.delete("/exercise/:id", (req,res) => {
    Exercise.findByIdAndRemove(req.params.id)
    .then((deleteByID) => res.json(deleteByID))
    .catch((err) => {console.log(err)
    res.status(500).send("Internal Server Error")})
})

module.exports = router