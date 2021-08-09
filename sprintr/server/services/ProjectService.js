import { BadRequest } from '../utils/Errors'
import { dbContext } from '../db/DbContext'

class ProjectService {
  async getAll(query = {}) {
    return await dbContext.Project.find(query)
  }

  async getById(id) {
    const project = await dbContext.Project.findById(id)
    if (!project) {
      throw new BadRequest('Invalid Project ID')
    }
    return project
  }
}

export const projectService = new ProjectService()
