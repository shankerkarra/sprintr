import { ProxyState } from '../AppState.js'
import { noteService } from '../Services/NoteService.js'
import { logger } from '../Utils/Logger.js'

function _drawAllNotes() {
  let template = ''
  ProxyState.notes.forEach(n => { template += n.template })
  document.getElementById('').innerHTML = template
}

export class NoteController {
  constructor() {
    ProxyState.on('notes', _drawAllNotes)
  }

  async getAllNotes() {
    try {
      const notes = await noteService.getAllNote()
      return notes
    } catch (error) {
      logger.log('Failed getting all Notes', error)
    }
  }

  async getNotebyId(id) {
    try {
      const note = await noteService.getNoteById(id)
      return note
    } catch (error) {
      logger.log('Failed getting Note by Id', error)
    }
  }

  async createNote(rawnote) {
    try {
      const note = await noteService.addNote(rawnote)
      return note
    } catch (error) {
      logger.log('Failed adding Note', error)
    }
  }

  async removeNote(id) {
    try {
      const note = await noteService.deleteNote(id)
      return note
    } catch (error) {
      logger.log('Failed deleting Note', error)
    }
  }
}
