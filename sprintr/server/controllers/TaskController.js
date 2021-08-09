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
      
    } catch (error) {
      next('', error)
    }
  }

  async create(req, res, next) {
    try {
      
    } catch (error) {
      next('', error)
    }
  }
}