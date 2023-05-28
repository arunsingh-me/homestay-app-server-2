const Place = require("../models/Place");
const userFromToken = require("../utils/userFromToken");

exports.addPlace = async (req, res) => {
  console.log("Arun 1");
  try {
    const userData = userFromToken(req);
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      MaxGuests,
      price,
    } = req.body;
    const place = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests: MaxGuests,
      price,
    });
    res.status(200).json({
      place,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
    console.log("Arun 2");
  }
  console.log("Arun");
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const userId = userData.id;
    const {
      id,
      title,
      address,
      addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const place = await Place.findById(id);
    if (userId === place.owner.toString()) {
      place.set({
        title,
        address,
        photos: addedPhotos,
        description: desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await place.save();
      res.status(200).json({
        message: "place updated!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
      return res.status(400).json({
        message: "Place not found",
      });
    }
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal serever error",
    });
  }
};

exports.userPlaces = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const id = userData.id;
    res.status(200).json(await Place.find({ owner: id }));
  } catch (err) {
    res.status(500).json({
      message: "Internal serever error",
    });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const userData = await userFromToken(req);
    if (!userData) {
      return res
        .status(401)
        .json({ error: "You are not authorized to access this page!" });
    }
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.status(200).json({
      message: "Place deleted!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
