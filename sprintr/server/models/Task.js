import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Task = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, default: 'pending', required: true },
    weight: { type: Number, required: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    sprintId: { type: ObjectId, ref: 'Sprint' },
    backlogId: { type: ObjectId, ref: 'BackLogItem', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
Task.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: 'id',
  justOne: true
})
Task.virtual('sprint', {
  localField: 'sprintId',
  ref: 'Sprint',
  foreignField: 'id',
  justOne: true
})
Task.virtual('backLogItem', {
  localField: 'backlogId',
  ref: 'BackLogItem',
  foreignField: 'id',
  justOne: true
})

export default Task
