const express = require('express');
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/analytics - Get analytics metrics
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = {};
    
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }

    const [totalLeads, convertedLeads, statusBreakdown, pipelineValue, monthLeads] = await Promise.all([
      Lead.countDocuments(dateFilter),
      Lead.countDocuments({ ...dateFilter, leadStatus: 'Converted' }),
      Lead.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$leadStatus', count: { $sum: 1 } } }
      ]),
      Lead.aggregate([
        { $match: dateFilter },
        { $group: { _id: null, total: { $sum: '$estimatedValue' } } }
      ]),
      Lead.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      })
    ]);

    const leadsByStatus = statusBreakdown.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json({
      totalLeads,
      convertedLeads,
      conversionRate: totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0,
      leadsByStatus,
      totalPipelineValue: pipelineValue[0]?.total || 0,
      leadsThisMonth: monthLeads
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
