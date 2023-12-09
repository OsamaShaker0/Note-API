const Note = require('../model/Note');
const { StatusCodes } = require('http-status-codes');
const getAllNotes = async (req, res) => {
  try {
    const { userId } = req.user;
    const note = await Note.find({ createdBy: userId });
    console.log(userId);
    res.status(StatusCodes.OK).json(note);
  } catch (error) {
    res.status(500).json({ msg: 'somethimg went wrong , try again' });
  }
};
const createNotes = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const note = await Note.create(req.body);
    res.status(StatusCodes.CREATED).json(note);
  } catch (error) {
    res.status(500).json({ msg: 'somethimg went wrong , try again' });
  }
};
const singleNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const filter = { createdBy: userId, _id: id };
  try {
    const note = await Note.findOne(filter);
    if (!note) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `note with id ${id} is not found` });
    }

    return res.status(StatusCodes.OK).json(note);
  } catch (error) {
    return res.status(500).json({ msg: 'somethimg went wrong , try again' });
  }
};
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { header, content } = req.body;
  if (header === '' || content === '') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'please provide header and content ' });
  }
  try {
    const filter = { createdBy: userId, _id: id };
    const note = await Note.findByIdAndUpdate(filter, req.body, { new: true });
   return  res.status(StatusCodes.OK).json(note);
  } catch (error) {
   return   res.status(500).json({ msg: 'somethimg went wrong , try again' });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const filter = { createdBy: userId, _id: id };
  try {
    const note = await Note.findOneAndDelete(filter);
    if (!note) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `note with id ${id} is not found` });
    }
    return res.status(StatusCodes.OK).json({ deletedNote: note });
  } catch (error) {
    res.status(500).json({ msg: 'somethimg went wrong , try again' });
  }
};
module.exports = {
  getAllNotes,
  createNotes,
  deleteNote,
  updateNote,
  singleNote,
};
