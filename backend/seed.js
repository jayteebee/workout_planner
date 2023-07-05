const mongoose = require("mongoose");
const { Exercise } = require("./Models/Exercise")
const dbConfig = require("./Configuration/db")

mongoose.connect(dbConfig)
    .then(() => {
        console.log("DB Connected - Seed")
        mongoose.connection.db.dropDatabase()
            .then(() => {
                console.log("dbDropped - Seed")
                Exercise.create([
                    {
                        name: "Barbell Bench Press",
                        musclesTrained: ["Chest", "Front Delts", "Triceps"]
                    },
                    {
                        name: "Incline Dumbbell Press",
                        musclesTrained: ["Chest", "Front Delts", "Triceps"]
                    },
                    {
                        name: "Cable Crossover",
                        musclesTrained: ["Chest", "Front Delts", "Biceps"]
                    },
                    {
                        name: "Dips - Chest Version",
                        musclesTrained: ["Chest", "Front Delts", "Triceps"]
                    },
                    {
                        name: "Standing Military Press",
                        musclesTrained: ["Front Delts", "Side Delts", "Triceps", "Upper Chest"]
                    },
                    {
                        name: "Lateral Raise",
                        musclesTrained: ["Side Delts", "Front Delts", "Traps"]
                    },
                    {
                        name: "Seated Barbell Overhead Press",
                        musclesTrained: ["Front Delts", "Side Delts", "Triceps", "Upper Chest"]
                    },
                    {
                        name: "Face Pull",
                        musclesTrained: ["Rear Delts", "Side Delts", "Traps"]
                    },
                    {
                        name: "Seated Dumbbell Press",
                        musclesTrained: ["Front Delts", "Side Delts", "Triceps"]
                    },
                    {
                        name: "Pull Ups",
                        musclesTrained: ["Lats", "Biceps", "Forearms"]
                    },
                    {
                        name: "Chin Ups",
                        musclesTrained: ["Lats", "Biceps", "Middle Traps"]
                    },
                    {
                        name: "Pull Downs - Pronated",
                        musclesTrained: ["Lats", "Biceps", "Middle Traps"]
                    },
                    {
                        name: "Pull Downs - Supernated ",
                        musclesTrained: ["Lats", "Biceps", "Middle Traps"]
                    },
                    {
                        name: "Bent Over Row",
                        musclesTrained: ["Lats", "Traps", "Rear Delts", "Biceps"]
                    },
                    {
                        name: "Pendlay Row",
                        musclesTrained: ["Lats", "Traps", "Rear Delts", "Biceps"]
                    },
                    {
                        name: "Seated Cable Row",
                        musclesTrained: ["Lats", "Middle Traps", "Rear Delts", "Biceps"]
                    },
                    {
                        name: "Deadlift",
                        musclesTrained: ["Lats", "Traps", "Rear Delts", "Biceps", "Hamstrings", "Quads", "Forearms"]
                    },
                    {
                        name: "Hanging Leg Raise",
                        musclesTrained: ["Abs", "Hip Flexors"]
                    },
                    {
                        name: "Plank",
                        musclesTrained: ["Abs", "Lower Back", "Glutes"]
                    },
                    {
                        name: "Bicycle Crunches",
                        musclesTrained: ["Abs", "Obliques", "Hip Flexors"]
                    },
                    {
                        name: "Russian Twist",
                        musclesTrained: ["Abs", "Obliques"]
                    },
                    {
                        name: "Squat",
                        musclesTrained: ["Quads", "Glutes", "Hamstrings", "Lower Back"]
                    },
                    {
                        name: "Leg Press",
                        musclesTrained: ["Quads", "Glutes", "Hamstrings"]
                    },
                    {
                        name: "Lunges",
                        musclesTrained: ["Quads", "Glutes", "Hamstrings"]
                    },
                    {
                        name: "Leg Extension",
                        musclesTrained: ["Quads"]
                    },
                    {
                        name: "Hip Thrust",
                        musclesTrained: ["Quads", "Glutes", "Hamstrings", "Lower Back"]
                    },
                    {
                        name: "Romanian Deadlift",
                        musclesTrained: ["Hamstrings", "Glutes", "Lower Back"]
                    },
                    {
                        name: "Lying Leg Curl",
                        musclesTrained: ["Hamstrings"]
                    },
                    {
                        name: "Seated Leg Curl",
                        musclesTrained: ["Hamstrings"]
                    }, {
                        name: "Standing Calf Raise",
                        musclesTrained: ["Calves"]
                    },
                    {
                        name: "Seated Calf Raise",
                        musclesTrained: ["Calves"]
                    },
                ])
                    .then((exerciseSeed) => console.log("Exercise DB Seed Complete"))
                    .catch((err) => {
                        console.log(err)
                        console.log("Internal Server Error - Seed")
                    })
            })
            .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))