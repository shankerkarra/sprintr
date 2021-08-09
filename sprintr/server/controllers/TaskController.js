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

  async getAll() {
    
  }

  async getById() {
    
  }

  async getAllNotesByTask() {
    
  }
}