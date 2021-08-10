import { ProxyState } from '../AppState.js'

export default class Task {
  constructor({ id, status, weight, projectId, sprintId, backlogId, userId }) {
    this.id = id
    this.status = status
    this.weight = weight
    this.projectId = projectId
    this.sprintId = sprintId
    this.backlogId = backlogId
    this.creatorId = userId
  }

  get Template() {
    return `
    <div class="card post-border">
    <div class="card-header">
      <div class="row">
         <div class="col-1 p-1">
          </div>
          </div>
        </div>
      </div>
   `
  }
}
