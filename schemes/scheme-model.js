const db = require('../data/db-config')

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes').where({ id }).first()
}

function findSteps(scheme_id) {
  return db('steps')
    .join('schemes', 'schemes.id', 'steps.scheme_id')
    .select('schemes.id as scheme_id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .where({ scheme_id })
    .orderBy('steps.step_number')
}

function add(scheme) {
  return db('schemes')
  .insert(scheme)
  .then(ids => {
    return findById(ids[0])
  })
}

function update(changes, id) {
  return db('schemes')
  .where({ id })
  .update(changes)
  .then(count => {
    return findById(id);
  })
}

function remove(id) {
  return db('schemes')
  .where({ id }).del()
}