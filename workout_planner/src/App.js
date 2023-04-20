import "./styles.css";
import Data from "./Data.json";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import RoutineCreation from "./RoutineCreation";
import CycleDuration from "./CycleDuration";
import WorkoutCreation from "./WorkoutCreation";
import ExerciseCreation from "./ExerciseCreation";
import Navigation from "./Navigation";


export default function App() {
  // ***** STATE MANAGEMENT *****

  // This holds the user supplied routine name
  // this will be supplied from the Routine Creation Page
  const [routine, setRoutine] = useState([]); // STATE 1

  // Data supplied by Routine Creation Page Form - input value
  // modified by handleCreateRoutine
  const [newRoutine, setNewRoutine] = useState(""); // STATE 2

  const [routineNameToEdit, setRoutineNameToEdit] = useState(""); // STATE 3

  const [renamedRoutine, setRenamedRoutine] = useState(""); // STATE 4
  // Cycle Duration State
  // this will store the users chosen duration
  const [cycleDuration, setCycleDuration] = useState(null); // STATE 5

  // this will take the user input value from the checkbox
  // const [newCycleDuration, setNewCycleDuration] = useState("");

  const [checked, setChecked] = useState(null); // STATE 6

  const [frequency, setFrequency] = useState({ // STATE 7
    userChosenFrequency: [
      { monday: false },
      { tuesday: false },
      { wednesday: false },
      { thursday: false },
      { friday: false },
      { saturday: false },
      { sunday: false }
    ]
  });

  const [userChosenDays, setUserChosenDays] = useState([]); // STATE 8

  // const [customWorkoutName, setCustomWorkoutName] = useState(""); // STATE 9

  const [exerciseSets, setExerciseSets] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]); // STATE 10

  const [exerciseReps, setExerciseReps] = useState([ // STATE 11
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ]);

  const [exerciseWeight, setExerciseWeight] = useState([ // STATE 12
  
    "2.5kg",
    "5kg",
    "7.5kg",
    "10kg"
  ]);

  const [ // STATE 13
    completedOneExerciseCreation,
    setCompletedOneExerciseCreation
  ] = useState([]);

  const [exerciseModule, setExerciseModule] = useState([]); //STATE 14

  // exercises hold all data from api. data from new omponent
  const [exercises, setExercises] = useState(Data); //STATE 15
  // holds exercises filtered based on user input
  const [filteredExercises, setFilteredExercises] = useState([]); //STATE 16
  // holds value of the input field to choose exercise
  const [inputValue, setInputValue] = useState(""); //STATE 17
  // determines whether to show drop down in exercise selection
  const [showDropdown, setShowDropdown] = useState(false); //STATE 18

  // deleting exercise checkboxes
  const [deletingCheck, setDeletingCheck] = useState(null); // STATE 19

  // ***** API API API *****

  const edbExerciseUrl = "https://exercisedb.p.rapidapi.com/exercises";

  function exerciseSearch() {
    // filters the exercise array data based on user input field
    // filter method is used to create a new array of exercises that include the user input
    // made compatible with case sensitivity
    // .includes simply checks the user input against the stored data

    const filteredExercises = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    // result saved to filteredExercises
    setFilteredExercises(filteredExercises);

    if (filteredExercises.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }

    // default state is empty array

    // C/O for API limit
    //   fetch(edbExerciseUrl, {
    //     method: "GET",
    //     headers: {
    //       "X-RapidAPI-Key": "b8fc303440msh833573d8d0d9838p1b219bjsn4077b0fe04f7"
    //     }
    //   })
    //     .then((response) => response.json())
    //     // here, we're giving the entire exercise list to the exercise state
    //     .then((data) => setExercises(data))
    //     .catch((error) => console.log(error));
    // }

    // function handleExerciseSelectionDropDown() {
    //   fetch(edbExerciseUrl)
    //     .then((response) => response.json())
    //     // here, we're giving the entire exercise list to the exercise state
    //     .then((data) => setExercise(data[0]))
    //     .catch((error) => console.log("hell naw", error));
    //
  }

  // ***** FUNCTIONS *****

  const handleNewRoutineStateChange = (e) => {
    setNewRoutine(e.target.value);
  };

  // Data supplied by Routine Creation Page Form
  const handleCreateRoutine = (e) => {
    e.preventDefault();
    setRoutine([...routine, { routineName: newRoutine }]);
    setNewRoutine("");
  };

  const editRoutineName = (e) => {
    e.preventDefault();
    const routineName = e.target.routine.value;
    setRoutineNameToEdit(routineName);
  };

  const handleRenamedRoutineStateChange = (e) => {
    setRenamedRoutine(e.target.value);
  };

  const handleRenamedRoutine = (e) => {
    e.preventDefault();
    setRoutine((routine) =>
      routine.map((r) => {
        if (r.routineName === routineNameToEdit) {
          return { routineName: renamedRoutine };
        }
        return r;
      })
    );
    setRoutineNameToEdit("");
    setRenamedRoutine("");

    // setRoutineNameToEdit(renamedRoutine);
    // setRoutine(renamedRoutine);
  };

  const handleNewCycleDurationStateChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setChecked(value);
      setCycleDuration([{ chosenCycleDuration: value }]);
    } else {
      setChecked(null);
      setCycleDuration(null);
    }
  };

// FED FROM: CycleDuration.js - "frequencyCheckboxContainer"
// PURPOSE: Updates Frequency state to store true value for day of week
// ALSO: Removes relevant days from State 8 if unchecked.
  const handleFrequencyCheckboxStateChange = (e, index, name) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const updatedFrequency = { ...frequency };
    updatedFrequency.userChosenFrequency = updatedFrequency.userChosenFrequency.map(
      (day) => {
// Assigns monday through sunday keys as seperate strings
        const dayName = Object.keys(day)[0];
// this aligns the checkbox that has been ticked with the equivalent day in the object
        if (dayName === value) {
          // this updates the userChosenfrequency bool to true
          // take dayName(each key) and assign isChecked
          return { [dayName]: isChecked };
        }
        // if no match, returns OG day object
        return day;
      }
    );
    setFrequency(updatedFrequency);
    
    if (isChecked) {
      setUserChosenDays([...userChosenDays, { [value]: ""}]);
    }  
    else {
      const updatedUserChosenDays = userChosenDays.filter((day) => {
        const dayName = Object.keys(day)[0];
        return dayName !==value;
      });
      setUserChosenDays(updatedUserChosenDays)
    }
  };

  // FED FROM: CycleDuration.js - "renameWorkoutInput". onChange.
  // PURPOSE: Assign custom workout name to userChosenDays, State 8
  // const handleCustomWorkoutName = (e, index) => {
    // const updatedUserChosenDays = [...userChosenDays];
    // creating workoutName key, assigning it value of user input
    // updatedUserChosenDays[index].workoutName = e.target.value;
    // setUserChosenDays(updatedUserChosenDays);
    // setCustomWorkoutName(e.target.value);
  // };

  // Triggered when Name Workout button is pressed
  const updateUserChosenDaysState = (index,customWorkoutName ) => {
    // e.preventDefault();
    const updatedUserChosenDays = [...userChosenDays];
    updatedUserChosenDays[index].workoutName = customWorkoutName;
    setUserChosenDays(updatedUserChosenDays);
    // setCustomWorkoutName("");
  };

  // updates inputValue state with user input.
  function handleInputChange(e) {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  }

// PURPOSE: Bring user generated exercise into state 13: completedOneExerciseCreation
// FED FROM: ExerciseCreation.JS - FORM - onSubmit
  const handleExerciseModuleCreationSubmit = (e) => {
    e.preventDefault();
    const exercise = e.target.elements.exercise.value;
    const sets = parseInt(e.target.elements.sets.value);
    const reps = parseInt(e.target.elements.reps.value);
    const weight = e.target.elements.weight.value;

    const newExerciseCreationCompleted = {
      exercise: exercise,
      sets: sets,
      reps: reps,
      weight: weight,
      deleteCheck: false,
      completeCheck: false
    };

    const newCompletedOneExerciseCreation = [
      ...completedOneExerciseCreation,
      newExerciseCreationCompleted
    ];
    setCompletedOneExerciseCreation(newCompletedOneExerciseCreation);
  };

// FED FROM: ExerciseCreation.js - FORM - "AddExerciseButton"
// PURPOSE: Assigning user created exercise to state 14
// Sets up rendering to UI
  const createWorkoutModule = (e) => {
    let newExerciseModule = [...exerciseModule];
    newExerciseModule = completedOneExerciseCreation;
    setExerciseModule(newExerciseModule);
  };

// PURPOSE: Deletes single exercise from State 13 & 14
// FED FROM: ExerciseCreation.js - "exercisesSoFarContainer"
  const deleteExercise = (index) => {
    const deletingExerciseModule = [...exerciseModule];
    deletingExerciseModule.splice(index, 1);
    setExerciseModule(deletingExerciseModule);
    const deletingSingleCompletedOneExerciseCreation = [...completedOneExerciseCreation];
    deletingSingleCompletedOneExerciseCreation.splice(index,1);
    setCompletedOneExerciseCreation(deletingSingleCompletedOneExerciseCreation)
  };

  // PURPOSE: Deletes all exercises from State 13 & 14
  // FED FROM: ExerciseCreation.js - "buttonContainers"
  const deleteAllExercises = () => {
    let deletingAllExerciseModules = [...exerciseModule];
    deletingAllExerciseModules = [];
    setExerciseModule(deletingAllExerciseModules);
    let deletingAllCompletedOneExerciseCreation = [...completedOneExerciseCreation];
    deletingAllCompletedOneExerciseCreation = []
    setCompletedOneExerciseCreation(deletingAllCompletedOneExerciseCreation)
  };

  // FED FROM: ExerciseCreation.js - "exercisesSoFarContainer"
  // PURPOSE: Update the deleteCheck based on user click: 
  // Sets up "deletingSelectedExercises" function.
  const handleDeletingCheckboxes = (e, index) => {
    const checkedValue = e.target.checked;
    const updatedState = [...exerciseModule];
    updatedState[index] = { ...updatedState[index], deleteCheck: checkedValue };
    setExerciseModule(updatedState);
    const updatedSecondState = [...completedOneExerciseCreation];
    updatedSecondState[index] = {...updatedSecondState[index], deleteCheck: checkedValue};
    setCompletedOneExerciseCreation(updatedSecondState);
  };


  // FED FROM: ExerciseCreation.js - "buttonContainers"
  // PURPOSE: Delete selected exercises from state 13 & 14.
  // WALKTHROUGH: Filter to keep only deleteCheck: true exercises (default value: false)
  const deletingSelectedExercises = () => {
    const selectedExerciseModulesToDelete = exerciseModule.filter(
      (exercise) => !exercise.deleteCheck
    );
    setExerciseModule(selectedExerciseModulesToDelete);
    const selectedCompletedOneExerciseCreationToDelete = completedOneExerciseCreation.filter(
      (exercises) => !exercises.deleteCheck
    );
    setCompletedOneExerciseCreation(selectedCompletedOneExerciseCreationToDelete);
  };

  //after the user has made their edits this funk will finalise and push to exerciseModule
  const finaliseEditedExercise = (index) => {
    // const exerciseToFinalise = [...exerciseModule];
    // exerciseToFinalise[index] = null;
  };

  const editExercise = (index) => {
    // show the exercisePackage info but for the specific index
    // exerciseModule.map((editExercisePackage, index) => {
    // const existingExerciseToEdit = {
    //   exercise: editExercisePackage.exercise,
    //   sets: editExercisePackage.sets,
    //   reps: editExercisePackage.reps,
    //   weight: editExercisePackage.weight,
    //   deleteCheck: false
    // }});
  };

  const completeExercise = (index) => {
    const completedExerciseModule = [...exerciseModule];
    completedExerciseModule[index].completeCheck = !completedExerciseModule[
      index
    ].completeCheck;
    setExerciseModule(completedExerciseModule);
  };

  return (
    <div className="App">
      {/* *** NAV BAR *** NAV BAR *** NAV BAR *** */}
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <RoutineCreation
              routine={routine}
              handleCreateRoutine={handleCreateRoutine}
              newRoutine={newRoutine}
              handleNewRoutineStateChange={handleNewRoutineStateChange}
              editRoutineName={editRoutineName}
              handleRenamedRoutine={handleRenamedRoutine}
              renamedRoutine={renamedRoutine}
              handleRenamedRoutineStateChange={handleRenamedRoutineStateChange}
            />
          }
        />

        <Route
          path="CycleDuration"
          element={
            <CycleDuration
              handleNewCycleDurationStateChange={
                handleNewCycleDurationStateChange
              }
              checked={checked}
              handleFrequencyCheckboxStateChange={
                handleFrequencyCheckboxStateChange
              }
              userChosenDays={userChosenDays}
              // customWorkoutName={customWorkoutName}
              // handleCustomWorkoutName={handleCustomWorkoutName}
              updateUserChosenDaysState={updateUserChosenDaysState}
            />
          }
        />

        <Route
          path="WorkoutCreation"
          element={<WorkoutCreation routine={routine} />}
        />

        <Route
          path="ExerciseCreation"
          element={
            <ExerciseCreation
              handleExerciseModuleCreationSubmit={
                handleExerciseModuleCreationSubmit
              }
              inputValue={inputValue}
              handleInputChange={handleInputChange}
              exerciseSearch={exerciseSearch}
              filteredExercises={filteredExercises}
              exerciseSets={exerciseSets}
              exerciseReps={exerciseReps}
              exerciseWeight={exerciseWeight}
              createWorkoutModule={createWorkoutModule}
              exerciseModule={exerciseModule}
              deleteExercise={deleteExercise}
              handleDeletingCheckboxes={handleDeletingCheckboxes}
              editExercise={editExercise}
              completeExercise={completeExercise}
              deleteAllExercises={deleteAllExercises}
              deletingSelectedExercises={deletingSelectedExercises}
            />
          }
        />
      </Routes>
    </div>
  );
}
