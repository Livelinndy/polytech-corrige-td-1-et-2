const { Router } = require('express');
const { Student } = require('../../models');
const TicketRouter = require('./tickets');

const router = new Router();
router.get('/', (req, res) => {
  try {
    if (req.query.q) {
      res.status(200).json(Student.search(req.query.q));
    } else {
      res.status(200).json(Student.get());
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:studentId', (req, res) => {
  try {
    res.status(200).json(Student.getById(req.params.studentId));
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else {
      res.status(500).json(err);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const ticket = Student.create(Object.assign({}, { notes: '' }, req.body));
    res.status(201).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:studentId', (req, res) => {
  try {
    res.status(200).json(Student.update(req.params.studentId, req.body));
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.delete('/:studentId', (req, res) => {
  try {
    Student.delete(req.params.studentId);
    res.status(204).end();
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else {
      res.status(500).json(err);
    }
  }
});

router.use('/:studentId/tickets', TicketRouter);

module.exports = router;
