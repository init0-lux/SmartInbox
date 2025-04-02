import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: Date,
  location: String,
  source: {
    type: String,
    enum: ['email', 'manual', 'api'],
    default: 'email'
  },
  relevancy: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  metadata: {
    originalEmail: String,
    aiAnalysis: Object
  }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
