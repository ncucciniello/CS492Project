import { render } from '@redwoodjs/testing'

import LogWorkout from './LogWorkout'

describe('LogWorkout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogWorkout />)
    }).not.toThrow()
  })
})
