import { render, screen, waitFor } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'

import Uploads from '../../pages/uploads'

jest.mock("next-auth/react")

const server = setupServer(
  rest.get('/api/storage/list', (req, res, ctx) => {
    return res(ctx.json([
      {
        name: 'file1.tgz',
        size: 100,
        lastModified: new Date(Date.now() - 1000)
      }
    ]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Upload', () => {
  it('renders when loading', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: 'tester',
          role: 'support'
        },
      },
      status: 'authenticated',
    })
    render(<Uploads />)

    // check for loading state
    const heading = screen.getByText("Loading...")
    expect(heading).toBeInTheDocument()

    // ensure file list is loaded
    await waitFor(() => screen.getByText('file1.tgz'))
  })
})
