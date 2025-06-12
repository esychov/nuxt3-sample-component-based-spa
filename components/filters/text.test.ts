import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextFilter from './text.vue'

describe('TextFilter', () => {
  it('renders with caption', () => {
    const wrapper = mount(TextFilter, {
      props: {
        caption: 'Test Caption',
        placeholder: 'Enter text'
      }
    })
    expect(wrapper.text()).toContain('Test Caption')
  })

  it('renders without caption', () => {
    const wrapper = mount(TextFilter, {
      props: {
        caption: '',
        placeholder: 'Enter text'
      }
    })
    expect(wrapper.text()).not.toContain(':')
  })

  it('renders with placeholder', () => {
    const wrapper = mount(TextFilter, {
      props: {
        placeholder: 'Enter text'
      }
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
  })

  it('emits filtered event on keyup', async () => {
    const wrapper = mount(TextFilter, {
      props: {
        placeholder: 'Enter text'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('test value')
    await input.trigger('keyup')

    expect(wrapper.emitted('filtered')).toBeTruthy()
    expect(wrapper.emitted('filtered')[0]).toEqual(['test value'])
  })
})
