import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PersonCard from '../PersonCard.vue'
import { Browser } from '@capacitor/browser'

// Мокаем Browser.open
vi.mock('@capacitor/browser', () => ({
    Browser: {
        open: vi.fn()
    }
}))

// Мокаем иконки
const IVk = { template: '<div class="vk-icon"></div>' }
const ITg = { template: '<div class="tg-icon"></div>' }
const IGithub = { template: '<div class="github-icon"></div>' }

describe('PersonCard', () => {
    const defaultProps = {
        name: 'Иван Иванов',
        nickname: '@ivan',
        avatar: 'avatar.jpg',
        github: 'https://github.com/ivan',
        vk: 'https://vk.com/ivan',
        tg: 'https://t.me/ivan'
    }

    it('рендерит все данные пользователя', () => {
        const wrapper = mount(PersonCard, {
            props: defaultProps,
            global: {
                components: { IVk, ITg, IGithub }
            }
        })

        expect(wrapper.find('img').attributes('src')).toBe('/avatar.jpg')
        expect(wrapper.find('img').attributes('alt')).toBe('avatar')
        expect(wrapper.text()).toContain('Иван Иванов')
        expect(wrapper.text()).toContain('@ivan')
    })

    it('отображает все иконки социальных сетей', () => {
        const wrapper = mount(PersonCard, {
            props: defaultProps,
            global: {
                components: { IVk, ITg, IGithub }
            }
        })

        expect(wrapper.find('.vk-icon').exists()).toBe(true)
        expect(wrapper.find('.tg-icon').exists()).toBe(true)
        expect(wrapper.find('.github-icon').exists()).toBe(true)
    })

    it('скрывает иконки, если ссылки не предоставлены', () => {
        const wrapper = mount(PersonCard, {
            props: {
                ...defaultProps,
                vk: '',
                tg: '',
                github: ''
            },
            global: {
                components: { IVk, ITg, IGithub }
            }
        })

        expect(wrapper.find('.vk-icon').exists()).toBe(false)
        expect(wrapper.find('.tg-icon').exists()).toBe(false)
        expect(wrapper.find('.github-icon').exists()).toBe(false)
    })

    it('открывает ссылку при клике на иконку VK', async () => {
        const wrapper = mount(PersonCard, {
            props: defaultProps,
            global: {
                components: { IVk, ITg, IGithub }
            }
        })

        await wrapper.find('.vk-icon').trigger('click')
        expect(Browser.open).toHaveBeenCalledWith({ url: 'https://vk.com/ivan' })
    })

    it('открывает ссылку при клике на иконку Telegram', async () => {
        const wrapper = mount(PersonCard, {
            props: defaultProps,
            global: {
                components: { IVk, ITg, IGithub }
            }
        })

        await wrapper.find('.tg-icon').trigger('click')
        expect(Browser.open).toHaveBeenCalledWith({ url: 'https://t.me/ivan' })
    })

    it('открывает ссылку при клике на иконку GitHub', async () => {
        const wrapper = mount(PersonCard, {
            props: defaultProps,
            global: {
                components: { IVk, ITg, IGithub }
            }
        })

        await wrapper.find('.github-icon').trigger('click')
        expect(Browser.open).toHaveBeenCalledWith({ url: 'https://github.com/ivan' })
    })
}) 