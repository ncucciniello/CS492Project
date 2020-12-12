import UserLayout from 'src/layouts/UserLayout'
import Workout from 'src/components/Workout'
import Progress from 'src/components/Progress'
import { useAuth } from '@redwoodjs/auth'

const TraineePage = () => {
  const { currentUser } = useAuth()
  const currentUserId = 2
  const currentUserType = 'Trainee'
  const currentTrainerId = 54321

  // const { currentUser } = useAuth()

  return (
    <UserLayout>
      {/* <p>current user: {currentUser.user_metadata.full_name}</p> */}
      <Workout
        currentUserType={currentUserType}
        userSelected={currentUserId}
        currentTrainerId={currentTrainerId}
      />
      <Progress userSelected={currentUserId} />
    </UserLayout>
  )
}

export default TraineePage
