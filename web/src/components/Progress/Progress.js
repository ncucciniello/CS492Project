import ProgressGraph from 'src/components/ProgressGraph'
import { useState } from 'react'
import { useQuery } from '@redwoodjs/web'
import { Form, SelectField } from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'

const GET_EXERCISE_TYPES = gql`
  query getExerciseTypes {
    exerciseTypes {
      id
      exerciseName
    }
  }
`

const Progress = (props) => {
  const [selectedExerciseId, setSelectedExerciseId] = useState(1)

  const { loading, data } = useQuery(GET_EXERCISE_TYPES)

  const formMethods = useForm()

  const handleChange = (e) => {
    setSelectedExerciseId(parseInt(e.target.value))
  }

  const hasExerciseTypes = data?.exerciseTypes?.length || false

  const displayExerciseOptions = () => {
    if (loading) {
      return <option>Lodaing...</option>
    }

    if (hasExerciseTypes) {
      return data.exerciseTypes.map((exercise) => (
        <option key={exercise.id} value={exercise.id}>
          {exercise.exerciseName}
        </option>
      ))
    }

    return <option>There are no exercises</option>
  }

  return (
    <div className="exerciseProgressContatiner ">
      <div className="exerciseProgressHeader">
        <Form formMethods={formMethods}>
          <h4 className="progressLabel">Viewing all time progress for:</h4>
          <SelectField onChange={handleChange} name="exerciseTypeId">
            {displayExerciseOptions()}
          </SelectField>
        </Form>
      </div>
      <ProgressGraph
        userSelected={props.userSelected}
        selectedExerciseId={selectedExerciseId}
      />
    </div>
  )
}

export default Progress
