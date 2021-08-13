import { AppState } from '../AppState.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService'

class TaskService {
  async getTaskById(id) {
    const res = await api.get('api/tasks/' + id)
    logger.log('fetched single task by id', res.data)
    AppState.activeTask = res.data
  }

  async getNotesByTasks(id) {
    const res = await api.get('api/tasks/' + id + '/notes')
    logger.log('fetched Notes by Task Id', res.data)
    AppState.notes = res.data
  }

  async create(body) {
    logger.log('Service Layer', body)
    const res = await api.post('api/tasks', body)
    logger.log('Created Task', res.data)
    AppState.tasks.push(res.data)
  }

  async update(id, body) {
    const res = await api.put('api/tasks/' + id, body)
    logger.log('Updated Task', res.data)
    AppState.activeTask = res.data
  }

  async destroy(id) {
    await api.delete('api/tasks/' + id)
    AppState.tasks = AppState.tasks.filter(t => t.id !== id)
    logger.log('Deleted Successfully')
  }
}

export const taskService = new TaskService()
