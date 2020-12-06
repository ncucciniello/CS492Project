import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

const WorkoutGraph = (props) => {
  const workout = getWorkoutData(props)

  const getXarray = () => {
    var xArray = []
    workout.exercises.map((ex) => xArray.push(ex.ExerciseType.exerciseName))
    return xArray
  }

  const getSetsAssigned = () => {
    var setsAssigned = []
    workout.exercises.map((ex) => setsAssigned.push(ex.numberOfSets * ex.reps))
    return setsAssigned
  }

  const getSetsHit = () => {
    var setsHit = []
    workout.exercises.map((ex) => setsHit.push(ex.actualSets * ex.actualReps))
    return setsHit
  }

  const [chartData, setChartData] = useState({})

  const chart = () => {
    setChartData({
      labels: getXarray(),
      datasets: [
        {
          label: 'Sets Assigned',
          data: getSetsAssigned(),
          backgroundColor: 'rgba(255,0,0,0.6)',
          borderWidth: 4,
        },
        {
          label: 'Sets Hit',
          data: getSetsHit(),
          backgroundColor: 'rgba(60,179,113,0.6',
          borderWidth: 4,
        },
      ],
    })
  }
  useEffect(() => {
    chart()
  }, [])

  return (
    <div className="workoutGraph">
      {/* <h3>Workout on: {workout.date.split('T', 1)[0]}</h3>
      {workout.exercises.map((exercise) => (
        <div key={exercise.id}>
          <h4>{exercise.ExerciseType.exerciseName}</h4>
          <p>Weight: {exercise.weight}</p>
          <p>Reps: {exercise.reps}</p>
          <p>Reps Completed: {exercise.actualReps}</p>
          <p>Sets: {exercise.numberOfSets}</p>
          <p>Sets Completed: {exercise.actualSets}</p>
        </div>
      ))} */}
      <h1>Workout Progress</h1>
      <div>
        <Bar data={chartData} />
      </div>
    </div>
  )
}

const getWorkoutData = (props) => {
  if (props.data.traineeWorkouts?.length != null) {
    return props.data.traineeWorkouts[0]
  } else {
    return props.data.userWorkouts[0]
  }
}
export default WorkoutGraph
