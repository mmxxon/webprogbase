const mediaRepo = require('../repositories/media_repository');
const Media = require('../models/media');

const MediaRepo = new mediaRepo('data/media');

module.exports = {
  GetMediaById(req, res) {
    const media = MediaRepo.GetMediaById(req.params.id);
    if (media) {
      res.sendFile(media.path);
    } else res.sendStatus(404);
  },
  AddMedia(req, res) {
    try {
      const id = MediaRepo.AddMedia(new Media(req.file.path));
      res.status(201).json(id).end();
    } catch (e) {
      res.sendStatus(400);
    }
  }
};
