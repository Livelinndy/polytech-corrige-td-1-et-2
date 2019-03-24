const { Router } = require('express');
const { Ticket, Student } = require('../../../models');

const router = new Router({ mergeParams: true });
router.get('/', (req, res) => {
  try {
    // Check if studentId exists, if not it will throw a NotFoundError
    Student.getById(req.params.studentId);

    const studentId = parseInt(req.params.studentId, 10);
    res.status(200).json(Ticket.get().filter(ticket => ticket.studentIds.includes(studentId)));
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
