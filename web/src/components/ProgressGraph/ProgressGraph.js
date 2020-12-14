import { useQuery } from '@redwoodjs/web'
import { Line } from 'react-chartjs-2'
import { useState } from 'react'

export const GET_PROGRESS = gql`
  query GetExerciseProgress($input: SearchProgressInput!) {
    exerciseProgress(input: $input) {
      id
      weight
      actualReps
      actualSets
      ExerciseType {
        id
        exerciseName
      }
      workout {
        id
        relationshipId
        date
      }
    }
  }
`

const ProgressGraph = (props) => {
  const { data } = useQuery(GET_PROGRESS, {
    variables: {
      input: {
        traineeId: props.userSelected,
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
    data?.exerciseProgress.map((exercise) =>
      xArray.push(exercise.workout.date.split('T', 1)[0])
    )
    return xArray
  }

  const getTotalReps = () => {
    var yArray = []

    data?.exerciseProgress.map(
      (exercise) =>
        yArray.push(exercise.actualReps * exercise.actualSets * exercise.weight)
      //yArray.push(exercise.repsComplete * exerciseProgress.workou)
    )
    return yArray
  }

  // console.log(getAllDates())
  // console.log(getTotalReps())
  // console.log(
  //   'exerciseProgress',
  //   data?.exerciseProgress.map((ex) => ex.weight)
  // )

  const chart = () => {
    setChartData({
      labels: getAllDates(),

      datasets: [
        {
          label: 'Sets Hit',
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
      // return data.exerciseProgress.map((exercise) => (
      //   <div key={exercise.id}>
      //     Date: {exercise.workout.date.split('T', 1)[0]} Total Reps:{' '}
      //     {exercise.actualReps * exercise.actualSets}
      //   </div>
      // ))
      return <Line data={chartData} />
    }

    return <p>There is no progress to display</p>
  }

  return <div className="exerciseProgressGraph">{displayProgress()}</div>
}

export default ProgressGraph
