import { ProxyState } from '../AppState.js'

export default class Note {
  constructor({ id, body, taskId, userId }) {
    this.id = id
    this.body = body
    this.taskId = taskId
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
