import { noteService } from '../services/NoteService'
import { taskService } from '../services/TaskService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TaskController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getAllNotesByTask)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const tasks = await taskService.getAll({ creatorId: req.userInfo.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const task = await taskService.getById(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByTask(req, res, next) {
    try {
      const note = await noteService.getAll({ taskId: req.params.id })
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await taskService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await taskService.updateTask(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await taskService.destroy(req.params.id)
      res.send({ message: 'That project has been deleted!' })
    } catch (error) {
      next(error)
    }
  }
}
