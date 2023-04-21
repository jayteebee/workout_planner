import { Link } from "react-router-dom";
import "./styles.css";
export default function Navigation() {
  return (
    <>
      <nav>
        <Link to="/"> Routine Creation </Link>
        <Link to="/CycleDuration"> Cycle Duration </Link>
        <Link to="/WorkoutCreation"> Workout Creation </Link>
        <Link to="/ExerciseCreation"> Exercise Creation </Link>
      </nav>
    </>
  );
}
