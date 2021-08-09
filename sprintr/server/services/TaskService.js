import { BadRequest } from '../utils/Errors'
import { dbContext } from '../db/DbContext'

class TaskService {
<<<<<<< HEAD
  async getAll(query = {}) {
    return await dbContext.Task.find(query)
=======
  getAll(arg0) {
    throw new Error('Method not implemented.')
>>>>>>> 1a8b54e488a41a67eaecad5a1e9d26239e3a3c5a
  }

  async getById(id) {
    const task = await dbContext.Task.findById(id)
    if (!task) {
      throw new BadRequest('Invalid ID')
    }
    return task
  }

  async getByProjectId(projectid) {
    const task = await dbContext.Task.findByProjectId(projectid)
    if (!task) {
      throw new BadRequest('Invalid Project ID')
    }
    return task
  }

  async getBySprintId(sprintid) {
    const task = await dbContext.Task.findBySprintId(sprintid)
    if (!task) {
      throw new BadRequest('Invalid Sprint ID')
    }
    return task
  }

  async getByBacklogId(backlogid) {
    const task = await dbContext.Task.findByBacklogId(backlogid)
    if (!task) {
      throw new BadRequest('Invalid Project ID')
    }
    return task
  }

  async getByCreatorId(taskid) {
    const task = await dbContext.Task.findByCreatorId(creatorid)
    if (!task) {
      throw new BadRequest('Invalid Creator ID')
    }
    return task
  }
}

export const taskService = new TaskService()
