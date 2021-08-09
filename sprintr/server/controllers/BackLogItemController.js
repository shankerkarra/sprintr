import { backlogService } from '../services/BacklogService'
import { taskService } from '../services/TaskService'
import BaseController from '../utils/BaseController'

export class BackLogItemController extends BaseController {
  constructor() {
    super('api/backlog')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getAllTasksByBacklog)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const backlogs = await backlogService.getAll(req.query)
      res.send(backlogs)
    } catch (error) {
      next('We had a problem getting the Backlog Items : ', error)
    }
  }

  async getById(req, res, next) {
    try {
      const backlog = await backlogService.getById(req.params.id)
      res.send(backlog)
    } catch (error) {
      next('We had a problem getting that Backlog Item : ', error)
    }
  }

  async getAllTasksByBacklog(req, res, next) {
    try {
      const task = await taskService.getAll({ backlogId: req.params.id })
      res.send(task)
    } catch (error) {
      next('We had a problem getting those Tasks for this Backlog Item : ', error)
    }
  }

  async create(req, res, next) {
    try {
      const backlog = await backlogService.createBacklog(req.body)
      res.send(backlog)
    } catch (error) {
      next('We had a problem creating that Backlog Item : ', error)
    }
  }
}
