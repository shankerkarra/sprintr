import { BadRequest } from '../utils/Errors'
import { dbContext } from '../db/DbContext'

class NoteService {
  async getAll(query = {}) {
    return await dbContext.Note.find(query)
  }

  async getById(id) {
    const note = await dbContext.Note.findById(id)
    if (!note) {
      throw new BadRequest('Invalid ID')
    }
    return note
  }

  async getNoteByTaskId(taskid) {
    const note = await dbContext.Note.findByTaskId(taskid)
    if (!note) {
      throw new BadRequest('Invalid Task ID')
    }
    return note
  }

  async getNoteByCreatorId(creatorid) {
    const note = await dbContext.Note.findByCreatorId(creatorid)
    if (!note) {
      throw new BadRequest('Invalid Creator ID')
    }
    return note
  }
}

export const noteService = new NoteService()
