import { backlogService } from '../services/BacklogService'
import { projectService } from '../services/ProjectService'
import { sprintService } from '../services/SprintService'
import { taskService } from '../services/TaskService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ProjectController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getAllProjects)
      .get('/:id', this.getById)
      .get('/:id/backlog', this.getAllBackLogItemsByProject)
      .get('/:id/task', this.getAllTasksByProject)
      .post('', this.create)
      .put('/:id', this.edit)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.destroy)
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
      next('We had trouble getting that projects Id : ', error)
    }
  }

  async getAllBackLogItemsByProject(req, res, next) {
    try {
      const backLog = await backlogService.getAll({ projectId: req.params.id })
      res.send(backLog)
    } catch (error) {
      next('We had trouble getting the tasks of that project : ', error)
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
      const project = await projectService.createProject(req.body)
      res.send(project)
    } catch (error) {
      next('We had trouble making that Project : ', error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await projectService.updateProject(req.body)
      res.send(project)
    } catch (error) {
      next('We had trouble editing that Project', error)
    }
  }

  async destroy(req, res, next) {
    try {
      const user = req.userInfo
      await projectService.destroy(req.params.id, user)
      res.send({ message: 'That project has been deleted!' })
    } catch (error) {
      next('We had trouble deleting that Project', error)
    }
  }
}
