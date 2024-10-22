export interface UserData {
  main_info: MainInfo
  user_info: UserInfo
  today: Today
  courses: Course[]
}

export interface MainInfo {
  'Специальность': string
  'форма обучения': string
  'Группа': string
  'Классный руководитель': string
}

export interface UserInfo {
  name: string
  image: string
}

export interface Today {
  title: string
  lessons: Lesson[]
  minutes: number
}

export interface Lesson {
  number: string
  lesson_time: string[]
  teacher: string
  title: string
  classroom: string
}

export interface Course {
  title: string
  courses: Course2[]
}

export interface Course2 {
  title: string
  teacher: string
}
