const express = require("express");

const router = express.Router();

const restricted = require("../helpers/auth/restricted");

const Plants = require("../db/models/Plants");

router.post("/", restricted, (req, res) => {
  let plant = req.body;
  const { plantName } = req.body;
  if (!plantName) {
    return res.status(400).json({ message: "Please provide a plant name." });
  }
  Plants.add(plant)
    .then(plant => {
      return res.status(201).json(plant);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/", restricted, (req, res) => {
  Plants.find()
    .then(plants => {
      if (plants) {
        return res.status(200).json(plants);
      } else {
        return res.status(404).json({ error: "Plants not found." });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.get("/:id", restricted, (req, res) => {
  Plants.findById(req.params.id)
    .then(plant => {
      res.status(200).json(plant);
    })
    .catch(err => res.status(500).json(err));
});

router.put("/:id", restricted, (req, res) => {
  let plant = req.body;
  let id = req.params.id;
  Plants.findByIdAndUpdate(plant, id)
    .then(updated => {
      res.status(200).json({ message: "Updated plant." });
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to update plant." });
    });
});

router.delete("/:id", restricted, (req, res) => {
  Plants.remove(req.params.id)
    .then(deleted => {
      res.status(200).json({ message: "Deleted plant." });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
