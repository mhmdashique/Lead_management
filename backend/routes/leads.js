const express = require('express');
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/leads - List leads with search, filter, sort, pagination
router.get('/', auth, async (req, res) => {
  try {
    const { 
      search, 
      leadStatus, 
      leadSource, 
      assignedTo, 
      startDate, 
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    // Filters
    if (leadStatus) query.leadStatus = leadStatus;
    if (leadSource) query.leadSource = leadSource;
    if (assignedTo) query.assignedTo = assignedTo;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      Lead.find(query).sort(sort).skip(skip).limit(parseInt(limit)),
      Lead.countDocuments(query)
    ]);

    res.json({
      data,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/leads/:id - Get single lead
router.get('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
