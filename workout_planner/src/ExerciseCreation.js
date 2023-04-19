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
        <div className="exercise_creation_pop_up">
          <form onSubmit={handleExerciseModuleCreationSubmit}>
            <h3>Exercise Creation Pop Up</h3>
  
            <div className="exercise_creation_module">
              {/* order will be the index+1 of the state it's stored in */}
              <p>Order - 1</p>
  
              {/* This needs to work with the API */}
  
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
  
              {/* Vertical Counter for Sets/Reps/Weight */}
  
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
      </>
    );
  }
  