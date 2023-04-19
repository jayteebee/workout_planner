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
        <h2>Routine Creation Page</h2>
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
        </form>
      </>
    );
  }
  