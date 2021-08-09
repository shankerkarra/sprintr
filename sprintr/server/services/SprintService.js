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
}

export const sprintService = new SprintService()
