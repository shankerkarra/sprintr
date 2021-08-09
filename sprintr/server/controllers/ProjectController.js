import BaseController from '../utils/BaseController'

export class ProjectController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getAllProjects)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getAllTasksByProject)
  }
  
  async getAllProjects(req, res, next) {
    try {
      const project = await 
    } catch (error) {
      next('We had trouble getting the projects : ', error)
    }
  }

  async getById(req, res, next) {
    try {
      
    } catch (error) {
      next('We had trouble getting that projects Id : ',error)
    }
  }

  async getAllTasksByProject(req, res, next) {
    try {
      
    } catch (error) {
      next('We had trouble getting the tasks of that project : ',error)
    }
  }
}