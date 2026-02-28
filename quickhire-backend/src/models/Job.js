const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Design',
        'Sales',
        'Marketing',
        'Finance',
        'Technology',
        'Engineering',
        'Business',
        'Human Resource',
      ],
    },
    type: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
      default: 'Full-Time',
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    requirements: {
      type: [String],
      default: [],
    },
    salary: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    companyLogo: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for application count
jobSchema.virtual('applicationCount', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'job',
  count: true,
});

// Index for search
jobSchema.index({ title: 'text', company: 'text', description: 'text' });
jobSchema.index({ category: 1 });
jobSchema.index({ location: 1 });

module.exports = mongoose.model('Job', jobSchema);
