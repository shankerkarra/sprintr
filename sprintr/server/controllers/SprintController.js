import { sprintService } from '../services/SprintService'
import { taskService } from '../services/TaskService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class SprintController extends BaseController {
  constructor() {
    super('api/sprint')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getAllTasksBySprint)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const sprints = await sprintService.getAll({ creatorId: req.userInfo.id })
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const sprint = await sprintService.getById(req.params.id)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async getAllTasksBySprint(req, res, next) {
    try {
      const task = await taskService.getAll({ sprintId: req.params.id })
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintService.createSprint(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await sprintService.updateSprint(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const user = req.userInfo
      await sprintService.destroy(req.params.id, user)
      res.send({ message: 'That project has been deleted!' })
    } catch (error) {
      next(error)
    }
  }
}
