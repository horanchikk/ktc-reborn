import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from '../Form/index.vue'
import { shallowRef } from 'vue'

// Мокаем анимации
vi.mock('animate.css', () => ({
    default: {}
}))

// Мокаем onClickOutside
vi.mock('@vueuse/core', () => ({
    onClickOutside: vi.fn()
}))

describe('Form', () => {
    const targetRef = shallowRef(null)

    it('рендерит форму с типом 0 (простое сообщение)', async () => {
        const wrapper = mount(Form, {
            props: {
                formType: 0,
                formMessage: 'Тестовое сообщение',
                isVisible: true
            },
            global: {
                stubs: {
                    Teleport: {
                        template: '<div><slot /></div>'
                    }
                },
                components: {
                    target: targetRef
                }
            }
        })

        // Ждем рендеринга
        await wrapper.vm.$nextTick()
        await new Promise(resolve => setTimeout(resolve, 0))

        const form = wrapper.find('form')
        expect(form.exists()).toBe(true)
        expect(form.text()).toContain('Тестовое сообщение')
        expect(form.find('button[type="submit"]').exists()).toBe(true)
    })

    it('рендерит форму с типом -1 (произвольный контент)', async () => {
        const wrapper = mount(Form, {
            props: {
                formType: -1,
                isVisible: true
            },
            slots: {
                default: '<div>Произвольный контент</div>'
            },
            global: {
                stubs: {
                    Teleport: {
                        template: '<div><slot /></div>'
                    }
                },
                components: {
                    target: targetRef
                }
            }
        })

        // Ждем рендеринга
        await wrapper.vm.$nextTick()
        await new Promise(resolve => setTimeout(resolve, 0))

        const content = wrapper.find('.w-\\[440px\\]')
        expect(content.exists()).toBe(true)
        expect(content.text()).toContain('Произвольный контент')
        expect(content.find('button').exists()).toBe(true)
    })

    it('эмитит isClosed при закрытии формы', async () => {
        const wrapper = mount(Form, {
            props: {
                formType: 0,
                formMessage: 'Тестовое сообщение',
                isVisible: true
            },
            global: {
                stubs: {
                    Teleport: {
                        template: '<div><slot /></div>'
                    }
                },
                components: {
                    target: targetRef
                }
            }
        })

        // Ждем рендеринга
        await wrapper.vm.$nextTick()
        await new Promise(resolve => setTimeout(resolve, 0))

        const form = wrapper.find('form')
        expect(form.exists()).toBe(true)
        await form.trigger('submit')
        expect(wrapper.emitted('isClosed')).toBeTruthy()
    })

    it('закрывает форму при клике на кнопку Ок в типе -1', async () => {
        const wrapper = mount(Form, {
            props: {
                formType: -1,
                isVisible: true
            },
            global: {
                stubs: {
                    Teleport: {
                        template: '<div><slot /></div>'
                    }
                },
                components: {
                    target: targetRef
                }
            }
        })

        // Ждем рендеринга
        await wrapper.vm.$nextTick()
        await new Promise(resolve => setTimeout(resolve, 0))

        const button = wrapper.find('button')
        expect(button.exists()).toBe(true)
        await button.trigger('click')
        expect(wrapper.vm.isVisible).toBe(false)
    })
}) 