import { useQuery } from '@redwoodjs/web'
import { Line } from 'react-chartjs-2'
import { useState } from 'react'

export const GET_PROGRESS = gql`
  query GetExerciseProgress($input: SearchProgressInput!) {
    exerciseProgress(input: $input) {
      id
      weight
      repsComplete
      setsComplete
      exerciseType {
        id
        name
      }
      workout {
        id
        userId
        date
      }
    }
  }
`

const ProgressGraph = (props) => {
  const { data } = useQuery(GET_PROGRESS, {
    variables: {
      input: {
        userId: props.userSelected,
        exerciseTypeId: props.selectedExerciseId,
      },
    },
    onCompleted: () => {
      chart()
    },
  })

  const hasProgress = data?.exerciseProgress?.length || false

  const [chartData, setChartData] = useState({})

  const getAllDates = () => {
    var xArray = []
    data?.exerciseProgress.map((exercise) => {
      xArray.push(exercise.workout.date.split('T', 1)[0])
    })
    return xArray
  }

  const getTotalReps = () => {
    var yArray = []

    data?.exerciseProgress.map(
      (exercise) => {
        if (exercise.repsComplete == 1) {
          yArray.push(Math.round(exercise.weight * 1))
        } else if (exercise.repsComplete == 2) {
          yArray.push(Math.round(exercise.weight * 1.03))
        } else if (exercise.repsComplete == 3) {
          yArray.push(Math.round(exercise.weight * 1.06))
        } else if (exercise.repsComplete == 4) {
          yArray.push(Math.round(exercise.weight * 1.08))
        } else if (exercise.repsComplete == 5) {
          yArray.push(Math.round(exercise.weight * 1.11))
        } else if (exercise.repsComplete == 6) {
          yArray.push(Math.round(exercise.weight * 1.14))
        } else if (exercise.repsComplete == 7) {
          yArray.push(Math.round(exercise.weight * 1.17))
        } else if (exercise.repsComplete == 8) {
          yArray.push(Math.round(exercise.weight * 1.19))
        } else if (exercise.repsComplete == 9) {
          yArray.push(Math.round(exercise.weight * 1.22))
        } else if (exercise.repsComplete == 10) {
          yArray.push(Math.round(exercise.weight * 1.25))
        } else if (exercise.repsComplete == 11) {
          yArray.push(Math.round(exercise.weight * 1.27))
        } else if (exercise.repsComplete == 12) {
          yArray.push(Math.round(exercise.weight * 1.29))
        } else if (exercise.repsComplete == 13) {
          yArray.push(Math.round(exercise.weight * 1.3))
        } else if (exercise.repsComplete == 14) {
          yArray.push(Math.round(exercise.weight * 1.32))
        } else if (exercise.repsComplete == 15) {
          yArray.push(Math.round(exercise.weight * 1.33))
        } else {
          yArray.push(exercise.weight * 1.5)
        }
      }

      // yArray.push(

      //   // exercise.repsComplete * exercise.setsComplete * exercise.weight
      //  )
      //yArray.push(exercise.repsComplete * exerciseProgress.workou)
    )
    return yArray
  }

  console.log(getAllDates())
  console.log(getTotalReps())
  console.log(
    'exerciseProgress',
    data?.exerciseProgress.map((ex) => ex.weight)
  )

  const chart = () => {
    setChartData({
      labels: getAllDates(),

      datasets: [
        {
          label: 'Calculated 1 Rep Max',
          data: getTotalReps(),
          //added code
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },

          //finished code
          //data: [5, 2, 0, 7, 5],
          backgroundColor: 'rgba(60,179,113,0.6',
          borderWidth: 4,
        },
      ],
    })
  }

  /* useEffect(() => {
    chart()
  }, [])
  */

  const displayProgress = () => {
    if (props.loading) {
      return <p>Loading...</p>
    }

    if (hasProgress) {
      return <Line data={chartData} />
    }

    return <p>There is no progress to display</p>
  }

  return <div className="exerciseProgressGraph">{displayProgress()}</div>
}

export default ProgressGraph
