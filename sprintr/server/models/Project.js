import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Project = new Schema(
  {
    // id: {type: ObjectId, required: true},
    name: { type: String, unique: true },
    description: { type: String, required: true },
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
