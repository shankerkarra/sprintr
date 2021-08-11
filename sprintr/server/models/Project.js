import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Project = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    creatorId: { type: ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Project.virtual('account', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: 'id',
  justOne: true
})

export default Project
