import { AppState, ProxyState } from '../AppState.js'
import Task from '../Models/Task.js'
import { logger } from '../Utils/Logger.js'
import { api } from '../Services/AxiosService.js'

class TaskService {
  async getAll() {
    const res = await api.get('api/tasks')
    logger.log('Get all Task', res.data)
    AppState.task = res.data
  }

  async getTaskById(id) {
    const res = await api.get('api/tasks/' + id)
    logger.log('fetched single task by id', res.data)
    AppState.task = res.data
  }

  async getById(id) {
    const res = await api.get('api/tasks/' + id + '/notes')
    logger.log('fetched Notes by Task Id', res.data)
    AppState.note = res.data
  }

  async create(body) {
    const res = await api.post('api/tasks', body)
    logger.log('Created Task', res.data)
    AppState.task.push(res.data)
  }

  async update(id, body) {
    const res = await api.put('api/tasks/' + id, body)
    logger.log('Updated Task', res.data)
    AppState.task = res.data
  }

  async destroy(id) {
    await api.delete('api/tasks' + id)
    AppState.task = AppState.task.find(t => t.id !== id)
    logger.log('Deleted Successfully')
  }
}

export const taskService = new TaskService()
