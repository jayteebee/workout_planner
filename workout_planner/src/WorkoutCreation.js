export default function WorkoutCreation(props) {
    const { routine } = props;
    return (
      <>
        <h2>Workout Creation Page</h2>
  
        <div className="routine_workout_creation">
          <h3>Routine Selection</h3>
          <select
            className="routine_To_Edit_DropDown"
            name="routineToEditDropDown"
          >
            {routine.map((routine, index) => (
              <option key={index} value={index}>
                {routine.routineName}
              </option>
            ))}
          </select>
        </div>
  
        <hr />
  
        <div className="workout_module">
          <p>Workout Name </p>
          <button>Edit Workout - Push</button>
        </div>
  
        <div className="workout_module">
          <p>Workout Name - Pull</p>
          <button>Edit Workout - Pull</button>
        </div>
      </>
    );
  }
  