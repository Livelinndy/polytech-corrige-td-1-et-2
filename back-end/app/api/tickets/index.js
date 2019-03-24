const { Router } = require('express');
const { Ticket, Student } = require('../../models');

function getStudentSafely(studentId) {
  try {
    return Student.getById(studentId);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return null;
    }
    throw err;
  }
}

const attachStudents = ticket => Object.assign({}, ticket, {
  students: ticket.studentIds.map(studentId => getStudentSafely(studentId)),
});

const router = new Router();
router.get('/', (req, res) => {
  try {
    res.status(200).json(Ticket.get().map(attachStudents));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:ticketId', (req, res) => {
  try {
    res.status(200).json(attachStudents(Ticket.getById(req.params.ticketId)));
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
    const ticket = Ticket.create(Object.assign({}, { archived: false }, req.body));
    res.status(201).json(attachStudents(ticket));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:ticketId', (req, res) => {
  try {
    res.status(200).json(attachStudents(Ticket.update(req.params.ticketId, req.body)));
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

router.delete('/:ticketId', (req, res) => {
  try {
    Ticket.delete(req.params.ticketId);
    res.status(204).end();
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
