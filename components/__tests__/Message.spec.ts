import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Message from '../Base/Message.vue'
import { nextTick } from 'vue'

// Мокаем иконки
const ICheckAlt = { template: '<div class="check-icon"></div>' }
const IAlert = { template: '<div class="alert-icon"></div>' }
const IClose = { template: '<div class="close-icon"></div>' }

describe('Message', () => {
    it('отображает сообщение типа done по умолчанию', async () => {
        const wrapper = mount(Message, {
            global: {
                components: {
                    ICheckAlt,
                    IAlert,
                    IClose
                }
            }
        })
        await nextTick()
        expect(wrapper.find('.check-icon').exists()).toBe(true)
        expect(wrapper.element.className).toContain('text-green-500')
    })

    it('отображает сообщение типа warn', async () => {
        const wrapper = mount(Message, {
            props: {
                type: 'warn'
            },
            global: {
                components: {
                    ICheckAlt,
                    IAlert,
                    IClose
                }
            }
        })

        await nextTick()
        expect(wrapper.find('.alert-icon').exists()).toBe(true)
        expect(wrapper.element.className).toContain('text-yellow-500')
    })

    it('отображает сообщение типа danger', async () => {
        const wrapper = mount(Message, {
            props: {
                type: 'danger'
            },
            global: {
                components: {
                    ICheckAlt,
                    IAlert,
                    IClose
                }
            }
        })
        
        await nextTick()
        expect(wrapper.find('.close-icon').exists()).toBe(true)
        expect(wrapper.element.className).toContain('text-red-500')
    })

    it('скрывает иконку, если icon=false', async () => {
        const wrapper = mount(Message, {
            props: {
                icon: false
            },
            global: {
                components: {
                    ICheckAlt,
                    IAlert,
                    IClose
                }
            }
        })
        expect(wrapper.find('.check-icon').exists()).toBe(false)
    })

    it('отображает текст сообщения', async () => {
        const wrapper = mount(Message, {
            props: {
                text: 'Test message'
            },
            global: {
                components: {
                    ICheckAlt,
                    IAlert,
                    IClose
                }
            }
        })
        expect(wrapper.text()).toContain('Test message')
    })

    it('отображает слот', async () => {
        const wrapper = mount(Message, {
            slots: {
                default: '<div class="custom-slot">Custom content</div>'
            },
            global: {
                components: {
                    ICheckAlt,
                    IAlert,
                    IClose
                }
            }
        })
        expect(wrapper.find('.custom-slot').exists()).toBe(true)
        expect(wrapper.text()).toContain('Custom content')
    })
}) 