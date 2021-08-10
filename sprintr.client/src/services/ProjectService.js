import { AppState } from "../AppState.js"
import { logger } from '../utils/Logger'
import {api} from './AxiosService'

class ProjectService {
  async getAllProject(query) {
    const res = await api.get('api/projects')
    logger.log('All the projects : ', res.data)
    AppState.projects = res.data
  }

  async getProjectById(id) {
    const res = await api.get('api/projects/' + id)
    logger.log('A single project : ', res.data)
    AppState.project = res.data
  }

  async addProject(body) {
    const res = await api.post('api/projects', body)
    logger.log('Added A project : ', res.data)
    AppState.project.push(res.data)
    return res.data.id
  }

  async removeProject(id) {
    await api.delete('api/projects/' + id)
    AppState.project = AppState.project.find(p => p.id !== id)
    logger.log('Deleted Successfully')
  }

  async editProject(id, body) {
    const res = api.put('api/projects/' + id, body)
    logger.log('Edited A project : ', res.data)
    AppState.project = res.data
  }
}
export const projectService = new ProjectService()
