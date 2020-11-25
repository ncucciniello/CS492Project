import {
  Form,
  SelectField,
  TextField,
  HiddenField,
  Submit,
} from '@redwoodjs/forms'
import { Flash, useMutation, useQuery } from '@redwoodjs/web'
import { useForm, useFieldArray } from 'react-hook-form'
import { useState } from 'react'

const GET_EXERCISE_TYPES = gql`
  query getExerciseTypes {
    exerciseTypes {
      id
      name
    }
  }
`
const CREATE_WORKOUT = gql`
  mutation createWorkout($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
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

const UPDATE_WORKOUT = gql`
  mutation UpdateWorkout(
    $id: Int
    $deletions: [DeleteExerciseInput]
    $input: UpdateWorkoutInput!
  ) {
    updateWorkout(id: $id, deletions: $deletions, input: $input) {
      id
      exercises {
        id
        workoutId
        weight
        repsAssigned
        setsAssigned
        exerciseType {
          id
          name
          description
        }
      }
    }
  }
`

const NewWorkout = (props) => {
  const [deletions, setDeletions] = useState([])

  const [createWorkout] = useMutation(CREATE_WORKOUT)
  const [updateWorkout] = useMutation(UPDATE_WORKOUT)
  const { loading, data } = useQuery(GET_EXERCISE_TYPES, {
    fetchPolicy: 'network-only',
  })

  const setDefaultValues = () => {
    const myDefault = [
      {
        exerciseType: { id: '' },
        weight: '',
        repsAssigned: '',
        setsAssigned: '',
      },
    ]

    if (props.hasWorkouts) {
      return props.data?.userWorkouts[0].exercises
    } else {
      return myDefault
    }
  }

  const formMethods = useForm({
    defaultValues: {
      exercises: setDefaultValues(),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'exercises',
  })

  const hasExerciseTypes = data?.exerciseTypes?.length || false

  const displayExerciseTypes = () => {
    if (loading) {
      return <option>Lodaing...</option>
    }

    if (hasExerciseTypes) {
      return data.exerciseTypes.map((exerciseType) => (
        <option key={exerciseType.id} value={exerciseType.id}>
          {exerciseType.name}
        </option>
      ))
    }

    return <option>There are no exercise types</option>
  }

  const handleDetetion = (index, exerciseId) => {
    remove(index)
    setDeletions([...deletions, { id: parseInt(exerciseId) }])
    console.log('exerciseId', exerciseId)
  }

  const submitForm = async (data) => {
    if (!props.hasWorkouts) {
      await createWorkout({
        variables: {
          input: {
            userId: props.userSelected,
            date: props.dateSelected,
            ...data,
          },
        },
      })
    } else {
      await updateWorkout({
        variables: {
          id: props.data.userWorkouts[0].id,
          deletions,
          input: data,
        },
      })
      console.log('data', data)
      console.log('deletions', deletions)
    }
    setDeletions([])
    props.setVisibility(false)
    props.reRender()
  }

  return (
    <div className="newWorkoutModal">
      <div className="workout-form">
        {props.hasWorkouts ? <h3>Edit Workout</h3> : <h3>Add Workout</h3>}
        <Flash timeout={1000} />
        <Form onSubmit={submitForm} formMethods={formMethods}>
          <p className="selectLabel">Exercise Type</p>
          <p className="label">Weight</p>
          <p className="label">Reps</p>
          <p className="label">Sets</p>

          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <HiddenField
                  name={`exercises[${index}].id`}
                  defaultValue={`${field?.id}`}
                />

                {!loading && (
                  <SelectField
                    name={`exercises[${index}].exerciseType.id`}
                    className="workoutInputSelect"
                    defaultValue={`${field.exerciseType?.id}`}
                  >
                    <option value="" disabled>
                      Pick an Exercise
                    </option>
                    {displayExerciseTypes()}
                  </SelectField>
                )}

                <TextField
                  name={`exercises[${index}].weight`}
                  className="workoutInput"
                  placeholder="Weight"
                  defaultValue={`${field?.weight}`}
                  validation={{
                    required: true,
                  }}
                  errorClassName="error"
                />
                <TextField
                  name={`exercises[${index}].repsAssigned`}
                  className="workoutInput"
                  placeholder="Reps"
                  defaultValue={`${field?.repsAssigned}`}
                  validation={{
                    required: true,
                  }}
                  errorClassName="error"
                />
                <TextField
                  name={`exercises[${index}].setsAssigned`}
                  className="workoutInput"
                  placeholder="Sets"
                  defaultValue={`${field?.setsAssigned}`}
                  validation={{
                    required: true,
                  }}
                  errorClassName="error"
                />
                <button
                  type="button"
                  onClick={() => handleDetetion(index, field.id)}
                >
                  Delete
                </button>
              </div>
            )
          })}

          <button
            type="button"
            onClick={() =>
              append({
                exerciseType: { id: '' },
                weight: '',
                repsAssigned: '',
                setsAssigned: '',
              })
            }
          >
            Add Exercise
          </button>

          <button
            type="button"
            onClick={() => {
              props.setVisibility(false)
              setDeletions([])
            }}
          >
            Cancel
          </button>

          {props.hasWorkouts ? (
            <Submit>Update workout</Submit>
          ) : (
            <Submit>Save workout</Submit>
          )}
        </Form>
      </div>
    </div>
  )
}

export default NewWorkout
