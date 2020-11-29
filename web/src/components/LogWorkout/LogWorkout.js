import { Form, HiddenField, TextField, Submit } from '@redwoodjs/forms'
import { Flash, useMutation } from '@redwoodjs/web'
import { useForm, useFieldArray } from 'react-hook-form'

const LOG_WORKOUT = gql`
  mutation LogWorkout($id: Int, $input: LogWorkoutInput!) {
    logWorkout(id: $id, input: $input) {
      id
      exercises {
        id
        workoutId
        weight
        repsComplete
        setsComplete
      }
    }
  }
`

const LogWorkout = (props) => {
  const [logWorkout] = useMutation(LOG_WORKOUT)

  // const setDefaultValues = () => {
  //   const myDefault = [
  //     {
  //       exerciseType: { id: '' },
  //       weight: '',
  //       repsAssigned: '',
  //       setsAssigned: '',
  //     },
  //   ]

  //   if (props.isLogged) {
  //     return props.data?.userWorkouts[0].exercises
  //   } else {
  //     return myDefault
  //   }
  // }

  const formMethods = useForm({
    defaultValues: {
      exercises: props.data?.userWorkouts[0].exercises,
    },
  })

  const { fields } = useFieldArray({
    control: formMethods.control,
    name: 'exercises',
  })

  const submitForm = async (data) => {
    await logWorkout({
      variables: {
        id: props.data.userWorkouts[0].id,
        input: {
          ...data,
        },
      },
    })
    props.setVisibility(false)
    props.reRender()
  }

  return (
    <div className="newWorkoutModal">
      <div className="workout-form">
        {props.isLogged ? <h3>Edit Logged Workout</h3> : <h3>Log Workout</h3>}
        <Flash timeout={1000} />
        <Form onSubmit={submitForm} formMethods={formMethods}>
          <p className="label">Exercise Type</p>
          <p className="label">Weight</p>
          <p className="label">RepsComplete</p>
          <p className="label">SetsComplete</p>

          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <HiddenField
                  name={`exercises[${index}].id`}
                  className="workoutInput"
                  defaultValue={`${field?.id}`}
                />

                <p className="label">{field.exerciseType.name}</p>

                <p className="label">{field?.weight} lbs</p>

                <TextField
                  name={`exercises[${index}].repsComplete`}
                  className="workoutInput"
                  placeholder="Reps Completed"
                  defaultValue={
                    field?.setsComplete == null ? '' : `${field?.repsComplete}`
                  }
                  validation={{
                    required: true,
                  }}
                  errorClassName="error"
                />

                <TextField
                  name={`exercises[${index}].setsComplete`}
                  className="workoutInput"
                  placeholder="Sets Completed"
                  defaultValue={
                    field?.setsComplete == null ? '' : `${field?.setsComplete}`
                  }
                  validation={{
                    required: true,
                  }}
                  errorClassName="error"
                />
              </div>
            )
          })}

          <button type="button" onClick={() => props.setVisibility(false)}>
            Cancel
          </button>

          {props.isLogged ? (
            <Submit>Update Logged workout</Submit>
          ) : (
            <Submit>Log workout</Submit>
          )}
        </Form>
      </div>
    </div>
  )
}

export default LogWorkout
