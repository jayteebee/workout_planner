// Dependencies
const express = require("express");
const mongoose = require("mongoose")
const dbConfig = require("./Configuration/db")
const db = mongoose.connection
const ExerciseRoutes = require("./Routes/ExerciseRoutes")
const ExerciseCommentsRoutes = require("./Routes/ExerciseCommentsRoutes")

// Configuration
const app = express()
const port = process.env.PORT || 5002

// Connect to mongoDB
mongoose.connect(dbConfig)
db.on('error',        (error) => console.log(`ERROR: ${error.message}`))
db.on('connected',    () => console.log(`MongoDB Connected: ${dbConfig}`))
db.on('disconnected', () => console.log('MongoDB Disconnected'))

// Middleware
app.use(express.json())

// Routes
app.use(ExerciseRoutes)
app.use(ExerciseCommentsRoutes)

app.listen(port,() => console.log(`Server started on port ${port}`))