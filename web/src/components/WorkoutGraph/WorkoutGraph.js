import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

const WorkoutGraph = (props) => {
  const workout = props.data.userWorkouts[0]

  const getXarray = () => {
    var xArray = []
    workout.exercises.map((ex) => xArray.push(ex.exerciseType.name))
    return xArray
  }

  const getSetsAssigned = () => {
    var setsAssigned = []
    workout.exercises.map((ex) =>
      setsAssigned.push(ex.setsAssigned * ex.repsAssigned)
    )
    return setsAssigned
  }

  const getSetsHit = () => {
    var setsHit = []
    workout.exercises.map((ex) =>
      setsHit.push(ex.setsComplete * ex.repsComplete)
    )
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
      <h1>Workout Progress</h1>
      <div>
        <Bar data={chartData} />
      </div>
    </div>
  )
}

export default WorkoutGraph
