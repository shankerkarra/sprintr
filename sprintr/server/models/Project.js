import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Project = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  }
)
Project.virtual('account', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: 'id',
  justOne: true
})

export default Project
