import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import HomePage from '../app/page'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: 'aajdnjad' })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'Hai19MC91nx9_kaQ9fxCc',
        fullName: 'John Doe',
      },
    }),
  }
})


test('Home', async () => {
  render(await HomePage())
  expect(screen.getByText('Moody Diary')).toBeTruthy()
})
