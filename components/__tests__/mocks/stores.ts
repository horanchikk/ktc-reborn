import { vi } from 'vitest'

export const mockSideBar = {
    isRendered: false,
    isVisible: false,
    show: vi.fn(),
    hide: vi.fn()
}

export const mockHeader = {
    menu: [
        {
            text: 'Test Action',
            action: vi.fn()
        }
    ]
}

export const mockUser = {
    avatar: 'test-avatar.jpg',
    fullName: 'Test User',
    group: 'Test Group',
    course: 1,
    logout: vi.fn()
}

export const mockDebug = {
    isVisible: false,
    show: vi.fn(),
    hide: vi.fn()
}

// Мокаем импорты сторов
vi.mock('~/store/useSideBar', () => ({
    useSideBar: () => mockSideBar
}))

vi.mock('~/store/useHeader', () => ({
    useHeader: () => mockHeader
}))

vi.mock('~/store/useUser', () => ({
    useUser: () => mockUser
}))

vi.mock('~/store/useDebug', () => ({
    useDebug: () => mockDebug
})) 