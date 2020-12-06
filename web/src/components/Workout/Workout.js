import WorkoutGraph from 'src/components/WorkoutGraph'
import NewWorkout from 'src/components/NewWorkout'
import LogWorkout from 'src/components/LogWorkout'
import { useQuery } from '@redwoodjs/web'
import { useState } from 'react'

export const GET_WORKOUT = gql`
  query GetUserWorkouts($input: SearchWorkoutInput!) {
    userWorkouts(input: $input) {
      id
      date
      exercises {
        id
        weight
        reps
        actualReps
        numberOfSets
        actualSets
        ExerciseType {
          exerciseName
          exerciseDescription
          id
        }
      }
    }
  }
`
export const GET_WORKOUT_TRAINEE = gql`
  query GetTraineeWorkouts($input: SearchWorkoutInput2!) {
    traineeWorkouts(input: $input) {
      id
      date
      exercises {
        id
        weight
        reps
        actualReps
        numberOfSets
        actualSets
        ExerciseType {
          exerciseName
          exerciseDescription
          id
        }
      }
    }
  }
`

const Workout = (props) => {
  const [newWorkout, toggleNewWorkout] = useState(false)
  const [logWorkout, toggleLogWorkout] = useState(false)
  const [isTrainer, setIsTrainer] = useState(false)

  const [dateSelected, setDateSelected] = useState(new Date())
  const tzOffset = new Date().getTimezoneOffset() * 60000
  let localISOTime = new Date(dateSelected - tzOffset).toISOString()

  const openWorkoutForm = () => {
    toggleNewWorkout(true)
  }

  const openLogWorkoutForm = () => {
    toggleLogWorkout(true)
  }

  const getWorkoutQuery = () => {
    if (props.currentUserType == 'Trainer') {
      console.log('in getWorkoutQuery')
      return useQuery(GET_WORKOUT, {
        variables: {
          input: {
            trainerId: props.currentTrainerId,
            traineeId: props.userSelected,
            date: localISOTime.split('T', 1)[0],
          },
        },
        onCompleted: () => {
          if (props.currentUserType == 'Trainer') {
            setIsTrainer(true)
          }
        },
      })
    } else {
      return useQuery(GET_WORKOUT_TRAINEE, {
        variables: {
          input: {
            traineeId: props.userSelected,
            date: localISOTime.split('T', 1)[0],
          },
        },
      })
    }
  }

  const getHasWorkouts = () => {
    if (props.currentUserType == 'Trainer') {
      return data?.userWorkouts?.length || false
    } else {
      return data?.traineeWorkouts?.length || false
    }
  }

  const getIsLogged = () => {
    if (props.currentUserType == 'Trainer') {
      return data?.userWorkouts[0]?.exercises[0].actualReps !== null
    } else {
      return data?.traineeWorkouts[0]?.exercises[0].actualReps !== null
    }
  }

  const { loading, data, refetch } = getWorkoutQuery()

  console.log('data', data)
  const hasWorkouts = getHasWorkouts()
  const isLogged = getIsLogged()

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

      {isTrainer && (
        <div className="workoutSidebar">
          <button disabled={hasWorkouts} onClick={openWorkoutForm}>
            Add Workout
          </button>
          <button disabled={!hasWorkouts} onClick={openWorkoutForm}>
            Edit Workout
          </button>
        </div>
      )}

      {!isTrainer && (
        <div className="workoutSidebar">
          <button
            disabled={!hasWorkouts || isLogged}
            onClick={openLogWorkoutForm}
          >
            Log Workout
          </button>
          <button
            disabled={!hasWorkouts || !isLogged}
            onClick={openLogWorkoutForm}
          >
            Edit Logged Workout
          </button>
        </div>
      )}

      {newWorkout && (
        <NewWorkout
          data={data}
          hasWorkouts={hasWorkouts}
          reRender={refetch}
          userSelected={props.userSelected}
          relationshipSelected={props.relationshipSelected}
          dateSelected={localISOTime}
          setVisibility={toggleNewWorkout}
        />
      )}

      {logWorkout && (
        <LogWorkout
          data={data}
          hasWorkouts={hasWorkouts}
          isLogged={isLogged}
          reRender={refetch}
          userSelected={props.userSelected}
          dateSelected={localISOTime}
          setVisibility={toggleLogWorkout}
        />
      )}
    </div>
  )
}

export default Workout
