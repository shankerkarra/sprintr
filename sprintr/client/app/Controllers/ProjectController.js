import { ProxyState } from '../AppState.js'
import { projectService } from '../Services/ProjectService.js'
import { logger } from '../Utils/logger.js'

function _drawAllProjects() {
  let template = ''
  ProxyState.projects.forEach(p => { template += p.template })
  document.getElementById('').innerHTML = template
}

export class ProjectController {
  constructor() {
    ProxyState.on('projects', _drawAllProjects)
  }

  async getAllProjects() {
    try {
      const projects = await projectService.getAllProject()
      return projects
    } catch (error) {
      logger.log(error)
    }
  }

  async getProjectById(id) {
    try {
      const project = await projectService.getProjectById(id)
      return project
    } catch (error) {
      logger.log(error)
    }
  }

  async addProject() {
    try {
      event.preventDefault()
      const form = event.target
      const rawproject = {
        name: form.name.value,
        description: form.description.value
      }
      const project = await projectService.addProject(rawproject)
      form.reset
      return project
    } catch (error) {
      logger.log(error)
    }
  }

  async removeProject(id) {
    try {
      const project = await projectService.removeProject(id)
      return project
    } catch (error) {
      logger.log(error)
    }
  }
}
