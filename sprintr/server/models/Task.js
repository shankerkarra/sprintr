import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const Task = new Schema(
  {
    id: {type: ObjectId, required: true},
    status : {type: String, unique: true},
    weight: { type: Number, required: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    sprintId: { type: ObjectId, ref: 'Sprint', required: true },
    backLogItemId: { type: ObjectId, ref: 'BackLogItem', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true },
    asignedTo: {type: [ObjectId], required: true}
  }
)
Task.virtual('account', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: 'id',
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
  localField: 'backLogItemId',
  ref: 'BackLogItem',
  foreignField: 'id',
  justOne: true
})

export default Task