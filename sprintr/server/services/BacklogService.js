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
    const backlog = await dbContext.Backlog.findBacklogByProjectId(projectid)
    if (!backlog) {
      throw new BadRequest('Invalid Backlog by Project ID')
    }
    return backlog
  }

  async getBacklogByCreatorId(creatorid) {
    const backlog = await dbContext.Backlog.findBacklogByCreatorId(creatorid)
    if (!backlog) {
      throw new BadRequest('Invalid Backlog by Creator ID')
    }
    return backlog
  }

  async createBacklog(body) {
    return await dbContext.Backlog.create(body)
  }

  async updateBacklog(body) {
    const backlog = await dbContext.Backlog.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!backlog) {
      throw new BadRequest('Invalid Backlog ID')
    }
    return backlog
  }

  async destroy(id, user) {
    const backlog = await this.getById(id)
    if (user.id === backlog.creatorId.toString()) {
      await this.getById(id)
      return await dbContext.Backlog.findByIdAndDelete(id)
    }
  }
}

export const backlogService = new BacklogService()