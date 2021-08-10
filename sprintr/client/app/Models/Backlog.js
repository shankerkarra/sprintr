import { ProxyState } from '../AppState.js'

export default class Backlog {
  constructor({ id, name, body, isOpen, projectId, userId }) {
    this.id = id
    this.name = name
    this.body = body
    this.isOpen = isOpen || true
    this.projectId = projectId
    this.CreatorId = userId
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
