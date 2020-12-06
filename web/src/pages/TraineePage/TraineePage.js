import UserLayout from 'src/layouts/UserLayout'
import Workout from 'src/components/Workout'
import Progress from 'src/components/Progress'

const TraineePage = () => {
  const currentUserId = 3
  const currentUserType = 'Trainee'

  return (
    <UserLayout>
      <Workout currentUserType={currentUserType} userSelected={currentUserId} />
      <Progress userSelected={currentUserId} />
    </UserLayout>
  )
}

export default TraineePage
