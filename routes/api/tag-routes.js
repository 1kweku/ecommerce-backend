const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `http://localhost:3001/api/tags` endpoint
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//http://localhost:3001/api/tags/4
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Tag data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, throgh: ProductTag }],
    });
    // be sure to include its associated Category and Tag data
    if (!singleTag) {
      res.status(404).json({ message: "No Tag found with this id!" });
      return;
    }
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
//http://localhost:3001/api/tags/
router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});
//http://localhost:3001/api/tags/6
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
//http://localhost:3001/api/tags/4
router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
