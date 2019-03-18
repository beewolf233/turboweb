import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const newsSchema = new Schema({
  title: String,
  content: String,
  comment: String,
  description: String,
  label: [{
    type: ObjectId,
    ref: 'label'
  }],
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})
newsSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = new Date()
    console.log('创建时间', this.meta.createAt)
  } else {
    this.meta.updateAt = new Date()
  }
  next()
})

export default mongoose.model('News', newsSchema)
