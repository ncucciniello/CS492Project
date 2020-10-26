import UserLayout from 'src/layouts/UserLayout'
// import ClientListCell from 'src/components/ClientListCell'

const TrainerPage = () => {
  return (
    <UserLayout>
      <h3>Client List</h3>
      <div className="clientList">
        <div className="clientListItem">Client 1</div>
        <div className="clientListItem">Client 2</div>
        <div className="clientListItem">Client 3</div>
        <div className="clientListItem">Client 4</div>
        <div className="clientListItem">Client 5</div>
        <div className="clientListItem">Client 6</div>
        <div className="clientListItem">Client 7</div>
      </div>
      <div className="workoutGraphContatiner ">
        <div className="workoutGraph">Workout Graph Goes here</div>
      </div>
      <div className="exerciseProgressContatiner ">
        <div className="exerciseProgress">
          Exercise Progress Graph Goes here
        </div>
      </div>
      {/* <ClientListCell /> */}
    </UserLayout>
  )
}

export default TrainerPage
