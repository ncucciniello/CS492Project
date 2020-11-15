import WorkoutGraph from 'src/components/WorkoutGraph'
import NewWorkout from 'src/components/NewWorkout'
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
  const [isVisible, setVisibility] = useState(false)

  const [dateSelected, setDateSelected] = useState(new Date())
  const tzOffset = new Date().getTimezoneOffset() * 60000
  let localISOTime = new Date(dateSelected - tzOffset).toISOString()

  const openWorkoutForm = () => {
    setVisibility(true)
  }

  const { loading, data, refetch } = useQuery(GET_WORKOUT, {
    variables: {
      input: {
        userId: props.userSelected,
        date: localISOTime.split('T', 1)[0],
      },
    },
  })

  const hasWorkouts = data?.userWorkouts?.length || false

  const displayWorkout = () => {
    if (loading) {
      return <div>Loading...</div>
    }

    if (hasWorkouts) {
      return <WorkoutGraph data={data} />
    }

    return (
      <div className="workoutGraph">
        <h3>No workouts on {localISOTime.split('T', 1)[0]}</h3>
      </div>
    )
  }

  const handleDateChange = (input) => {
    let newDate
    if (input) {
      newDate = new Date(+dateSelected + 86400000)
    } else if (!input) {
      newDate = new Date(+dateSelected - 86400000)
    }
    setDateSelected(newDate)
  }

  return (
    <div className="workoutContatiner ">
      <div className="workoutHeader">
        <button onClick={() => handleDateChange(0)}>Previous Day</button>
        <h3>Viewing: {localISOTime.split('T', 1)[0]}</h3>
        <button onClick={() => handleDateChange(1)}>Next Day</button>
      </div>
      {displayWorkout()}
      <div className="workoutSidebar">
        <button disabled={hasWorkouts} onClick={openWorkoutForm}>
          Add Workout
        </button>
        <button disabled={!hasWorkouts} onClick={openWorkoutForm}>
          Edit Workout
        </button>
      </div>
      {isVisible && (
        <NewWorkout
          data={data}
          hasWorkouts={hasWorkouts}
          reRender={refetch}
          userSelected={props.userSelected}
          dateSelected={localISOTime}
          setVisibility={setVisibility}
        />
      )}
    </div>
  )
}

export default Workout
