const WorkoutGraph = (props) => {
  const workout = getWorkoutData(props)

  return (
    <div className="workoutGraph">
      <h3>Workout on: {workout.date.split('T', 1)[0]}</h3>
      {workout.exercises.map((exercise) => (
        <div key={exercise.id}>
          <h4>{exercise.ExerciseType.exerciseName}</h4>
          <p>Weight: {exercise.weight}</p>
          <p>Reps: {exercise.reps}</p>
          <p>Reps Completed: {exercise.actualReps}</p>
          <p>Sets: {exercise.numberOfSets}</p>
          <p>Sets Completed: {exercise.actualSets}</p>
        </div>
      ))}
    </div>
  )
}

const getWorkoutData = (props) => {
  // return props.data.traineeWorkouts.length
  //   ? props.data.traineeWorkouts[0]
  //   : props.data.userWorkouts[0]
  if (props.data.traineeWorkouts?.length != null) {
    return props.data.traineeWorkouts[0]
  } else {
    return props.data.userWorkouts[0]
  }
}
export default WorkoutGraph
