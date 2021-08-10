import { AppState } from '../AppState.js'
import { api } from './AxiosService'
import { logger } from '../utils/Logger.js'

class BacklogService {
  async getAll() {
    const res = await api.get('api/backlog')
    logger.log('All the Backlogs : ', res.data)
    AppState.backlogitems = res.data
  }

  async getById(id) {
    const res = await api.get('api/backlog/' + id)
    logger.log('A single Backlog : ', res.data)
    AppState.backlogitems = res.data
  }

  async getTasksbyBacklog(id) {
    const res = await api.get('api/backlog/' + id + '/tasks')
    logger.log('All Tasks for this Backlog : ', res.data)
    AppState.tasks = res.data
  }

  async create(body) {
    const res = await api.post('api/backlog', body)
    logger.log('Added A Backlog : ', res.data)
    AppState.backlogitems.push(res.data)
  }

  async destroy(id) {
    await api.delete('api/backlog/' + id)
    AppState.backlogitems = AppState.backlogitems.find(b => b.id !== id)
    logger.log('Deleted Successfully')
  }

  async update(id, body) {
    const res = await api.put('api/backlog/', +id, body)
    logger.log('Edited A Backlog : ', res.data)
    AppState.backlogitems = res.data
  }
}

export const backlogService = new BacklogService()
