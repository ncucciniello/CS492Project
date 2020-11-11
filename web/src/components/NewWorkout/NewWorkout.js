import { Form, SelectField, TextField, Submit } from '@redwoodjs/forms'
import { Flash, useMutation, useQuery } from '@redwoodjs/web'
import { useForm, useFieldArray } from 'react-hook-form'

const GET_EXERCISE_TYPES = gql`
  query getExerciseTypes {
    exerciseTypes {
      id
      name
    }
  }
`
const CREATE_WORKOUT = gql`
  mutation createFullWorkout($input: CreateFullWorkoutInput!) {
    createFullWorkout(input: $input) {
      id
      userId
      date
      exercises {
        id
        weight
        repsAssigned
        setsAssigned
        exerciseType {
          name
        }
      }
    }
  }
`

const NewWorkout = (props) => {
  const { loading, data } = useQuery(GET_EXERCISE_TYPES, {
    fetchPolicy: 'network-only',
  })

  const [createWorkout] = useMutation(CREATE_WORKOUT)

  const formMethods = useForm({
    defaultValues: {
      exercise: [
        {
          exerciseType: { id: null },
          weight: null,
          repsAssigned: null,
          setsAssigned: null,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'exercises', // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  })

  const onSubmit = (data) => {
    createWorkout({
      variables: { input: { userId: props.userSelected, ...data } },
    })
    props.reRender()
    props.setVisibility(false)
  }

  return (
    <div className="newWorkoutModal">
      <div className="workout-form">
        <h3>Add Workout</h3>
        <Flash timeout={1000} />
        <Form onSubmit={onSubmit} formMethods={formMethods}>
          {fields.map((field, index) => (
            <div key={`exercises[${index}]`}>
              <SelectField
                name={`exercises[${index}].exerciseType.id`}
                defaultValue=""
                validation={{
                  required: true,
                }}
              >
                <option value="" disabled>
                  Pick a Exercise Type
                </option>

                {loading ? (
                  <option>Loading ...</option>
                ) : data.exerciseTypes.length == 0 ? (
                  <option>There are no exercise types</option>
                ) : (
                  data.exerciseTypes.map((exerciseType) => (
                    <option key={exerciseType.id} value={exerciseType.id}>
                      {exerciseType.name}
                    </option>
                  ))
                )}
              </SelectField>

              <TextField
                name={`exercises[${index}].weight`}
                className="workoutInput"
                placeholder="Weight"
                validation={{
                  required: true,
                }}
                errorClassName="error"
              />
              <TextField
                name={`exercises[${index}].repsAssigned`}
                className="workoutInput"
                placeholder="Reps"
                validation={{
                  required: true,
                }}
                errorClassName="error"
              />
              <TextField
                name={`exercises[${index}].setsAssigned`}
                className="workoutInput"
                placeholder="Sets"
                validation={{
                  required: true,
                }}
                errorClassName="error"
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          ))}

          <button type="button" onClick={() => append()}>
            Add Exercise
          </button>
          <Submit>Save workout</Submit>
        </Form>
      </div>
    </div>
  )
}

export default NewWorkout
