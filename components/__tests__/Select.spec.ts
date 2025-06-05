import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '../Base/Select.vue'

describe('Select', () => {
    it('рендерит список строковых опций', () => {
        const options = ['Опция 1', 'Опция 2', 'Опция 3']
        const wrapper = mount(Select, {
            props: {
                data: options
            }
        })

        expect(wrapper.findAll('p').length).toBe(3)
        expect(wrapper.text()).toContain('Опция 1')
        expect(wrapper.text()).toContain('Опция 2')
        expect(wrapper.text()).toContain('Опция 3')
    })

    it('рендерит список объектов с id и name', () => {
        const options = [
            { id: 1, name: 'Опция 1' },
            { id: 2, name: 'Опция 2' },
            { id: 3, name: 'Опция 3' }
        ]
        const wrapper = mount(Select, {
            props: {
                data: options,
                id: 'id',
                name: 'name'
            }
        })

        expect(wrapper.findAll('p').length).toBe(3)
        expect(wrapper.text()).toContain('Опция 1')
        expect(wrapper.text()).toContain('Опция 2')
        expect(wrapper.text()).toContain('Опция 3')
    })

    it('выбирает опцию при клике', async () => {
        const options = ['Опция 1', 'Опция 2', 'Опция 3']
        const wrapper = mount(Select, {
            props: {
                data: options
            }
        })

        await wrapper.findAll('div')[1].trigger('click')
        expect(wrapper.vm.selected).toBe('Опция 1')
        await wrapper.findAll('div')[2].trigger('click')
        expect(wrapper.vm.selected).toBe('Опция 2')
    })

    it('выбирает объект при клике', async () => {
        const options = [
            { id: 1, name: 'Опция 1' },
            { id: 2, name: 'Опция 2' },
            { id: 3, name: 'Опция 3' }
        ]
        const wrapper = mount(Select, {
            props: {
                data: options,
                id: 'id',
                name: 'name'
            }
        })

        await wrapper.findAll('div')[1].trigger('click')
        expect(wrapper.vm.selected).toBe(1)
        await wrapper.findAll('div')[2].trigger('click')
        expect(wrapper.vm.selected).toBe(2)
    })

    it('применяет правильные стили для выбранной опции', async () => {
        const options = ['Опция 1', 'Опция 2', 'Опция 3']
        const wrapper = mount(Select, {
            props: {
                data: options
            }
        })

        await wrapper.findAll('div')[2].trigger('click')
        const selectedOption = wrapper.findAll('p')[1]
        expect(selectedOption.classes()).toContain('text-primary')
    })

    it('отображает галочку для выбранной опции', async () => {
        const options = ['Опция 1', 'Опция 2', 'Опция 3']
        const wrapper = mount(Select, {
            props: {
                data: options
            }
        })

        await wrapper.findAll('div')[2].trigger('click')
        const checkmark = wrapper.findAll('path')[1]
        expect(checkmark.attributes('stroke')).toBe('#FF4646')
    })
}) 