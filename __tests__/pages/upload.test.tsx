import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import '@testing-library/jest-dom'

import Upload from '../../pages/upload'

jest.mock("next-auth/react")

describe('Upload', () => {
  it('renders', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: 'tester',
          role: 'customer'
        },
      },
      status: 'authenticated',
    })
    render(<Upload />)

    const heading = screen.getByText("Select file →")

    expect(heading).toBeInTheDocument()
  })
})
