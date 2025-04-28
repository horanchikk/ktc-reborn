export interface TCourses {
  title: string
  groups: TGroup[]
}

export interface TGroup {
  id: number
  title: string
}

export interface TDays {
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  number: string
  available: boolean
  start: string
  end: string
  title?: string
  teacher?: string
  group?: string
}
