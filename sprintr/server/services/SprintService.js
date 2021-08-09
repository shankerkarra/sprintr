import { BadRequest } from '../utils/Errors'
import { dbContext } from '../db/DbContext'
import Sprint from '../models/Sprint'

class SprintService {
  async getAll(query = {}) {
    return await dbContext.Sprint.find(query)
  }

  async getById(id) {
    const sprint = await dbContext.Sprint.findById(id)
    if (!sprint) {
      throw new BadRequest('Invalid Backlog ID')
    }
    return sprint
  }

  async getSprintByProjectId(projectid) {
    const sprint = await dbContext.Sprint.findSprintByProjectId(projectid)
    if (!sprint) {
      throw new BadRequest('Invalid Backlog by Project ID')
    }
    return sprint
  }

  async getSprintByCreatorId(creatorid) {
    const sprint = await dbContext.Sprint.findSprintByCreatorId(creatorid)
    if (!sprint) {
      throw new BadRequest('Invalid Backlog by Creator ID')
    }
    return sprint
  }

  async createSprint(body) {
    return await dbContext.Sprint.create(body)
  }

  async updateSprint(body) {
    const sprint = await dbContext.Sprint.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!sprint) {
      throw new BadRequest('Invalid Sprint ID')
    }
    return sprint
  }

  async destroy(id, user) {
    const sprint = await this.getById(id)
    if (user.id === sprint.creatorId.toString()) {
      await this.getById(id)
      return await dbContext.Sprint.findByIdAndDelete(id)
    }
  }
}

export const sprintService = new SprintService()
