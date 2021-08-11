import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Note = new Schema(
  {
    body: { type: String, required: true },
    taskId: { type: ObjectId, ref: 'Task', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
Note.virtual('task', {
  localField: 'taskId',
  ref: 'Task',
  foreignField: 'id',
  justOne: true
})

export default Note
