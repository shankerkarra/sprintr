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

  async getBacklogByProjectId(projectid) {
    const sprint = await dbContext.Sprint.findByProjectId(Projectid)
    if (!sprint) {
      throw new BadRequest('Invalid Backlog by Project ID')
    }
    return sprint
  }

  async getBacklogByCreatorId(creatorid) {
    const sprint = await dbContext.Sprint.findByProjectId(Creatorid)
    if (!sprint) {
      throw new BadRequest('Invalid Backlog by Creator ID')
    }
    return sprint
  }
}

export const sprintService = new SprintService()
