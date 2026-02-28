const Application = require('../models/Application');
const Job = require('../models/Job');

/**
 * @desc    Submit a job application
 * @route   POST /api/applications
 * @access  Public
 */
const createApplication = async (req, res, next) => {
  try {
    const { job: jobId } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.',
      });
    }

    // Check for duplicate application
    const existingApp = await Application.findOne({
      job: jobId,
      email: req.body.email,
    });
    if (existingApp) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job.',
      });
    }

    const application = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all applications (Admin) or by job
 * @route   GET /api/applications
 * @access  Private/Admin
 */
const getApplications = async (req, res, next) => {
  try {
    const { jobId, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (jobId) {
      filter.job = jobId;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .sort('-createdAt')
        .skip(skip)
        .limit(limitNum)
        .populate('job', 'title company location'),
      Application.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: applications,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single application
 * @route   GET /api/applications/:id
 * @access  Private/Admin
 */
const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      'job',
      'title company location category'
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.',
      });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete application
 * @route   DELETE /api/applications/:id
 * @access  Private/Admin
 */
const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.',
      });
    }

    await application.deleteOne();

    res.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  deleteApplication,
};
