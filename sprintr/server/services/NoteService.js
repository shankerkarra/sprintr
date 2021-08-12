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
    const note = await dbContext.Note.findById(taskid)
    if (!note) {
      throw new BadRequest('Invalid Task ID')
    }
    return note
  }

  async getNoteByCreatorId(creatorid) {
    const note = await dbContext.Note.findById(creatorid)
    if (!note) {
      throw new BadRequest('Invalid Creator ID')
    }
    return note
  }

  async createNote(body) {
    return await dbContext.Note.create(body)
  }

  async updateNote(body) {
    const note = await dbContext.Note.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!note) {
      throw new BadRequest('Invalid Note ID')
    }
    return note
  }

  async destroy(id, user) {
    const note = await this.getById(id)
    if (user.id === note.creatorId.toString()) {
      await this.getById(id)
      return await dbContext.Note.findOneAndDelete({ _id: id })
    }
  }
}

export const noteService = new NoteService()
