import { Form, TextField, Submit } from '@redwoodjs/forms'
// import { Flash, useMutation } from '@redwoodjs/web'
import { useForm, useFieldArray } from 'react-hook-form'

// const LOG_WORKOUT = gql`
//   mutation UpdateWorkout($id: Int, $input: UpdateWorkoutInput!) {
//     updateWorkout(id: $id, input: $input) {
//       id
//       exercises {
//         id
//         workoutId
//         weight
//         repsAssigned
//         setsAssigned
//         exerciseType {
//           id
//           name
//           description
//         }
//       }
//     }
//   }
// `

const LogWorkout = (props) => {
  // const [logWorkout] = useMutation(LOG_WORKOUT)

  const formMethods = useForm({
    defaultValues: {
      exercises: [
        {
          exerciseType: { id: null },
          weight: '0',
          repsAssigned: '0',
          setsAssigned: '0',
        },
      ],
    },
  })

  const { fields } = useFieldArray({
    control: formMethods.control,
    name: 'exercises',
  })

  const submitForm = async (data) => {
    // await logWorkout({
    //   variables: {
    //     input: {
    //       userId: props.userSelected,
    //       date: props.dateSelected,
    //       ...data,
    //     },
    //   },
    // })
    console.log(data)
    props.setVisibility(false)
    props.reRender()
  }

  return (
    <div className="newWorkoutModal">
      <div className="workout-form">
        <h3>Log Workout</h3>
        {/* <Flash timeout={1000} /> */}
        <Form onSubmit={submitForm} formMethods={formMethods}>
          {fields.map((field, index) => (
            <div key={`exercises[${index}]`}>
              <TextField
                name={`exercises[${index}].exerciseType.id`}
                className="workoutInput"
                placeholder="exerciseType.name"
                disabled
              />

              <TextField
                name={`exercises[${index}].weight`}
                className="workoutInput"
                placeholder="Weight"
                disabled
              />

              <TextField
                name={`exercises[${index}].repsCompleted`}
                className="workoutInput"
                placeholder="Reps"
                validation={{
                  required: true,
                }}
                errorClassName="error"
              />
              <TextField
                name={`exercises[${index}].setsCompleted`}
                className="workoutInput"
                placeholder="Sets"
                validation={{
                  required: true,
                }}
                errorClassName="error"
              />
            </div>
          ))}

          <button type="button" onClick={() => props.setVisibility(false)}>
            Cancel
          </button>
          <Submit>Log workout</Submit>
        </Form>
      </div>
    </div>
  )
}

export default LogWorkout
