const Workout = () => {
  return (
    <div className="workoutContatiner ">
      <div className="workoutHeader">
        <button>Previous Day</button>
        <h3>Todays Date</h3>
        <button>Next Day</button>
      </div>
      <div className="workoutGraph">Workout Graph Goes here</div>
      <div className="workoutSidebar">
        <button>Add Workout</button>
        <button>Edit Workout</button>
      </div>
    </div>
  )
}

export default Workout
