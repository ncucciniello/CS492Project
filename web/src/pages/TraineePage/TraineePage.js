import UserLayout from 'src/layouts/UserLayout'
import Workout from 'src/components/Workout'
import Progress from 'src/components/Progress'

const TraineePage = () => {
  const currentUserId = 2
  const currentUserType = 'Trainee'
  const currentTrainerId = 54321

  return (
    <UserLayout>
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
