import { ProxyState } from '../AppState.js'
import { backlogService } from '../Services/BacklogService.js'
import logger from '../Utils/Logger.js'

function _drawAllBackLog() {
  let template = ''
  ProxyState.backlogs.forEach(b => {
    template += b.template
  })
  document.getElementById('').innerHTML = template
}

export class BacklogController{
  constructor() {
    ProxyState.on('backlogs', _drawAllBackLog)
  }

  async getAllBacklog() {
    try {
      const backlogs = await backlogService.getAllBacklog()
      return backlogs
      } catch (error) {
      logger.logger('Failed getting All Backlog', error)
    }
  }
  async getBacklogById(id) {
    try {
      const backlog = await backlogService.getBacklogById(id)
      return backlog
    } catch (error) {
      logger.logger('Failed getting Backlog by Id', error)
    }
  }
  async addBacklog() {
    try {
      event.preventDefault();
      const form = event.target
      const rawbacklog = {
        name: form.name.value,
        body: form.body.value,
        isOpen: form.isOpen.value,
        projectId: projectId,
        creatorId:user.id
      }
      const backlog = await backlogService.addBacklog(rawbacklog)
      form.reset
      return backlog
    } catch (error){
      logger.logger('Failed creating Backlog', error)
    }
  }

  async removeBacklog(id) {
    try {
      const backlog = await backlogService.deleteBacklog(id)
      return backlog
    } catch (error) {
      logger.logger('Failed removing Bakclog', error)
    }
  }
}
