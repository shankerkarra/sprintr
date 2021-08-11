import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProjectService {
  async getAll() {
    const res = await api.get('api/projects')
    logger.log('All the projects : ', res.data)
    AppState.projects = res.data
  }

  async getById(id) {
    const res = await api.get('api/projects/' + id)
    logger.log('A single project : ', res.data)
    AppState.activeProject = res.data
  }

  async getBacklogByProject(id) {
    const res = await api.get('api/projects/' + id + '/backlog')
    logger.log('All the Backlogs Items on this Project : ', res.data)
    AppState.backlogitems = res.data
    this.getById(id)
  }

  async getSprintsByProject(id) {
    const res = await api.get('api/projects/' + id + '/sprint')
    logger.log('All the Sprint Items on this Project : ', res.data)
    AppState.sprints = res.data
  }

  async getTasksByProject(id) {
    const res = await api.get('api/projects/' + id + '/task')
    logger.log('All the Tasks Items on this Project : ', res.data)
    AppState.tasks = res.data
  }

  async create(body) {
    const res = await api.post('api/projects', body)
    logger.log('Added A project : ', res.data)
    AppState.projects.push(res.data)
    return res.data.id
  }

  async destroy(id) {
    await api.delete('api/projects/' + id)
    AppState.projects = AppState.projects.filter(p => p.id !== id)
    logger.log('Deleted Successfully')
  }

  async update(id, body) {
    const res = await api.put('api/projects/' + id, body)
    logger.log('Edited A project : ', res.data)
    AppState.project = res.data
  }
}
export const projectService = new ProjectService()
