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
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
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

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await backlogService.updateBacklog(req.body)
      res.send(project)
    } catch (error) {
      next('We had trouble editing that Project', error)
    }
  }

  async destroy(req, res, next) {
    try {
      await backlogService.destroy(req.params.id)
      res.send({message: 'That project has been deleted!'})
    } catch (error) {
      next('We had trouble deleting that Project', error)
    }
  }
}
