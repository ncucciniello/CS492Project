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
      exerciseName
    }
  }
`
const CREATE_WORKOUT = gql`
  mutation createWorkout($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      id
      date
      exercises {
        id
        weight
        reps
        numberOfSets
        exerciseTypeId
        ExerciseType {
          exerciseName
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
        reps
        numberOfSets
        ExerciseType {
          id
          exerciseName
          exerciseDescription
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
        ExerciseType: { id: '' },
        weight: '',
        reps: '',
        numberOfSets: '',
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
          {exerciseType.exerciseName}
        </option>
      ))
    }

    return <option>There are no exercise types</option>
  }
  const handleDeletion = (index, exerciseId) => {
    remove(index)
    setDeletions([...deletions, { id: parseInt(exerciseId) }])
  }

  const submitForm = async (data) => {
    if (!props.hasWorkouts) {
      await createWorkout({
        variables: {
          input: {
            userRelationshipId: props.relationshipSelected,
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
                    name={`exercises[${index}].ExerciseType.id`}
                    className="workoutInputSelect"
                    defaultValue={`${field.ExerciseType.id}`}
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
                  name={`exercises[${index}].reps`}
                  className="workoutInput"
                  placeholder="Reps"
                  defaultValue={`${field?.reps}`}
                  validation={{
                    required: true,
                  }}
                  errorClassName="error"
                />
                <TextField
                  name={`exercises[${index}].numberOfSets`}
                  className="workoutInput"
                  placeholder="Sets"
                  defaultValue={`${field?.numberOfSets}`}
                  validation={{
                    required: true,
                  }}
                  errorClassName="error"
                />
                <button
                  type="button"
                  onClick={() => handleDeletion(index, field.id)}
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
                ExerciseType: { id: '' },
                weight: '',
                reps: '',
                numberOfSets: '',
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
