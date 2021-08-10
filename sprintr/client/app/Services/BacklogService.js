import { ProxyState } from '../AppState.js'
import Backlog from '../Models/Backlog.js'
import { logger } from '../Utils/Logger.js'
import { api } from '../Services/AxiosService.js'

class BacklogService {
  async getAllBacklog() {
    const backlogs = await api.get('api/backlog')
    ProxyState.backlogs = backlogs.data.map(b => new Backlog(b))
    return backlogs
  }

  async getBacklogById(id) {
    const backlog = await api.get('api/backlog/' + id)
    return backlog
  }

  async addBacklog(rawbacklog) {
    const backlog = await api.post('api/backlog', rawbacklog)
    ProxyState.backlogs = [...ProxyState.backlogs, new Backlog(backlog.data)]
    return backlog
  }

  async deleteBacklog(id) {
    await api.deleteBacklog('api/backlog' + id)
    logger.log('Deleted Successfully')
  }
}

export const backlogService = new BacklogService()
