import { API } from '../api'
import type { TCourses, TDays } from '~/types/timetable'

class TimetableModule extends API {
  async getCourses(branch_id: number) {
    return await this.get<TCourses>(`/timetable/students/courses/${branch_id}`)
  }

  async getTimetable(branch_id: number, group_id: number, numberOfWeek: number) {
    return await this.get(
      `/timetable/students/courses/${branch_id}/group/${group_id}${numberOfWeek !== undefined ? `/week/${numberOfWeek}` : ''}`,
    )
  }

  async getClassrooms() {
    return await this.get(`/timetable/classrooms/`)
  }

  async getFreeClassrooms(time: string) {
    return await this.get(`/timetable/classrooms/free?time=${time}`)
  }

  async getClassroom(name: string) {
    return await this.get<TDays>(`/timetable/classrooms/room/${name}`)
  }

  async getTeacherTimetable(branch_id: number, teacher_id: number) {
    return await this.get(
      `/teachers/${branch_id}/id${teacher_id}`,
    )
  }

  async getTeachers(branch_id: number) {
    return await this.get(`/teachers/${branch_id}`)
  }
}

export default TimetableModule
