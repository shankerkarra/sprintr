import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const Note = new Schema(
  {
    id: {type: ObjectId, required: true},
    body: { type: String, unique: true },
    taskId: {type: ObjectId, ref: 'Task', required: true},
    creatorId: {type: ObjectId, ref: 'Account', required: true}
  }
)
Note.virtual('account', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: 'id',
  justOne: true
})
Note.virtual('task', {
  localField: 'taskId',
  ref: 'Task',
  foreignField: 'id',
  justOne: true
})

export default Note