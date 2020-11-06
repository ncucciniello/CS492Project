import WorkoutGraph from 'src/components/WorkoutGraph'
import { useQuery } from '@redwoodjs/web'

export const GET_WORKOUT = gql`
  query GetUserWorkouts($input: SearchWorkoutInput!) {
    userWorkouts(input: $input) {
      id
      userId
      date
      exercises {
        id
        weight
        repsAssigned
        repsComplete
        setsAssigned
        setsComplete
        exerciseType {
          name
          description
        }
      }
    }
  }
`

const Workout = () => {
  const { loading, data } = useQuery(GET_WORKOUT, {
    variables: {
      input: {
        userId: 1,
        date: '2020-11-05',
      },
    },
  })

  return (
    <div className="workoutContatiner ">
      <div className="workoutHeader">
        <button>Previous Day</button>
        <h3>Todays Date</h3>
        <button>Next Day</button>
      </div>
      {loading ? <div>Loading...</div> : <WorkoutGraph data={data} />}
      <div className="workoutSidebar">
        <button>Add Workout</button>
        <button>Edit Workout</button>
      </div>
    </div>
  )
}

export default Workout
