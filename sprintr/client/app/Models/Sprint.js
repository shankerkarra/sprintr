import { ProxyState } from '../AppState.js'

export default class Sprint {
  constructor({ id, name, startdate, enddate, isOpen, projectId, userId }) {
    this.id = id
    this.name = name
    this.startdate = startdate
    this.enddate = enddate
    this.isOpen = isOpen
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
