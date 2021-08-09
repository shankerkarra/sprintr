import { noteService } from "../services/NoteService";
import BaseController from "../utils/BaseController";

export class NoteController extends BaseController{
  constructor() {
    super('api/notes')
    this.router
      .get('', this.getAll)
      .get(':/id', this.getById)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const notes = await noteService.getAll(req.query)
      res.send(notes)
    } catch (error) {
      next('We had trouble getting the Notes', error)
    }
  }

  async getById(req, res, next) {
    try {
      const note = await noteService.getById(req.params.id)
      res.send(note)
    } catch (error) {
      next('We had trouble getting that note', error)
    }
  }

  async create(req, res, next) {
    try {
      const note = await noteService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next('We had trouble making that Note', error)
    }
  }
}