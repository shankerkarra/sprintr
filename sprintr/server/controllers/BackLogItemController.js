import BaseController from "../utils/BaseController"

export class BackLogItemController extends BaseController{
  constructor() {
    super('api/backlog')
    this.router
      .get('')
      .get('/:id')
      .get('/:id/tasks')
      .post
  }
}