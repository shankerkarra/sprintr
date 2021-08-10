import { ProxyState } from '../AppState.js'
import Sprint from '../Models/Sprint.js'
import { logger } from '../Utils/Logger.js'
import { api } from '../AxiosService.js'

class SprintService {
  async getAllSprint() {
    const sprints = await api.get('api/sprint')
    ProxyState.Sprints = sprints.data.map(b => new Sprint(b))
    return sprints
  }

  async getsprintById(id) {
    const sprints = await api.get('api/sprints/' + id)
    return sprints
  }

  async addSprint(rawsprint) {
    const sprint = await api.post('api/sprints', rawsprint)
    ProxyState.sprints = [...ProxyState.sprints, new Sprint(sprint.data)]
    return sprint
  }

  async deleteSprint(id) {
    await api.delete('api/sprints' + id)
    logger.log('Deleted Successfully')
  }
}

export const sprintService = new SprintService()
