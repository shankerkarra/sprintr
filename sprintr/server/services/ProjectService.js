import { BadRequest } from '../utils/Errors'
import { dbContext } from '../db/DbContext'
import { ProjectController } from '../controllers/ProjectController'
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

  async createProject(body) {
    return await dbContext.Project.create(body)
  }

  async updateProject(body) {
    const project = await dbContext.Project.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!project) {
      throw new BadRequest('Invalid Project ID')
    }
    return project
  }

  async destroy(id, user) {
    const project = await this.getById(id)
    if (user.id === project.creatorId.toString()) {
      await this.getById(id)
      return await dbContext.Project.findByIdAndDelete(id)
    }
  }
}
export const projectService = new ProjectService()
