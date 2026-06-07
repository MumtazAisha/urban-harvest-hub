const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET all events
router.get("/", (req, res) => {
  db.all("SELECT * FROM events", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

// GET single event
router.get("/:id", (req, res) => {
  db.get(
    "SELECT * FROM events WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!row) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.json(row);
    }
  );
});

// POST event
router.post("/", (req, res) => {
  const { title, category, description, price, availability, image } = req.body;

  if (!title || !category || !description || price === undefined || price === null || !availability) {
    return res.status(400).json({
      error: "All required fields must be provided",
    });
  }

  db.run(
    `
    INSERT INTO events
    (title, category, description, price, availability, image)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [title, category, description, price, availability, image || ""],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: "Event created successfully",
        id: this.lastID,
      });
    }
  );
});

// PUT event
router.put("/:id", (req, res) => {
  const { title, category, description, price, availability, image } = req.body;

  db.run(
    `
    UPDATE events
    SET title = ?, category = ?, description = ?, price = ?, availability = ?, image = ?
    WHERE id = ?
    `,
    [title, category, description, price, availability, image || "", req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.json({
        message: "Event updated successfully",
      });
    }
  );
});

// DELETE event

router.delete("/:id", (req, res) => {
  db.run(
    "DELETE FROM events WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Event not found",
        });
      }

      res.json({
        message: "Event deleted successfully",
      });
    }
  );
});

module.exports = router;