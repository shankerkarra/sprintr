import { BadRequest } from '../utils/Errors'
import { dbContext } from '../db/DbContext'

class BacklogService {
  async getAll(query = {}) {
    return await dbContext.Backlog.find(query)
  }

  async getById(id) {
    const backlog = await dbContext.Backlog.findById(id)
    if (!backlog) {
      throw new BadRequest('Invalid Backlog ID')
    }
    return backlog
  }

  async getBacklogByProjectId(projectid) {
    const backlog = await dbContext.Backlog.findByProjectId(Projectid)
    if (!backlog) {
      throw new BadRequest('Invalid Backlog by Project ID')
    }
    return backlog
  }

  async getBacklogByCreatorId(creatorid) {
    const backlog = await dbContext.Backlog.findByProjectId(Creatorid)
    if (!backlog) {
      throw new BadRequest('Invalid Backlog by Creator ID')
    }
    return backlog
  }
}

export const backlogService = new BacklogService()
