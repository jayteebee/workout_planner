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
  const [routine, setRoutine] = useState([]);

  // Data supplied by Routine Creation Page Form - input value
  // modified by handleCreateRoutine
  const [newRoutine, setNewRoutine] = useState("");

  const [routineNameToEdit, setRoutineNameToEdit] = useState("");

  const [renamedRoutine, setRenamedRoutine] = useState("");
  // Cycle Duration State
  // this will store the users chosen duration
  const [cycleDuration, setCycleDuration] = useState(null);

  // this will take the user input value from the checkbox
  // const [newCycleDuration, setNewCycleDuration] = useState("");

  const [checked, setChecked] = useState(null);

  const [frequency, setFrequency] = useState({
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

  const [userChosenDays, setUserChosenDays] = useState([]);

  const [customWorkoutName, setCustomWorkoutName] = useState("");

  const [exerciseSets, setExerciseSets] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const [exerciseReps, setExerciseReps] = useState([
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

  const [exerciseWeight, setExerciseWeight] = useState([
    //STATE 10
    "2.5kg",
    "5kg",
    "7.5kg",
    "10kg"
  ]);

  const [
    //STATE 11
    completedOneExerciseCreation,
    setCompletedOneExerciseCreation
  ] = useState([]);
  // {
  //   exercise: null,
  //   sets: null,
  //   reps: null,
  //   weight: null
  // }

  const [exerciseModule, setExerciseModule] = useState([]); //STATE 12

  // exercises hold all data from api. data from new omponent
  const [exercises, setExercises] = useState(Data); //STATE 13
  // holds exercises filtered based on user input
  const [filteredExercises, setFilteredExercises] = useState([]); //STATE 14
  // holds value of the input field to choose exercise
  const [inputValue, setInputValue] = useState(""); //STATE 15
  // determines whether to show drop down in exercise selection
  const [showDropdown, setShowDropdown] = useState(false); //STATE 16

  // deleting exercise checkboxes
  const [deletingCheck, setDeletingCheck] = useState(null);

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

  const handleFrequencyCheckboxStateChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    // copy the frequency state
    const updatedFrequency = { ...frequency };
    // invoke map on the array within freq. state
    updatedFrequency.userChosenFrequency = updatedFrequency.userChosenFrequency.map(
      // day reps each day object within freq. array...
      (day) => {
        // get the key(day) names from each day object, assign to dayName var
        const dayName = Object.keys(day)[0];
        // does the key equal the value of the check box?
        if (dayName === value) {
          // if yes, make dayName var(key - day) equal checked(Y/N),
          // this updates the userChosenfrequency bool to true
          return { [dayName]: isChecked };
        }
        // if no match, returns OG day object
        return day;
      }
    );
    setFrequency(updatedFrequency);
    setUserChosenDays([...userChosenDays, { [value]: "" }]);
  };

  // Assigning workouts to days
  // Updating the userChosenDays state to custom value

  // triggered when user input is changed
  const handleCustomWorkoutName = (e, index) => {
    const updatedUserChosenDays = [...userChosenDays];
    updatedUserChosenDays[index].workoutName = e.target.value;
    setUserChosenDays(updatedUserChosenDays);
    setCustomWorkoutName(e.target.value);
  };

  // Triggered when Name Workout button is pressed
  const updateUserChosenDaysState = (e, index) => {
    e.preventDefault();
    const updatedUserChosenDays = [...userChosenDays];
    updatedUserChosenDays[index].workoutName = customWorkoutName;
    setUserChosenDays(updatedUserChosenDays);
    setCustomWorkoutName("");
  };

  // updates inputValue state with user input.
  function handleInputChange(e) {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  }

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

  const createWorkoutModule = (e) => {
    let newExerciseModule = [...exerciseModule];
    newExerciseModule = completedOneExerciseCreation;
    setExerciseModule(newExerciseModule);
  };

  const deleteExercise = (index) => {
    const deletingExerciseModule = [...exerciseModule];
    deletingExerciseModule.splice(index, 1);
    setExerciseModule(deletingExerciseModule);
    console.log(exerciseModule);
  };

  const deleteAllExercises = () => {
    let deletingAllExerciseModules = [...exerciseModule];
    deletingAllExerciseModules = [];
    setExerciseModule(deletingAllExerciseModules);
  };

  // filter the exercises to only keep deletecheck: true exercises
  // fire that into the exerciseModule state
  // this is the part that actually deletes the items
  const deletingSelectedExercises = () => {
    const selectedExercisesToDelete = exerciseModule.filter(
      (exercise) => !exercise.deleteCheck
    );
    setExerciseModule(selectedExercisesToDelete);
  };

  // get the checked value from the input checkbox
  // update the selected exercise at the index of the exercise that the checkbox was ticked
  // so that it updates deleteCheck to the checkedValue, which is true
  const handleDeletingCheckboxes = (e, index) => {
    const checkedValue = e.target.checked;
    const updatedState = [...exerciseModule];
    updatedState[index] = { ...updatedState[index], deleteCheck: checkedValue };
    setExerciseModule(updatedState);
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
              customWorkoutName={customWorkoutName}
              handleCustomWorkoutName={handleCustomWorkoutName}
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
      {/* *** ROUTINE CREATION PAGE */}

      {/* CREATE ROUTINE SECTION */}
      {/* <h2>Routine Creation Page</h2>
      <form onSubmit={handleCreateRoutine}>
        <input
          type="text"
          placeholder="New routine name..."
          value={newRoutine}
          onChange={handleNewRoutineStateChange}
        />

        <button type="submit">Create Routine</button>
      </form>

      <div>
        <form onSubmit={editRoutineName}>
          <select name="routine">
            {routine.map((routine, index) => (
              <option key={index} value={routine.routineName}>
                {routine.routineName}
              </option>
            ))}
          </select>
          <button type="submit">Edit Routine Name</button>
        </form>
      </div>

      <form onSubmit={handleRenamedRoutine}>
        <input
          type="text"
          placeholder="Rename Routine..."
          value={renamedRoutine}
          onChange={handleRenamedRoutineStateChange}
        />

        <button type="submit">Rename Routine</button>
      </form> */}

      {/* CYCLE DURATION SECTION */}

      {/* <h3>Cycle Duration</h3>

      <div className="weekly_checkbox">
        <input
          onChange={handleNewCycleDurationStateChange}
          type="checkbox"
          id="durationCheckbox"
          name="weekly"
          value="weekly"
          checked={checked === "weekly"}
        />
        Weekly
      </div>

      <div className="ten_day_checkbox">
        <input
          onChange={handleNewCycleDurationStateChange}
          type="checkbox"
          id="durationCheckbox"
          name="tenDay"
          value="tenDay"
          checked={checked === "tenDay"}
        />{" "}
        10 Days
      </div>

      <div className="twelve_day_checkbox">
        <input
          onChange={handleNewCycleDurationStateChange}
          type="checkbox"
          id="durationCheckbox"
          name="twelveDay"
          value="twelveDay"
          checked={checked === "twelveDay"}
        />
        12 Days
      </div>

      <hr />

      <h3>Frequency</h3>

      <div className="weekly_frequency">
        <input
          onChange={handleFrequencyCheckboxStateChange}
          type="checkbox"
          id="frequencyCheckbox"
          name="monday"
          value="monday"
        />
        Mon
        <input
          onChange={handleFrequencyCheckboxStateChange}
          type="checkbox"
          id="frequencyCheckbox"
          name="tuesday"
          value="tuesday"
        />
        Tues
        <input
          onChange={handleFrequencyCheckboxStateChange}
          type="checkbox"
          id="frequencyCheckbox"
          name="wednesday"
          value="wednesday"
        />
        Weds
        <input
          onChange={handleFrequencyCheckboxStateChange}
          type="checkbox"
          id="frequencyCheckbox"
          name="thursday"
          value="thursday"
        />
        Thurs
        <input
          onChange={handleFrequencyCheckboxStateChange}
          type="checkbox"
          id="frequencyCheckbox"
          name="friday"
          value="friday"
        />
        Fri
        <input
          onChange={handleFrequencyCheckboxStateChange}
          type="checkbox"
          id="frequencyCheckbox"
          name="saturday"
          value="saturday"
        />
        Sat
        <input
          onChange={handleFrequencyCheckboxStateChange}
          type="checkbox"
          id="frequencyCheckbox"
          name="sunday"
          value="sunday"
        />
        Sun
      </div>
      <button>Confirm Days</button>
      <hr />

     

      <h3>Assigning Workouts to days</h3>

      <div>
        {userChosenDays.map((day, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Rename Workout.."
              value={customWorkoutName}
              onChange={(e) => handleCustomWorkoutName(e, index)}
            />
            <button onClick={(e) => updateUserChosenDaysState(e, index)}>
              Name Workout
            </button>
          </div>
        ))}
      </div>

      <hr /> */}

      {/* Not required for MVP - come back later */}
      {/* <div>
        {userChosenDays.map((customName, index) => (
          <div key={index}>
            <li>{userChosenDays.customName}</li>
          </div>
        ))}
      </div>
      <button> Create Workout </button> */}

      <hr />

      {/* I THINK I NEED TO PASS SHIT DOWN TO WORKOUT CREATION AS PROPS WHEN THE CREATE
WORKOUT BUTTON IS CLICKED, SO MAYBE CREATE NEW PAGE */}

      {/* *** WORKOUT CREATION PAGE*** */}
      {/* <h2>Workout Creation Page</h2>

      <div className="routine_workout_creation">
        <h3>Routine Selection</h3>
        <select
          className="routine_To_Edit_DropDown"
          name="routineToEditDropDown"
        >
           these value(s) need to autofill from the routine state, created
          in the Routine Creation Page 

          {routine.map((routine, index) => (
            <option key={index} value={index}>
              {routine.routineName}
            </option>
          ))}
        </select>
      </div>

      <hr />
       *** WORKOUT MODULES *** 

          These need to be dynamically rendered depending on the
           amount of workout names within userChosenDays 

      <div className="workout_module">
         this P content needs to take the value of the
        assigningWorkoutsToDays variable, in Routine Creation 

        <p>Workout Name </p>
         This button needs to be connected to a function that
        displays the exercise creation full screen pop up 
        <button>Edit Workout - Push</button>
      </div>

       SECOND WORKOUT MODULE
      <div className="workout_module">
        <p>Workout Name - Pull</p>
        <button>Edit Workout - Pull</button>
      </div> */}

      <hr />

      {/* *** EXERCISE CREATION POP UP */}
      {/*
      <div className="exercise_creation_pop_up">
        <form onSubmit={handleExerciseModuleCreationSubmit}>
          <h3>Exercise Creation Pop Up</h3>

          <div className="exercise_creation_module">
            order will be the index+1 of the state it's stored in
            <p>Order - 1</p>

            This needs to work with the API

            <div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <select name="exercise" onClick={exerciseSearch}>
                {filteredExercises.map((exercise, index) => (
                  <option key={index} value={exercise.name}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>

            Vertical Counter for Sets/Reps/Weight

            <div>
              <select className="sets" name="sets">
                {exerciseSets.map((sets, index) => (
                  <option key={index} value={sets}>
                    {sets}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select className="reps" name="reps">
                {exerciseReps.map((reps, index) => (
                  <option key={index} value={reps}>
                    {reps}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select className="weight" name="weight">
                {exerciseWeight.map((weight, index) => (
                  <option key={index} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit"> Finalise Exercise </button>
          <button onClick={createWorkoutModule}>Add Exercise To Workout</button>
        </form>
      </div>
      <hr />

      <div>
        <h3> Exercises so far... </h3>
        {exerciseModule.map((exercisePackage, index) => (
          <div key={index}>
            <ul className={exercisePackage.completeCheck ? "completed" : null}>
              <li>Exercise: {exercisePackage.exercise}</li>
              <li>
                Sets: {exercisePackage.sets}, Reps: {exercisePackage.reps}
              </li>
              <li>Weight: {exercisePackage.weight}</li>
            </ul>
            <button onClick={() => deleteExercise(index)}>
              Delete Exercise
            </button>
            <br />
            <input
              onChange={(e) => handleDeletingCheckboxes(e, index)}
              type="checkbox"
              id="deleteExerciseCheckbox"
              name={index}
              value={index}
              // set to false in exercise module VIA handleExerciseModuleCreationSubmit funk
              checked={exercisePackage.deleteCheck}
            />
            Select Exercise
            <br />
            <button onClick={() => editExercise(index)}>Edit Exercise</button>
            <br />
            <button onClick={() => completeExercise(index)}>
              Complete Exercise
            </button>
            <br />
          </div>
        ))}
      </div>
      <button onClick={deleteAllExercises}>Delete All</button>
      <button onClick={deletingSelectedExercises}>Delete Selected</button>

      <br />
      <button> Complete Push </button>
*/}

      <hr />
      {/* *** COMPLETE (ROUTINE NAME) BUTTON */}
      <div className="complete_routine">
        <button>Complete Routine</button>
      </div>
    </div>
  );
}
