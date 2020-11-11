import { render } from '@redwoodjs/testing'

import NewWorkout from './NewWorkout'

describe('NewWorkout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewWorkout />)
    }).not.toThrow()
  })
})
