import UserLayout from 'src/layouts/UserLayout'
import Workout from 'src/components/Workout'

const TraineePage = () => {
  return (
    <UserLayout>
      <Workout userSelected={1} />
      <div className="exerciseProgressContatiner ">
        <div className="exerciseProgress">
          Exercise Progress Graph Goes here
        </div>
      </div>
    </UserLayout>
  )
}

export default TraineePage
