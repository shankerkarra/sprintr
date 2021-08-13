import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SprintService {
  async getAll() {
    const res = await api.get('api/sprint')
    AppState.sprints = res.data
  }

  async getById(id) {
    const res = await api.get('api/sprint/' + id)
    logger.log('Fetched single data', res.data)
    AppState.sprints = res.data
  }

  async getTaskBySprint(id) {
    const res = await api.get('api/sprint/' + id + '/tasks')
    logger.log('All Tasks for the SPrint', res.data)
    AppState.tasks = res.data
  }

  async create(body) {
    const res = await api.post('api/sprint', body)
    logger.log('Created Sprint', res.data)
    AppState.sprints.push = res.data
  }

  async update(id, body) {
    const res = await api.put('api/sprint/' + id, body)
    logger.log('Updated Sprint', res.data)
    AppState.sprints = res.data
  }

  async destroy(id) {
    await api.delete('api/sprint/' + id)
    AppState.sprints = AppState.sprints.filter(s => s.id !== id)
    logger.log('Deleted Sucessfully')
  }
}

export const sprintService = new SprintService()
