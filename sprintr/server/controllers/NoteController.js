import { noteService } from '../services/NoteService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get(':/id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const notes = await noteService.getAll({ creatorId: req.userInfo.id })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const note = await noteService.getById(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await noteService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const project = await noteService.updateNote(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const user = req.userInfo
      await noteService.destroy(req.params.id, user)
      res.send({ message: 'That project has been deleted!' })
    } catch (error) {
      next(error)
    }
  }
}
