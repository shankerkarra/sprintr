import { backlogService } from '../services/BacklogService'
import { projectService } from '../services/ProjectService'
import { sprintService } from '../services/SprintService'
import { taskService } from '../services/TaskService'
import BaseController from '../utils/BaseController'

export class ProjectController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getAllProjects)
      .get('/:id', this.getById)
      .get('/:id/backlog', this.getAllBackLogItemsByProject)
      .get('/:id/task', this.getAllTasksByProject)
  }
  
  async getAllProjects(req, res, next) {
    try {
      const projects = await projectService.getAll(req.query)
      res.send(projects)
    } catch (error) {
      next('We had trouble getting the projects : ', error)
    }
  }

  async getById(req, res, next) {
    try {
      const project = await projectService.getById(req.params.id)
      res.send(project)
    } catch (error) {
      next('We had trouble getting that projects Id : ',error)
    }
  }

  async getAllBackLogItemsByProject(req, res, next) {
    try {
      const backLog = await backlogService.getAll({ projectId: req.params.id })
      res.send(backLog)
    } catch (error) {
      next('We had trouble getting the tasks of that project : ',error)
    }
  }

  async getAllTasksByProject(req, res, next) {
    try {
      const task = await taskService.getAll({ projectId: req.params.id })
      res.send(task)
    } catch (error) {
      next('We had trouble getting the tasks of that project : ', error)
    }
  }

  async getAllSprintsByProject(req, res, next) {
    try {
      const sprint = await sprintService.getAll({ projectId: req.params.id })
      res.send(sprint)
    } catch (error) {
      next('We had trouble getting the sprints for that project : ', error)
    }
  }

  async create(req, res, next) {
    try {
      const user = req.userInfo
      req.body.creatorId = user.id
      const project = await projectService.create(req.body)
      res.send(project)
    } catch (error) {
      next('We had trouble making that Project : ', error)
    }
  }
}