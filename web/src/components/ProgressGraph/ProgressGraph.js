import { useQuery } from '@redwoodjs/web'
import { Line } from 'react-chartjs-2'
import { useState } from 'react'

export const GET_PROGRESS = gql`
  query GetExerciseProgress($input: SearchProgressInput!) {
    exerciseProgress(input: $input) {
      actualReps
      actualSets
      workout {
        date
      }
    }
  }
`

const ProgressGraph = (props) => {
  const [chartData, setChartData] = useState({})
  const [displayChart, setDisplayChart] = useState(false)

  const { data } = useQuery(GET_PROGRESS, {
    variables: {
      input: {
        traineeId: props.userSelected,
        exerciseTypeId: props.selectedExerciseId,
      },
    },
    onCompleted: () => {
      chart(createProgressObjectList(data))
    },
  })

  const hasProgress = data?.exerciseProgress?.length || false

  const createProgressObjectList = (data) => {
    let progressList = []
    data.exerciseProgress.map((ex) =>
      progressList.push({
        totalReps: ex.actualReps * ex.actualSets,
        date: ex.workout.date.split('T', 1)[0],
      })
    )
    progressList.sort((a, b) => (a.date > b.date ? 1 : -1))
    return progressList
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

  const chart = (progObjectArray) => {
    const repList = []
    const dateList = []

    progObjectArray.map((ex) => {
      repList.push(ex.totalReps)
      dateList.push(ex.date)
    })

    if (repList.length > 1) {
      setDisplayChart(true)
    } else {
      setDisplayChart(false)
    }

    setChartData({
      labels: dateList,
      datasets: [
        {
          label: 'Sets Hit',
          fill: false,
          data: repList,
          borderColor: 'rgba(60,179,113,0.6',
          borderWidth: 4,
        },
      ],
    })
  }

  const displayProgress = () => {
    if (props.loading) {
      return <p>Loading...</p>
    }

    if (hasProgress && displayChart) {
      return <Line data={chartData} options={options} />
    }

    return <p>There is no progress to display</p>
  }

  return <div className="exerciseProgressGraph">{displayProgress()}</div>
}

export default ProgressGraph
