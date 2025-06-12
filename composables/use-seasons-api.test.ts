import { describe, it, expect, vi, beforeEach } from 'vitest'
import useSeasonsApi from './use-seasons-api'

// Mock $fetch
const mockFetch = vi.fn()
vi.mock('ofetch', () => ({
  $fetch: (url: string) => mockFetch(url)
}))

describe('useSeasonsApi', () => {
  const mockLeagueId = '123'
  const mockResponse = {
    seasons: [
      { idSeason: '1', strSeason: '2023/24' },
      { idSeason: '2', strSeason: '2022/23' }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockFetch.mockResolvedValue(mockResponse)
  })

  it('uses cached data on subsequent calls', async () => {
    // First call
    await useSeasonsApi(mockLeagueId)
    expect(mockFetch).toHaveBeenCalledTimes(1)

    // Second call
    const result = await useSeasonsApi(mockLeagueId)
    expect(mockFetch).toHaveBeenCalledTimes(1) // Should not call API again
    expect(result).toEqual(mockResponse)
  })
})
