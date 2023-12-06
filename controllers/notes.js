const Note = require('../model/Note');
const { StatusCodes } = require('http-status-codes');
const getAllNotes = async (req, res) => {
  const { userId } = req.user;
  const note = await Note.find({ createdBy: userId });
  console.log(userId);
  res.status(StatusCodes.OK).json(note);
};
const createNotes = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const note = await Note.create(req.body);
  res.status(StatusCodes.CREATED).json(note);
};
const singleNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const filter = { createdBy: userId, _id: id };
  const note = await Note.findOne(filter);
  !note &&
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `note with id ${id} is not found` });

  res.status(StatusCodes.OK).json(note);
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
  const filter = { createdBy: userId, _id: id };
  const note = await Note.findByIdAndUpdate(filter,req.body,{new :true});
   res
    .status(StatusCodes.OK)
    .json(note);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const filter = { createdBy: userId, _id: id };
  const note = await Note.findOneAndDelete(filter);
  !note &&
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `note with id ${id} is not found` });

  res.status(StatusCodes.OK).json({ deletedNote: note });
};
module.exports = {
  getAllNotes,
  createNotes,
  deleteNote,
  updateNote,
  singleNote,
};
