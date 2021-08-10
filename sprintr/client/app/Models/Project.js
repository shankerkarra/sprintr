import { ProxyState } from '../AppState.js'

export default class Project {
  constructor({ id, name, description, userId }) {
    this.id = id
    this.name = name
    this.description = description
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
