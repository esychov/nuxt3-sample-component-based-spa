import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import League from './league.vue'
import useSeasonsApi from '../../composables/use-seasons-api'

// Utility to flush all pending promises
function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

// Mock useSeasonsApi
vi.mock('../../composables/use-seasons-api', () => ({
  default: vi.fn()
}))

describe('League', () => {
  const mockProps = {
    name: 'Test League',
    sport: 'Football',
    alternate: 'Test League Alt',
    id: '123'
  }

  const mockSeasonsData = {
    seasons: [{
      strBadge: 'https://example.com/logo.png'
    }]
  }

  beforeEach(() => {
    vi.clearAllMocks()
    const mockedUseSeasonsApi = vi.mocked(useSeasonsApi)
    mockedUseSeasonsApi.mockImplementation(() => Promise.resolve({
      seasons: [{ strBadge: 'https://example.com/logo.png' }]
    }))
  })

  it('renders league information correctly', () => {
    const wrapper = mount(League, {
      props: mockProps
    })

    expect(wrapper.text()).toContain('Test League')
    expect(wrapper.text()).toContain('Football')
    expect(wrapper.text()).toContain('Test League Alt')
  })

  it('loads logo when clicked', async () => {
    const wrapper = mount(League, {
      props: mockProps
    })

    // Initially, no image should be shown
    expect(wrapper.find('img').exists()).toBe(false)

    // Click the component and wait for the async operation
    await wrapper.trigger('click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    // Image should be loaded
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/logo.png')
    expect(img.attributes('alt')).toBe('Test League logo')
  })

  it('shows "No Logo" when no image is available', async () => {
    const mockedUseSeasonsApi = vi.mocked(useSeasonsApi)
    mockedUseSeasonsApi.mockResolvedValue({ seasons: [] })

    const wrapper = mount(League, {
      props: mockProps
    })

    // Click the component and wait for the async operation
    await wrapper.trigger('click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    // Should show "No Logo" text
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('No Logo')
  })

  it('does not load logo again after first click', async () => {
    const wrapper = mount(League, {
      props: mockProps
    })

    // First click and wait for async operation
    await wrapper.trigger('click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    // Debug: print the HTML after first click
    console.log(wrapper.html())

    // Verify image is loaded
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/logo.png')

    // Second click
    await wrapper.trigger('click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    // Verify API was only called once
    const mockedUseSeasonsApi = vi.mocked(useSeasonsApi)
    expect(mockedUseSeasonsApi).toHaveBeenCalledTimes(1)
  })
}) 