import { ProxyState } from ''../AppState.js'
import { taskService } form '../Services/TaskService.js'
import logger from '../Utils/Logger.js'

function _drawAllTasks() {
  let template = ''
  ProxyState.tasks.forEach(t => { template += t.template })
  document.getElementById('').innerHTML = template
}

export class TaskController{

  constructor() {
    ProxyState.on ('tasks', _drawAllTasks)
  }
  async getallTasks() {
    try {
      const tasks = await taskService.getallTasks()
      return tasks
  } catch(error){
     logger.logger('Failed getting all Tasks', error)
    }
  }

  async getTaskById(id) {
    try {
      const task = await taskService.getTaskById(id)
      return task
    } catch (error) {
      logger.logger('Failed getting Task by Id',error)
    }
  }

  async addTasks() {
    try {
      event.preventDefault();
      const form = event.target
      const rawtask = {
        status: form.status.value,
          weight: form.weight.value,
        projectId: projectId,
          sprintId: sprintId,
        backlogId: backlogId,
        creatorId: user.id,
      }
      const task = await taskService.addTasks(rawtask)
      form.reset
      return task
    } catch (error) {
      logger.log('Failed creating Task', error)
    }
  }

  async removeTask(id)
  try {
    const task = await taskService.removeTask(id)
    return task
  } catch (error) {
    logger.log('Failed removing task', error)
  }

}
