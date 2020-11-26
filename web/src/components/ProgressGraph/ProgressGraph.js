import { useQuery } from '@redwoodjs/web'

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
  })

  const hasProgress = data?.exerciseProgress?.length || false

  const displayProgress = () => {
    if (props.loading) {
      return <p>Lodaing...</p>
    }

    if (hasProgress) {
      return data.exerciseProgress.map((exercise) => (
        <div key={exercise.id}>
          Date: {exercise.workout.date.split('T', 1)[0]} Total Reps:{' '}
          {exercise.repsComplete * exercise.setsComplete}
        </div>
      ))
    }

    return <p>There is no progress to display</p>
  }

  return <div className="exerciseProgressGraph">{displayProgress()}</div>
}

export default ProgressGraph
