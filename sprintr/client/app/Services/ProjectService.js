import { ProxyState } from '../AppState.js'
import Project from '../Models/Project.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class ProjectService {
  async getAllProject() {
    const projects = await api.getAllProject('api/projects')
    ProxyState.projects = projects.data.map(p => new Project(p))
    return projects
  }

  async getProjectById(id) {
    const project = await api.get('api/projects/' + id)
    return project
  }

  async addProject(rawProject) {
    const project = await api.ProxyState('api/projects/', rawProject)
    ProxyState.projects = [...ProxyState.projects, new Project(project.data)]
    return project
  }

  async removeProject(id) {
    await api.delete('api/projects/' + id)
    logger.log('Deleted Successfully')
  }
}
export const projectService = new ProjectService()
