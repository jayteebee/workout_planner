import { useState } from "react"

export default function NamingWorkout(props) {
const {updateUserChosenDaysState, index} = props
const [customWorkoutName, setCustomWorkoutName] = useState("")

const handleCustomWorkoutName = (e) => {
    setCustomWorkoutName(e.target.value)
}

const handleButtonOnClick = () => {
    updateUserChosenDaysState(index, customWorkoutName)
    setCustomWorkoutName("")
}
    return <div>
        <input
            className="renameWorkoutInput"
            type="text"
            value={customWorkoutName}
            placeholder="Rename Workout.."
            onChange={(e) => handleCustomWorkoutName(e)}
        />
        <button
            className="nameWorkoutButton"
            onClick={handleButtonOnClick}>
            Name Workout
        </button>
    </div>

}