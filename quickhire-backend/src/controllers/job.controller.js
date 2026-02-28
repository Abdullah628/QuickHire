const Job = require('../models/Job');

/**
 * @desc    Get all jobs with optional search, filter, pagination
 * @route   GET /api/jobs
 * @access  Public
 */
const getJobs = async (req, res, next) => {
  try {
    const {
      search,
      category,
      location,
      type,
      featured,
      page = 1,
      limit = 12,
      sort = '-createdAt',
    } = req.query;

    const filter = {};

    // Text search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Location filter
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    // Job type filter
    if (type) {
      filter.type = type;
    }

    // Featured filter
    if (featured === 'true') {
      filter.featured = true;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .populate('applicationCount'),
      Job.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: jobs,
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
 * @desc    Get single job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('applicationCount');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.',
      });
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new job
 * @route   POST /api/jobs
 * @access  Private/Admin
 */
const createJob = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a job
 * @route   PUT /api/jobs/:id
 * @access  Private/Admin
 */
const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.',
      });
    }

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a job
 * @route   DELETE /api/jobs/:id
 * @access  Private/Admin
 */
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.',
      });
    }

    await job.deleteOne();

    res.json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get job categories with counts
 * @route   GET /api/jobs/categories/stats
 * @access  Public
 */
const getCategoryStats = async (req, res, next) => {
  try {
    const stats = await Job.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getCategoryStats,
};
