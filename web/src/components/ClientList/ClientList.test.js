import { render } from '@redwoodjs/testing'

import ClientList from './ClientList'

describe('ClientList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClientList />)
    }).not.toThrow()
  })
})
