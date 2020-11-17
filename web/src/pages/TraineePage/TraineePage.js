import UserLayout from 'src/layouts/UserLayout'
import Workout from 'src/components/Workout'

const TraineePage = () => {
  const currentUserId = 1
  const currentUserType = 'Trainee'

  return (
    <UserLayout>
      <Workout currentUserType={currentUserType} userSelected={currentUserId} />
      {/* <div className="exerciseProgressContatiner ">
        <div className="exerciseProgress">
          Exercise Progress Graph Goes here
        </div>
      </div> */}
    </UserLayout>
  )
}

export default TraineePage
