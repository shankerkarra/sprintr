import { ProxyState } from '../AppState.js'
import { sprintService } from '../Services/SprintService.js'
import { logger } from '../Utils/Logger.js'

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
      const sprints = await sprintService.getAllSprint()
      return sprints
    } catch (error) {
      logger.log(error)
    }
  }

  async getSprintById(id) {
    try {
      const sprint = await sprintService.getsprintById(id)
      return sprint
    } catch (error) {
      logger.log(error)
    }
  }

  async createSprint(rawsprint) {
    try {
      event.preventDefault()
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
      logger.log(error)
    }
  }

  async removeSprint(id) {
    try {
      const sprint = await sprintService.deleteSprint(id)
      return sprint
    } catch (error) {
      logger.log(error)
    }
  }
}
