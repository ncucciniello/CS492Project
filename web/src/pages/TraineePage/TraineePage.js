import UserLayout from 'src/layouts/UserLayout'

const TraineePage = () => {
  return (
    <UserLayout>
      <div className="workoutGraphContatiner ">
        <div className="workoutGraph">Workout Graph Goes here</div>
      </div>
      <div className="exerciseProgressContatiner ">
        <div className="exerciseProgress">
          Exercise Progress Graph Goes here
        </div>
      </div>
    </UserLayout>
  )
}

export default TraineePage
