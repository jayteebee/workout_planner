import { Link } from "react-router-dom";
import "./cycleDuration.css";
import NamingWorkout from "./NamingWorkout";

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
      <div className="gridContainer">
<div className="cycleDurationHeaderContainer">
        <h3 className="cycleDurationHeader" >Cycle Duration</h3>
</div>
        <div className="durationCheckboxContainers">
          <div className="durationCheckboxFlex">
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
          </div>
        </div>

        <div className="frequencyCheckboxContainer">
          <h3 className="frequencyHeader" >Frequency</h3>
          <div className="frequencyCheckboxFlex">
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

          </div>
        </div>

        {/* Assigning Workouts To Days */}
        <div className="assigningWorkoutsContainer">
          <h3 className="assigningWTDHeader" >Assigning Workouts to days</h3>

          <div>
            <div className="assigningWorkoutsFlex">
              {userChosenDays.map((day, index) => 
                <NamingWorkout 
                updateUserChosenDaysState={updateUserChosenDaysState}
                index={index}
                key={index}
                
                />
  )}
            </div>
          </div>
        </div>
        <div className="confirmDaysButtonContainer">
        <button className="confirmDaysButton" >
        <Link to="/WorkoutCreation"> Workout Creation </Link>
        </button>
        </div>
        </div>
    </>
  );
}
