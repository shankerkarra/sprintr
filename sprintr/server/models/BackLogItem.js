import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const BackLogItem = new Schema(
  {
    // id: {type: ObjectId, required: true},
    name: { type: String, unique: true },
    body: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true },
    color: { type: String, required: true }
  }
)
BackLogItem.virtual('account', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: 'id',
  justOne: true
})
BackLogItem.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: 'id',
  justOne: true
})

export default BackLogItem
