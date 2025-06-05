import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SideBarElement from '../Base/SideBar/element.vue'

describe('SideBarElement', () => {
    it('отображает иконку типа home', () => {
        const wrapper = mount(SideBarElement, {
            props: {
                type: 'home',
                text: 'Домой',
                color: '#FF4646'
            }
        })

        expect(wrapper.find('svg').exists()).toBe(true)
        expect(wrapper.find('path').attributes('stroke')).toBe('#FF4646')
    })

    it('отображает иконку типа license', () => {
        const wrapper = mount(SideBarElement, {
            props: {
                type: 'license',
                text: 'Лицензия',
                color: '#EDE8D8'
            }
        })

        expect(wrapper.find('svg').exists()).toBe(true)
        expect(wrapper.find('path').attributes('stroke')).toBe('#EDE8D8')
    })

    it('отображает иконку типа calendar', () => {
        const wrapper = mount(SideBarElement, {
            props: {
                type: 'calendar',
                text: 'Календарь',
                color: '#FF4646'
            }
        })

        expect(wrapper.find('svg').exists()).toBe(true)
        expect(wrapper.find('path').attributes('stroke')).toBe('#FF4646')
    })

    it('отображает текст элемента', () => {
        const text = 'Тестовый элемент'
        const wrapper = mount(SideBarElement, {
            props: {
                type: 'home',
                text,
                color: '#FF4646'
            }
        })

        expect(wrapper.text()).toContain(text)
    })

    it('применяет цвет к иконке', () => {
        const color = '#FF4646'
        const wrapper = mount(SideBarElement, {
            props: {
                type: 'home',
                text: 'Домой',
                color
            }
        })

        const paths = wrapper.findAll('path')
        paths.forEach(path => {
            expect(path.attributes('stroke')).toBe(color)
        })
    })

    it('вызывает обработчик клика', async () => {
        const wrapper = mount(SideBarElement, {
            props: {
                type: 'home',
                text: 'Домой',
                color: '#FF4646'
            }
        })

        await wrapper.find('.cursor-pointer').trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('применяет hover эффект', () => {
        const wrapper = mount(SideBarElement, {
            props: {
                type: 'home',
                text: 'Домой',
                color: '#FF4646'
            }
        })

        expect(wrapper.find('.hover\\:bg-opacity-25').exists()).toBe(true)
    })
}) 