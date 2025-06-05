import { vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// Мокаем Nuxt
vi.mock('#app', () => ({
    useNuxtApp: () => ({
        $api: {
            user: {
                getInfo: vi.fn().mockResolvedValue({
                    user_info: {
                        name: 'Test User',
                        image: 'test.jpg'
                    },
                    main_info: {
                        Группа: 'Test Group'
                    },
                    courses: [{
                        title: 'Test Course'
                    }]
                })
            }
        }
    })
}))

// Мокаем #imports
vi.mock('#imports', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
        currentRoute: {
            value: {
                path: '/'
            }
        }
    }),
    useNuxtApp: () => ({
        $api: {
            user: {
                getInfo: vi.fn().mockResolvedValue({
                    user_info: {
                        name: 'Test User',
                        image: 'test.jpg'
                    },
                    main_info: {
                        Группа: 'Test Group'
                    },
                    courses: [{
                        title: 'Test Course'
                    }]
                })
            }
        }
    }),
    ref: (value: unknown) => ({ value })
}))

// Мокаем Vue
vi.mock('vue', async (importOriginal) => {
    const actual = await importOriginal() as unknown
    return {
        ...actual,
        ref: (value: unknown) => ({ value }),
        defineComponent: (options: unknown) => ({
            ...options,
            __vccOpts: options
        }),
        onMounted: vi.fn(),
        onUnmounted: vi.fn(),
        computed: (getter: () => unknown) => ({
            value: getter()
        })
    }
})

// Мокаем Pinia
vi.mock('pinia', async () => {
    const actual = await vi.importActual('pinia')
    return {
        ...actual,
        defineStore: (id: string, setup: unknown) => {
            const store = setup()
            return () => store
        },
        createPinia: () => ({
            install: vi.fn()
        }),
        setActivePinia: vi.fn()
    }
})

// Создаем глобальный экземпляр Pinia
const pinia = createPinia()
setActivePinia(pinia)

// Экспортируем для использования в тестах
export { pinia } 