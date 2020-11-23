import { render } from '@redwoodjs/testing'

import ProgressGraph from './ProgressGraph'

describe('ProgressGraph', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProgressGraph />)
    }).not.toThrow()
  })
})
