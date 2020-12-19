import { useQuery } from '@redwoodjs/web'
import { Line } from 'react-chartjs-2'
import { useState } from 'react'

export const GET_PROGRESS = gql`
  query GetExerciseProgress($input: SearchProgressInput!) {
    exerciseProgress(input: $input) {
      weight
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

  const getOneRepMax = (reps, weight) => {
    if (weight == 0) {
      return reps
    }

    if (reps == 1) {
      return Math.round(weight * 1)
    } else if (reps == 2) {
      return Math.round(weight * 1.03)
    } else if (reps == 3) {
      return Math.round(weight * 1.06)
    } else if (reps == 4) {
      return Math.round(weight * 1.08)
    } else if (reps == 5) {
      return Math.round(weight * 1.11)
    } else if (reps == 6) {
      return Math.round(weight * 1.14)
    } else if (reps == 7) {
      return Math.round(weight * 1.17)
    } else if (reps == 8) {
      return Math.round(weight * 1.19)
    } else if (reps == 9) {
      return Math.round(weight * 1.22)
    } else if (reps == 10) {
      return Math.round(weight * 1.25)
    } else if (reps == 11) {
      return Math.round(weight * 1.27)
    } else if (reps == 12) {
      return Math.round(weight * 1.29)
    } else if (reps == 13) {
      return Math.round(weight * 1.3)
    } else if (reps == 14) {
      return Math.round(weight * 1.32)
    } else if (reps == 15) {
      return Math.round(weight * 1.33)
    } else {
      return weight * 1.5
    }
  }

  const createProgressObjectList = (data) => {
    let progressList = []
    data.exerciseProgress.map((ex) => {
      if (ex.actualReps >= 1) {
        progressList.push({
          totalReps: getOneRepMax(ex.actualReps, ex.weight),
          date: ex.workout.date.split('T', 1)[0],
          weight: ex.weight,
        })
      }
    })
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
    let labelName = ''

    progObjectArray.map((ex) => {
      repList.push(ex.totalReps)
      dateList.push(ex.date)
    })

    if (progObjectArray[0]?.weight < 1) {
      labelName = 'Reps'
    } else {
      labelName = 'One Rep Max'
    }

    if (repList.length > 1) {
      setDisplayChart(true)
    } else {
      setDisplayChart(false)
    }

    setChartData({
      labels: dateList,
      datasets: [
        {
          label: labelName,
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
