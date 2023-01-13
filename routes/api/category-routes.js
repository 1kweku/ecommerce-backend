const router = require("express").Router();
const Book = require("../../../RUT-VIRT-FSF-PT-08-2022-U-LOLC/13-ORM/01-Activities/08-Stu_Update-Delete/Unsolved/models/Book");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
//http://localhost:3001/api/categories/
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//http://localhost:3001/api/categories/5
router.get("/:id", async (req, res) => {
  try {
    const categoryID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryID) {
      res.status(404).json({ message: "No category found with this ID!" });
    }
    res.json(categoryID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
