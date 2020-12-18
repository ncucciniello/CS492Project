import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

export const GET_WORKOUT = gql`
  query GetUserWorkouts($input: SearchWorkoutInput!) {
    userWorkouts(input: $input) {
      id
    }
  }
`

const WorkoutGraph = (props) => {
  const workout = getWorkoutData(props)
  const [chartData, setChartData] = useState({})

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

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  const chart = () => {
    setChartData({
      labels: getXarray(),
      datasets: [
        {
          label: 'Total Reps Assigned',
          data: getSetsAssigned(),
          backgroundColor: 'rgba(255,0,0,0.6)',
          borderWidth: 4,
        },
        {
          label: 'Total Reps Completed',
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
      <h1>Workout Progress</h1>
      <div>
        <Bar data={chartData} options={options} />
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
