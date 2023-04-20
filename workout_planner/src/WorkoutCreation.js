import "./workoutCreation.css"
import { Link } from "react-router-dom";


export default function WorkoutCreation(props) {
  const { routine } = props;
  return (
    <>
      <div className="gridContainer">
        <div className="workoutCreationHeader">
          <h2 >Workout Creation</h2>
        </div>

        <div className="routine_workout_creation">
        <div className="routineWorkoutCreationFlex">
  
        <h3>Routine Selection</h3>
          <select
          className="routineSelectionDropDown"
            name="routineToEditDropDown"
          >
            {routine.map((routine, index) => (
              <option
              key={index} value={index}>
                {routine.routineName}
              </option>
            ))}
          </select>
          </div>
        </div>


        <div className="workoutModules">
          <div className="workout_module">
            <p>Workout Name </p>
            <button>
            <Link to="/ExerciseCreation"> Edit Workout - Push </Link>
            </button>
          </div>

          <div className="workout_module">
            <p>Workout Name - Pull</p>
            <button>
            <Link to="/ExerciseCreation"> Edit Workout - Pull </Link>

            </button>
          </div>
        </div>
      </div>
    </>
  );
}
