import WorkoutGraph from 'src/components/WorkoutGraph'
import { useQuery } from '@redwoodjs/web'
import { useState } from 'react'

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

const Workout = (props) => {
  const [dateSelected, setDateSelected] = useState(new Date())

  const { loading, data } = useQuery(GET_WORKOUT, {
    variables: {
      input: {
        userId: props.userSelected,
        date: new Date(dateSelected).toISOString().split('T', 1)[0],
      },
    },
  })

  const handleDateChange = (input) => {
    let newDate
    if (input == 1) {
      newDate = new Date(+dateSelected + 86400000)
    } else if (input == 0) {
      newDate = new Date(+dateSelected - 86400000)
    }
    setDateSelected(newDate)
  }

  return (
    <div className="workoutContatiner ">
      <div className="workoutHeader">
        <button onClick={() => handleDateChange(0)}>Previous Day</button>
        <h3>
          Viewing: {new Date(dateSelected).toISOString().split('T', 1)[0]}
        </h3>
        <button onClick={() => handleDateChange(1)}>Next Day</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : data.userWorkouts.length == 0 ? (
        <div className="workoutGraph">
          <h3>No workouts on date selected</h3>
        </div>
      ) : (
        <WorkoutGraph data={data} />
      )}
      <div className="workoutSidebar">
        <button>Add Workout</button>
        <button>Edit Workout</button>
      </div>
    </div>
  )
}

export default Workout
