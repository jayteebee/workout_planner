export default function CycleDuration(props) {
    const {
      handleNewCycleDurationStateChange,
      checked,
      handleFrequencyCheckboxStateChange,
      userChosenDays,
      customWorkoutName,
      handleCustomWorkoutName,
      updateUserChosenDaysState
    } = props;
    return (
      <>
        <h3>Cycle Duration</h3>
  
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
  
        {/* Assigning Workouts To Days */}
  
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
  
        <hr />
      </>
    );
  }
  