const WorkoutGraph = (props) => {
  const workout = props.data.userWorkouts[0]

  return (
    <div className="workoutGraph">
      <h3>Workout on: {workout.date.split('T', 1)[0]}</h3>
      {workout.exercises.map((exercise) => (
        <div key={exercise.id}>
          <h4>{exercise.exerciseType.name}</h4>
          <p>Weight: {exercise.weight}</p>
          <p>Reps: {exercise.repsAssigned}</p>
          <p>Sets: {exercise.setsAssigned}</p>
        </div>
      ))}
    </div>
  )
}

export default WorkoutGraph
