import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactItem from '../Contact/Item.vue'

describe('ContactItem', () => {
    const mockContact = {
        address: 'Test Address',
        email: 'test@example.com',
        full_name: 'Test User',
        phones: ['+7 (999) 123-45-67'],
        post: 'Test Post'
    }

    it('отображает информацию о контакте', () => {
        const wrapper = mount(ContactItem, {
            props: {
                contact: mockContact
            }
        })

        expect(wrapper.text()).toContain(mockContact.full_name)
        expect(wrapper.text()).toContain(mockContact.post)
        expect(wrapper.text()).toContain(mockContact.email)
        expect(wrapper.text()).toContain(mockContact.phones[0])
    })

    it('отображает один телефон', () => {
        const wrapper = mount(ContactItem, {
            props: {
                contact: mockContact
            }
        })

        expect(wrapper.text()).toContain('Телефон:')
        expect(wrapper.findAll('p').length).toBeGreaterThanOrEqual(3) // full_name, post, email, phone
    })

    it('отображает несколько телефонов', () => {
        const contactWithMultiplePhones = {
            ...mockContact,
            phones: ['+7 (999) 123-45-67', '+7 (999) 765-43-21']
        }

        const wrapper = mount(ContactItem, {
            props: {
                contact: contactWithMultiplePhones
            }
        })

        expect(wrapper.text()).toContain('Телефоны:')
        expect(wrapper.findAll('p').length).greaterThanOrEqual(3) // full_name, post, email, phones label, phone
        expect(wrapper.text()).toContain(contactWithMultiplePhones.phones[0])
        expect(wrapper.text()).toContain(contactWithMultiplePhones.phones[1])
    })

    it('создает правильную ссылку на почту', () => {
        const wrapper = mount(ContactItem, {
            props: {
                contact: mockContact
            }
        })

        const emailLink = wrapper.find('a')
        expect(emailLink.attributes('href')).toBe(`mailto:${mockContact.email}`)
    })

    it('применяет правильные стили', () => {
        const wrapper = mount(ContactItem, {
            props: {
                contact: mockContact
            }
        })

        expect(wrapper.classes()).toContain('bg-opacity-20')
        expect(wrapper.classes()).toContain('rounded-md')
        expect(wrapper.find('.text-xl').exists()).toBe(true)
        expect(wrapper.find('.text-sm').exists()).toBe(true)
    })
}) 