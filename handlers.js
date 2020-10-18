const items = require("./data/fixedItems.json");
const companies = require("./data/fixedCompanies.json");
const categories = [];
const { v4: uuidv4 } = require("uuid");

const populateCategories = () => {
  items.forEach((item) => {
    categories.find((category) => category === item.category.toLowerCase()) ===
      undefined && categories.push(item.category.toLowerCase());
  });
};

const handleItems = (req, res) => {
  res.status(200).json({ status: 200, items: items });
};

const handleItem = (req, res) => {
  const _itemId = req.params.itemId;
  const item = items.find((item) => item._id.toString() === _itemId);
  item !== undefined
    ? res.status(200).json({ status: 200, item: item })
    : res.status(404).json({ status: 404, error: "Item not found." });
};

const handleCompanies = (req, res) => {
  res.status(200).json({ status: 200, companies: companies });
};

const handleCompany = (req, res) => {
  const _companyId = req.params.companyId;
  const company = companies.find(
    (company) => company._id.toString() === _companyId
  );
  const companyItems = [];

  if (company !== undefined) {
    items.forEach(
      (item) =>
        item.companyId.toString() === _companyId && companyItems.push(item)
    );
    res
      .status(200)
      .json({ status: 200, company: company, items: companyItems });
  } else res.status(404).json({ status: 404, error: "Company not found." });
};

const handleCategories = (req, res) => {
  populateCategories();
  res.status(200).json({ status: 200, categories: categories });
};

const handleCategory = (req, res) => {
  populateCategories();
  const _categoryName = req.params.categoryName.toLowerCase();
  const category = categories.find((category) => category === _categoryName);
  const categoryItems = [];

  if (category !== undefined) {
    items.forEach(
      (item) =>
        item.category.toLowerCase() === _categoryName &&
        categoryItems.push(item)
    );
    res
      .status(200)
      .json({ status: 200, category: category, items: categoryItems });
  } else res.status(404).json({ status: 404, error: "Category not found." });
};

const handlePurchase = (req, res) => {
  const { order } = req.body;
  let missingStock = false;
  const missingStockItems = [];

  order.forEach((orderItem) => {
    const item = items.find((item) => item._id === orderItem.itemId);
    if (item.numInStock < orderItem.quantity) {
      missingStock = true;
      missingStockItems.push(item);
    }
  });

  if (missingStock === true) {
    res.status(400).json({
      status: 400,
      error:
        "Sorry but one or more items in your order have insufficient stock.",
      missingStockItems: missingStockItems,
    });
  } else {
    const confirmation = uuidv4();
    order.forEach((orderItem) => {
      const item = items.find((item) => item._id === orderItem.itemId);
      item.numInStock -= orderItem.quantity;
    });
    res
      .status(200)
      .json({ status: 200, confirmation: confirmation, order: order });
  }
};

module.exports = {
  handleItems,
  handleItem,
  handleCompanies,
  handleCompany,
  handleCategories,
  handleCategory,
  handlePurchase,
};
