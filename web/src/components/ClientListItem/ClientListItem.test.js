import { render } from '@redwoodjs/testing'

import ClientListItem from './ClientListItem'

describe('ClientListItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClientListItem />)
    }).not.toThrow()
  })
})
