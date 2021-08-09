import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { Project } from '../models/Project'
import { BackLogItem } from '../models/BackLogItem'
import { Sprint } from '../models/Sprint'
import { Task } from '../models/Task'
import { Note } from '../models/Note'
class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Project = mongoose.model('Project', Project);
  Backlog = mongoose.model('Backlog', BackLogItem);
  Sprint = mongoose.model('Sprint', Sprint);
  Task = mongoose.model('Task', Task);
  Note = mongoose.model('Note', Note);
}

export const dbContext = new DbContext()
