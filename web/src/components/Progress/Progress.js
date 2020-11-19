import { useState } from 'react'
import { useQuery } from '@redwoodjs/web'

export const GET_PROGRESS = gql`
  query GetExerciseProgress($input: SearchProgressInput!) {
    exerciseProgress(input: $input) {
      id
      weight
      repsComplete
      setsComplete
      exerciseType {
        id
        name
      }
      workout {
        id
        userId
        date
      }
    }
  }
`

const Progress = (props) => {
  const [selectedExerciseId] = useState(1)

  const { data } = useQuery(GET_PROGRESS, {
    variables: {
      input: {
        userId: props.userSelected,
        exerciseTypeId: selectedExerciseId,
      },
    },
  })

  console.log(data)

  return (
    <div className="exerciseProgressContatiner ">
      <div className="exerciseProgress">Exercise Progress Graph Goes here</div>
    </div>
  )
}

export default Progress
