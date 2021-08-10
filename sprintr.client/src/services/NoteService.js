import { ProxyState } from '../../../sprintr/client/app/AppState.js'
import Note from '../../../sprintr/client/app/Models/Note.js'
import { logger } from '../../../sprintr/client/app/Utils/Logger.js'
import { api } from '../../../sprintr/client/app/Services/AxiosService.js'
import { AppState } from '../AppState.js'

class NoteService {
  async getAll() {
    const res = await api.get('api/notes')
    logger.log('gEtting all notes', res.data)
    AppState.note = res.data
  }

  async getById(id) {
    const res = await api.get('api/notes/' + id)
    logger.log('fetched single Note', res.data)
    AppState.note = res.data
  }

  async create(body) {
    const res = await api.post('api/notes', body)
    logger.log('Created Note', res.data)
    AppState.note.push(res.data)
  }

  async update(id, body) {
    const res = await api.put('api/notes/' + id, body)
    logger.log('Udated Notes', res.data)
    AppState.note = res.data
  }

  async destroy(id) {
    await api.deleteNote('api/notes' + id)
    AppState.note = AppState.note.find(n => n.id !== id)

    logger.log('Deleted Successfully')
  }
}

export const noteService = new NoteService()
