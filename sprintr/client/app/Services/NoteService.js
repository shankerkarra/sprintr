import { ProxyState } from '../AppState.js'
import Note from '../Models/Note.js'
import { logger } from '../Utils/Logger.js'
import { api } from '../AxiosService.js'

class NoteService {
  async getAllNote() {
    const notes = await api.get('api/Note')
    ProxyState.notes = notes.data.map(b => new Note(b))
    return notes
  }

  async getNoteById(id) {
    const note = await api.get('api/Note/' + id)
    return note
  }

  async addNote(rawnote) {
    const note = await api.post('api/Note', rawnote)
    ProxyState.notes = [...ProxyState.notes, new Note(note.data)]
    return note
  }

  async deleteNote(id) {
    await api.deleteNote('api/Note' + id)
    logger.log('Deleted Successfully')
  }
}

export const noteService = new NoteService()
