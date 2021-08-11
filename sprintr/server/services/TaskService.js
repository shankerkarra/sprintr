import { BadRequest } from '../utils/Errors'
import { dbContext } from '../db/DbContext'

class TaskService {
  async getById(id) {
    const task = await dbContext.Task.findById(id)
    if (!task) {
      throw new BadRequest('Invalid ID')
    }
    return task
  }

  async getByProjectId(projectid) {
    const task = await dbContext.Task.findById(projectid)
    if (!task) {
      throw new BadRequest('Invalid Project ID')
    }
    return task
  }

  async getBySprintId(sprintid) {
    const task = await dbContext.Task.findById(sprintid)
    if (!task) {
      throw new BadRequest('Invalid Sprint ID')
    }
    return task
  }

  async getByBacklogId(backlogid) {
    const task = await dbContext.Task.findById(backlogid)
    if (!task) {
      throw new BadRequest('Invalid Project ID')
    }
    return task
  }

  async getByCreatorId(taskid) {
    const task = await dbContext.Task.findById(taskid)
    if (!task) {
      throw new BadRequest('Invalid Creator ID')
    }
    return task
  }

  async createTask(body) {
    return await dbContext.Task.create(body)
  }

  async updateTask(body) {
    const task = await dbContext.Task.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!task) {
      throw new BadRequest('Invalid Backlog ID')
    }
    return task
  }

  async destroy(id, user) {
    const task = await this.getById(id)
    if (user.id === task.creatorId.toString()) {
      await this.getById(id)
      return await dbContext.Task.findByIdAndDelete(id)
    }
  }
}

export const taskService = new TaskService()
