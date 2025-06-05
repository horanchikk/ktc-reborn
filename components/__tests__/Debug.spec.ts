import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Debug from '../Form/Debug.vue'

// Мокаем useDebug
vi.mock('@/store/useDebug', () => ({
  useDebug: () => ({
    isVisible: true,
    user: { data: 'test-user' },
    sidebar: { isVisible: false, isRendered: true },
    route: '/test-route'
  })
}))

describe('Debug', () => {
  it('рендерит заголовок и debug-информацию', () => {
    const wrapper = mount(Debug, {
      global: {
        stubs: {
          Form: { template: '<div><slot /></div>' }
        }
      }
    })
    expect(wrapper.text()).toContain('Debug')
    expect(wrapper.text()).toContain('test-user')
    expect(wrapper.text()).toContain('/test-route')
  })
}) 