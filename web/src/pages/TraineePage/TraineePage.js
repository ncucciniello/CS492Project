import UserLayout from 'src/layouts/UserLayout'
import Workout from 'src/components/Workout'
import Progress from 'src/components/Progress'
import { useQuery } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'

const FIND_USER = gql`
  query FindUserQuery($emailAddress: String!) {
    userExists(emailAddress: $emailAddress) {
      id
      userName
      email
      type
    }
  }
`

const TraineePage = () => {
  const { currentUser } = useAuth()
  const [currentUserId, setCurrentUserId] = useState(0)
  const [currentUserType, setCurrentUserType] = useState('')

  const { data } = useQuery(FIND_USER, {
    variables: { emailAddress: currentUser.email },
    onCompleted: () => {
      const user = data.userExists[0]
      // console.log('user', user)
      setCurrentUserId(user.id)
      setCurrentUserType(user.type)
    },
  })

  return (
    <UserLayout>
      <Workout currentUserType={currentUserType} userSelected={currentUserId} />
      <Progress userSelected={currentUserId} />
    </UserLayout>
  )
}

export default TraineePage
