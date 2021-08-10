import { ProxyState } from '../AppState.js'
import { projectService} from '../Services/ProjectService.js'
import logger from '../Utils/logger.js'

function _drawAllProjects() {
  let template = ''
  ProxyState.projects.forEach(p => { template += p.template })
 document.getElementById('').innerHTML = template
}

function _drawCreateProject() {
  let template = ''
  template += '
  <div></div>
  '

  document.getElementById('').innerHTML = template
 }

export class ProjectController {
  constructor() {
    ProxyState.on('projects', _drawAllProjects)
  }

  async getAllProjects() {
    try {
      const projects = await projectService.getAllProjects()
      return projects
    } catch (error) {
      logger.logger('Failed getting all Projects',error)
    }
  }

  async getProjectById(id) {
    try {
      const project = await projectService.getProjectById(id)
      return project
    } catch (error) {
      logger.logger('Failed getting Project by ID', error)
    }
  }
  async addProject(id) {
    try {
      const project = await projectService.addProject(id)
      return project
    } catch (error) {
      logger.logger('Failed adding Project', error)
    }
  }

  async addProject(id) {
    try {
      const project = await projectService.addProject(id)
      return project
    } catch (error) {
      logger.logger('Failed adding Project', error)
    }
  }

  async removeProject() {
    try {
      const project = await projectService.removeProject(id)
      return project
    } catch (error) {
      logger.logger('Failed removing Project', error)
    }
   }
 }
