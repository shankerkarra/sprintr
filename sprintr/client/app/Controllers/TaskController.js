import { ProxyState } from '../AppState.js'
import { taskService } from '../Services/TaskService.js'
import { logger } from '../Utils/Logger.js'

function _drawAllTasks() {
  let template = ''
  ProxyState.tasks.forEach(t => { template += t.template })
  document.getElementById('').innerHTML = template
}

export class TaskController {
  constructor() {
    ProxyState.on('tasks', _drawAllTasks)
  }

  async getallTasks() {
    try {
      const tasks = await taskService.getAllTask()
      return tasks
    } catch (error) {
      logger.logger(error)
    }
  }

  async getTaskById(id) {
    try {
      const task = await taskService.getTaskById(id)
      return task
    } catch (error) {
      logger.logger(error)
    }
  }

  async addTasks() {
    try {
      event.preventDefault()
      const form = event.target
      const rawtask = {
        status: form.status.value,
        weight: form.weight.value,
        projectId: projectId,
        sprintId: sprintId,
        backlogId: backlogId,
        creatorId: user.id
      }
      const task = await taskService.addTask(rawtask)
      form.reset
      return task
    } catch (error) {
      logger.log(error)
    }
  }

  async removeTask(id) {
    try {
      const task = await taskService.deleteTask(id)
      return task
    } catch (error) {
      logger.log(error)
    }
  }
}
