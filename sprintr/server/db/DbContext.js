import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ProjectSchema } from '../models/Project'
import { BacklogSchema } from '../models/Backlog'
import { SprintSchema } from '../models/Sprint'
import { TaskSchema } from '../models/Task'
import { NoteSchema } from '../models/Note'
class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Project = mongoose.model('Project', ProjectSchema);
  Backlog = mongoose.model('Backlog', BacklogSchema);
  Sprint = mongoose.model('Sprint', SprintSchema);
  Task = mongoose.model('Task', TaskSchema);
  Note = mongoose.model('Note', NoteSchema);
}

export const dbContext = new DbContext()
