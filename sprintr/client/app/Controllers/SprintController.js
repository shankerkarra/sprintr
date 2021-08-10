import { ProxyState } from '../AppState.js'
import { sprintService } from '../Services/SprintService.js'
import logger from '../Utils/Logger.js'

function _drawAllSprint() {
  let template = ''
  ProxyState.sprints.forEach(s => { template += s.template })
  document.getElementById('').innerHTML = template
}
export class SprintController {
  constructor() {
    ProxyState.on('sprints', _drawAllSprint)
  }

  async getallSprint() {
    try {
      const sprints = await sprintService.getallSprint()
      return sprints
    } catch (error) {
      logger.logger('Failed getting All Sprints', error)
    }
  }

  async getSprintById(id) {
    try {
      const sprint = await sprintService.getSprintById(id)
      return sprint
    } catch (error) {
      logger.logger('Failed getting Sprint by Id', error)
    }
  }

  async createSprint(rawsprint) {
    try {
      event.preventDefault();
      const form = event.target
      const rawsprint = {
        name: form.name.value,
        statedate: form.statedate.value,
        enddate: form.enddate.value,
        isOpen: form.isOpen.value,
        projectId: projectId,
        creatorId: user.id
      }
      const sprint = await sprintService.addSprint(rawsprint)
      form.reset
      return sprint
    } catch (error) {
      logger.log('Failed Creating Sprint', error)
    }
  }

  async removeSprint(id) {
    try {
      const sprint = await sprintService.removeSprint(id)
      return sprint
    } catch (error) {
      logger.logger('Failed deleting  Sprint', error)
    }
  }
}
