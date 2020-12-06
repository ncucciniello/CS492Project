import { useQuery } from '@redwoodjs/web'

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
          {exercise.actualReps * exercise.actualSets}
        </div>
      ))
    }

    return <p>There is no progress to display</p>
  }

  return <div className="exerciseProgressGraph">{displayProgress()}</div>
}

export default ProgressGraph
