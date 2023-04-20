import "./styles.css";
import "./routineCreation.css";
import { Link } from "react-router-dom";
export default function RoutineCreation(props) {
  const {
    routine,
    handleCreateRoutine,
    newRoutine,
    handleNewRoutineStateChange,
    editRoutineName,
    handleRenamedRoutine,
    renamedRoutine,
    handleRenamedRoutineStateChange
  } = props;
  return (
    <>
    <div className="gridContainer">
      <div className="routineCreationHeaderContainer">
        <h2 className="routineCreationHeader">Routine Creation</h2>
      </div>

      <div className="createRoutineContainer">
      <div className="createRoutineFlex">
        <form onSubmit={handleCreateRoutine}>
          <input
          className="createRoutineInput"
            type="text"
            placeholder="New routine name..."
            value={newRoutine}
            onChange={handleNewRoutineStateChange}
          />

          <button 
          className="createRoutineButton"
          type="submit">Create Routine</button>
        </form>
        </div>
      </div>

      <div className="editRoutineContainer">
      <div className="editRoutineFlex">
        <form onSubmit={editRoutineName}>
          <select
          className="editRoutineDropdown"
          name="routine">
            {routine.map((routine, index) => (
              <option key={index} value={routine.routineName}>
                {routine.routineName}
              </option>
            ))}
          </select>
          
          <button 
          className="editRoutineButton"
          type="submit">Edit Routine Name</button>
        </form>
        </div>
      </div>

      <div className="renameRoutineContainer">
      <div className="renameRoutineFlex">
        <form onSubmit={handleRenamedRoutine}>
          <input
          className="renameRoutineInput"
            type="text"
            placeholder="Rename Routine..."
            value={renamedRoutine}
            onChange={handleRenamedRoutineStateChange}
          />
          <button 
          className="renameRoutineButton"
          type="submit">Rename Routine</button>
        </form>
        </div>
      </div>

      <div className="completeRoutineContainer">
      <button
      className="completeRoutineButton">
      <Link to="/CycleDuration">Complete Routine</Link>
      </button>
    </div>
    </div>
    </>
  );
}
