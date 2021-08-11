import { backlogService } from '../services/BacklogService'
import { taskService } from '../services/TaskService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class BackLogItemController extends BaseController {
  constructor() {
    super('api/backlog')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getAllTasksByBacklog)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const backlogs = await backlogService.getAll(req.query)
      res.send(backlogs)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const backlog = await backlogService.getById(req.params.id)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async getAllTasksByBacklog(req, res, next) {
    try {
      const task = await taskService.getAll({ backlogId: req.params.id })
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const backlog = await backlogService.createBacklog(req.body)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await backlogService.updateBacklog(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const user = req.userInfo
      await backlogService.destroy(req.params.id, user)
      res.send({ message: 'That project has been deleted!' })
    } catch (error) {
      next(error)
    }
  }
}
