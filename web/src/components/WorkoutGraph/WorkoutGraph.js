import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

const WorkoutGraph = (props) => {
  const workout = props.data.userWorkouts[0]

  //const Xaxis = () => {
  var x_array = []
  for (var x = 0; x < workout.exercises.length; x++) {
    x_array.push(workout.exercises[x].exerciseType.name)
  }

  var setsAssigned = []
  for (var y = 0; y < workout.exercises.length; y++) {
    setsAssigned.push(
      workout.exercises[y].setsAssigned * workout.exercises[y].repsAssigned
    )
  }

  var setsHit = []
  for (var z = 0; z < workout.exercises.length; z++) {
    setsHit.push(
      workout.exercises[z].setsComplete * workout.exercises[z].repsComplete
    )
  }

  //console.log(workout.exercises.setsAssigned)

  const [chartData, setChartData] = useState({})

  const chart = () => {
    setChartData({
      labels: x_array,
      datasets: [
        {
          label: 'Sets Assigned',
          data: setsAssigned,
          backgroundColor: 'rgba(255,0,0,0.6)',
          //backgroundColor: ['rgba(75,192,192,0.6'],
          borderWidth: 4,
        },
        {
          label: 'Sets Hit',
          data: setsHit,
          //workout.exercises.setsAssigned * workout.exercises.repsAssigned,
          //  workout.exercises[0].setsComplete *
          //   workout.exercises[0].repsComplete,
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
    // <div className="workoutGraph">
    //   <h3>Workout on: {workout.date.split('T', 1)[0]}</h3>
    //   {workout.exercises.map((exercise) => (
    //     <div key={exercise.id}>
    //       <h4>{exercise.exerciseType.name}</h4>
    //       <p>Weight: {exercise.weight}</p>
    //       <p>Reps: {exercise.repsAssigned}</p>
    //       <p>Sets: {exercise.setsAssigned}</p>
    //     </div>
    //   ))}
    // </div>
    <div className="workoutGraph">
      <h1>Progression Chart</h1>
      <div>
        <Bar data={chartData} />
      </div>
    </div>
  )
}

export default WorkoutGraph
