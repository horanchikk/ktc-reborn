import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { ref } from 'vue'
import Header from '../Base/Header.vue'

// Создаем Pinia
const pinia = createPinia()
setActivePinia(pinia)

// Мокаем useRouter
vi.mock('vue-router', () => ({
    useRouter: () => ({
        currentRoute: {
            value: {
                name: 'test-route'
            }
        }
    })
}))

// Мокаем updateColors
vi.mock('~/composables/useColors', () => ({
    updateColors: vi.fn()
}))

// Создаем мок для useSideBar
const mockShow = vi.fn()
vi.mock('~/store/useSideBar', () => ({
    useSideBar: () => ({
        isVisible: ref(false),
        isRendered: ref(false),
        toggle: vi.fn(),
        close: vi.fn(),
        open: vi.fn(),
        show: mockShow
    })
}))

describe('Header', () => {
    it('отображает название текущего маршрута', async () => {
        const wrapper = mount(Header, {
            global: {
                plugins: [pinia],
                mocks: {
                    $router: {
                        currentRoute: {
                            value: {
                                name: 'test-route'
                            }
                        }
                    }
                }
            }
        })
        expect(wrapper.text()).toContain('test-route')
    })

    it('открывает меню при клике на кнопку', async () => {
        const wrapper = mount(Header, {
            global: {
                plugins: [pinia],
                mocks: {
                    $router: {
                        currentRoute: {
                            value: {
                                name: 'test-route'
                            }
                        }
                    }
                }
            }
        })
        await wrapper.find('.w-8.h-8').trigger('click')
        expect(mockShow).toHaveBeenCalled()
    })
}) 