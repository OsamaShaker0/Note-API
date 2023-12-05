const Note = require('../model/note');
const { StatusCodes } = require('http-status-codes');
const getAllNotes = async (req, res) => {
  const note = await Note.find({});
  res.status(StatusCodes.OK).json(note);
};
const createNotes = async (req, res) => {
  const { header, content } = req.body;
  if (!header || !content) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'please provide header and content ' });
  }
  const note = await Note.create({ header, content });
  res.status(StatusCodes.CREATED).json({ note });
};
const updateNote = (req, res) => {
  res.send('update notes');
};
const singleNote = (req, res) => {
  res.send('single note');
};
const deleteNote = (req, res) => {
  res.send('delete notes');
};
module.exports = {
  getAllNotes,
  createNotes,
  deleteNote,
  updateNote,
  singleNote,
};
