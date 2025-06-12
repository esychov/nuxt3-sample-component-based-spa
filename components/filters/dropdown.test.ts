import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DropdownFilter from './dropdown.vue'

describe('DropdownFilter', () => {
  const mockOptions = {
    'option1': 'Option 1',
    'option2': 'Option 2'
  }

  it('renders with caption', () => {
    const wrapper = mount(DropdownFilter, {
      props: {
        caption: 'Test Caption',
        options: mockOptions
      }
    })
    expect(wrapper.text()).toContain('Test Caption')
  })

  it('renders without caption', () => {
    const wrapper = mount(DropdownFilter, {
      props: {
        caption: '',
        options: mockOptions
      }
    })
    expect(wrapper.text()).not.toContain(':')
  })

  it('renders all options correctly', () => {
    const wrapper = mount(DropdownFilter, {
      props: {
        options: mockOptions
      }
    })
    const options = wrapper.findAll('option')
    expect(options).toHaveLength(3) // Including the "All" option
    expect(options[1].text()).toBe('Option 1')
    expect(options[2].text()).toBe('Option 2')
  })

  it('emits filtered event with selected value', async () => {
    const wrapper = mount(DropdownFilter, {
      props: {
        options: mockOptions
      }
    })
    
    await wrapper.find('select').setValue('option1')
    expect(wrapper.emitted('filtered')).toBeTruthy()
    expect(wrapper.emitted('filtered')[0]).toEqual(['option1'])
  })

  it('emits empty value when "All" is selected', async () => {
    const wrapper = mount(DropdownFilter, {
      props: {
        options: mockOptions
      }
    })
    
    await wrapper.find('select').setValue('')
    expect(wrapper.emitted('filtered')).toBeTruthy()
    expect(wrapper.emitted('filtered')[0]).toEqual([''])
  })
}) 