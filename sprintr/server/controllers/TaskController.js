import { noteService } from "../services/NoteService";
import { taskService } from "../services/TaskService";
import BaseController from "../utils/BaseController";

export class TaskController extends BaseController{
  constructor() {
    super()
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getAllNotesByTask)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const tasks = await taskService.getAll(req.query)
      res.send(tasks)
    } catch (error) {
      next('We had trouble getting the Tasks : ', error)
    }
  }

  async getById(req, res, next) {
    try {
      const task = await taskService.getById(req.params.id)
      res.send(task)
    } catch (error) {
      next('We had trouble getting That Task : ', error)
    }
  }

  async getAllNotesByTask(req, res, next) {
    try {
      const note = await noteService.getAll({ taskId: req.params.id })
      res.send(note)
    } catch (error) {
      next('We had trouble getting The Notes for that Task : ', error)
    }
  }

  async create(req, res, next) {
    try {
      const task = await taskService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next('We had trouble creating that Task : ', error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await taskService.updateTask(req.body)
      res.send(project)
    } catch (error) {
      next('We had trouble editing that Project', error)
    }
  }

  async destroy(req, res, next) {
    try {
      await taskService.destroy(req.params.id)
      res.send({message: 'That project has been deleted!'})
    } catch (error) {
      next('We had trouble deleting that Project', error)
    }
  }
}