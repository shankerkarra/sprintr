import { ProxyState } from '../AppState.js'
import Task from '../Models/Task.js'
import { logger } from '../Utils/Logger.js'
import { api } from '../Services/AxiosService.js'

class TaskService {
  async getAllTask() {
    const tasks = await api.get('api/Task')
    ProxyState.tasks = tasks.data.map(b => new Task(b))
    return tasks
  }

  async getTaskById(id) {
    const task = await api.get('api/Task/' + id)
    return task
  }

  async addTask(rawtask) {
    const task = await api.post('api/Task', rawtask)
    ProxyState.tasks = [...ProxyState.tasks, new Task(task.data)]
    return task
  }

  async deleteTask(id) {
    await api.delete('api/Task' + id)
    logger.log('Deleted Successfully')
  }
}

export const taskService = new TaskService()
