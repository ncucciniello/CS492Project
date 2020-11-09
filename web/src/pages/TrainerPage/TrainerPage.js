import UserLayout from 'src/layouts/UserLayout'
import ClientList from 'src/components/ClientList'
import Workout from 'src/components/Workout'

const TrainerPage = () => {
  return (
    <UserLayout>
      <ClientList />
      <Workout userSelected={1} />
      <div className="exerciseProgressContatiner ">
        <div className="exerciseProgress">
          Exercise Progress Graph Goes here
        </div>
      </div>
    </UserLayout>
  )
}

export default TrainerPage
