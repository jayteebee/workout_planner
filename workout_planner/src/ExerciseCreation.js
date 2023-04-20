import "./exerciseCreation.css"
import { Link } from "react-router-dom";


export default function ExerciseCreation(props) {
  const {
    handleExerciseModuleCreationSubmit,
    inputValue,
    handleInputChange,
    exerciseSearch,
    filteredExercises,
    exerciseSets,
    exerciseReps,
    exerciseWeight,
    createWorkoutModule,
    exerciseModule,
    deleteExercise,
    handleDeletingCheckboxes,
    editExercise,
    completeExercise,
    deleteAllExercises,
    deletingSelectedExercises
  } = props;
  return (
    <>
      <div className="gridContainer">
        <h3 className="exerciseCreationHeader" >Exercise Creation</h3>
        <div className="exerciseCreation">

          <div className="exerciseCreationFlex">
            <form onSubmit={handleExerciseModuleCreationSubmit}>


              <div className="exercise_creation_module">
                {/* order will be the index+1 of the state it's stored in */}
                <p>Order - 1</p>

                {/* This needs to work with the API */}

                <div>
                  <input
                    className="exerciseSearchInput"
                    type="text"
                    placeholder="Search Exercise List"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <select
                    className="exersiceSearchDropDown"
                    name="exercise" onClick={exerciseSearch}>
                    {filteredExercises.map((exercise, index) => (
                      <option key={index} value={exercise.name}>
                        {exercise.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Vertical Counter for Sets/Reps/Weight */}

                <div>
                  <select

                    className="sets" name="sets">
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

              <button
                className="finaliseExerciseButton"
                type="submit"> Finalise Exercise </button>
              
            </form>
            <button
                className="AddExerciseButton"
                onClick={createWorkoutModule}>Add Exercise To Workout</button>
          </div>
        </div>


        <div className="exercisesSoFarContainer" >
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
        <div className="buttonContainers">
          <button onClick={deleteAllExercises}>Delete All</button>
          <button onClick={deletingSelectedExercises}>Delete Selected</button>
          <button> Complete Push </button>
        </div>
      </div>
    </>
  );
}
