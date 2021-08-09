import { sprintService } from "../services/SprintService";
import { taskService } from "../services/TaskService";
import BaseController from "../utils/BaseController";

export class SprintController extends BaseController{
  constructor() {
    super('api/sprint')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getAllTasksBySprint)
      .post('', this.create)
  }
  async getAll(req, res, next) {
    try {
      const sprints = await sprintService.getAll(req.query)
      res.send(sprints)
    } catch (error) {
      next('We had a problem getting the Sprints : ', error)
    }
  }
  async getById(req, res, next) {
    try {
      const sprint = await sprintService.getById(req.params.id)
      res.send(sprint)
    } catch (error) {
      next('We had a problem getting that Sprint : ', error)
    }
  }
  async getAllTasksBySprint(req, res, next) {
    try {
      const task = await taskService.getAll({ sprintId: req.params.id })
      res.send(task)
    } catch (error) {
      next('We had a problem getting the Tasks for that Sprint', error)
    }
  }
  async create(req, res, next) {
    try {
      const sprint = await sprintService.createSprint(req.body)
      res.send(sprint)
    } catch (error) {
      next('We had a problem creating that Sprint', error)
    }
  }
}