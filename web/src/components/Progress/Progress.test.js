import { render } from '@redwoodjs/testing'

import Progress from './Progress'

describe('Progress', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Progress />)
    }).not.toThrow()
  })
})
