// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const cors = require("cors");
// eslint-disable-next-line no-undef
const jwt = require("jsonwebtoken");
// eslint-disable-next-line no-undef
const bcrypt = require("bcryptjs");
// eslint-disable-next-line no-undef
const fs = require("fs");
// eslint-disable-next-line no-undef
const path = require("path");

const app = express();
const PORT = 3001;
const SECRET = "epharmacy_secret_key";

app.use(cors());
app.use(express.json());

// ── File-based storage helpers ──────────────────────────────────────────────
// eslint-disable-next-line no-undef
const dbPath = (name) => path.join(__dirname, "data", `_${name}.json`);

const loadDB = (name) => {
  try {
    return JSON.parse(fs.readFileSync(dbPath(name), "utf-8"));
  } catch {
    return [];
  }
};

const saveDB = (name, data) => {
  fs.writeFileSync(dbPath(name), JSON.stringify(data, null, 2));
};

const readData = (filename) => {
  // eslint-disable-next-line no-undef
  const filePath = path.join(__dirname, "data", filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// ── Auth middleware ──────────────────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ── Auth routes ──────────────────────────────────────────────────────────────
app.post("/api/user/register", async (req, res) => {
  const users = loadDB("users");
  const { name, email, phone, password } = req.body;
  if (users.find((u) => u.email === email))
    return res.status(400).json({ message: "User already exists" });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, phone, password: hashed };
  users.push(user);
  saveDB("users", users);
  res.status(201).json({ message: "Registered successfully" });
});

app.post("/api/user/login", async (req, res) => {
  const users = loadDB("users");
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
});

app.post("/api/user/logout", authMiddleware, (req, res) => {
  res.json({ message: "Logged out" });
});

app.get("/api/user/current", authMiddleware, (req, res) => {
  const users = loadDB("users");
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ id: user.id, name: user.name, email: user.email });
});

// ── Pharmacy routes ──────────────────────────────────────────────────────────
app.post("/api/pharmacies", authMiddleware, (req, res) => {
  const pharmacies = loadDB("pharmacies_db");
  const existing = pharmacies.find((p) => p.userId === req.user.id);
  if (existing) return res.status(400).json({ message: "Shop already exists" });
  const pharmacy = { id: Date.now(), userId: req.user.id, ...req.body };
  pharmacies.push(pharmacy);
  saveDB("pharmacies_db", pharmacies);
  res.status(201).json(pharmacy);
});

app.get("/api/pharmacies/my", authMiddleware, (req, res) => {
  const pharmacies = loadDB("pharmacies_db");
  const pharmacy = pharmacies.find((p) => p.userId === req.user.id);
  if (!pharmacy) return res.status(404).json({ message: "Not found" });
  res.json(pharmacy);
});

app.put("/api/pharmacies/my", authMiddleware, (req, res) => {
  const pharmacies = loadDB("pharmacies_db");
  const index = pharmacies.findIndex((p) => p.userId === req.user.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });
  pharmacies[index] = { ...pharmacies[index], ...req.body };
  saveDB("pharmacies_db", pharmacies);
  res.json(pharmacies[index]);
});

// ── Vendor Product routes ───────────────────────────────────────────────────
app.get("/api/products/all", authMiddleware, (req, res) => {
  const products = readData("products.json");
  res.json({ products });
});

app.get("/api/products", authMiddleware, (req, res) => {
  const storeProducts = loadDB("store_products");
  const myProducts = storeProducts.filter((p) => p.userId === req.user.id);
  res.json({ products: myProducts });
});

app.post("/api/products", authMiddleware, (req, res) => {
  const storeProducts = loadDB("store_products");
  const product = {
    _id: Date.now().toString(),
    userId: req.user.id,
    ...req.body,
  };
  storeProducts.push(product);
  saveDB("store_products", storeProducts);
  res.status(201).json(product);
});

app.put("/api/products/:id", authMiddleware, (req, res) => {
  const storeProducts = loadDB("store_products");
  const index = storeProducts.findIndex(
    (p) => p._id === req.params.id && p.userId === req.user.id,
  );
  if (index === -1) return res.status(404).json({ message: "Not found" });
  storeProducts[index] = { ...storeProducts[index], ...req.body };
  saveDB("store_products", storeProducts);
  res.json(storeProducts[index]);
});

app.delete("/api/products/:id", authMiddleware, (req, res) => {
  let storeProducts = loadDB("store_products");
  storeProducts = storeProducts.filter(
    (p) => !(p._id === req.params.id && p.userId === req.user.id),
  );
  saveDB("store_products", storeProducts);
  res.json({ message: "Deleted" });
});

// ── Vendor Dashboard route ───────────────────────────────────────────────────
app.get("/api/dashboard", authMiddleware, (req, res) => {
  const customers = readData("customers.json");
  const dashboard = readData("Income-Expenses.json");
  const products = readData("products.json");
  const suppliers = readData("suppliers.json");

  const customersWithPurchases = customers.slice(0, 5).map((c, index) => {
    const start = (index * 3) % products.length;
    const purchases = [0, 1, 2].map((i) => {
      const p = products[(start + i) % products.length];
      return {
        name: p.name,
        description: `${p.category} medicine`,
        price: p.price,
        photo: p.photo,
      };
    });
    return { ...c, purchases };
  });

  res.json({
    productsCount: products.length,
    suppliersCount: suppliers.length,
    customersCount: customers.length,
    customers: customersWithPurchases,
    dashboard,
  });
});

app.get("/api/reviews", authMiddleware, (req, res) => {
  const reviews = readData("reviews.json");
  res.json({ reviews });
});

// ── Admin Auth ───────────────────────────────────────────────────────────────
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  let admins = loadDB("admins");
  

  if (admins.length === 0) {
    const hashed = await bcrypt.hash("admin123", 10);
    admins.push({
      id: 1,
      name: "Admin",
      email: "admin@gmail.com",
      password: hashed,
      role: "admin",
    });
    saveDB("admins", admins);
  }

  const admin = admins.find((a) => a.email === email);
  if (!admin) return res.status(400).json({ message: "Invalid credentials" });
  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: "admin" },
    SECRET,
    { expiresIn: "7d" },
  );
  res.json({ token });
});

app.get("/api/admin/current", authMiddleware, (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });
  res.json({ name: "Admin", email: req.user.email });
});

// ── Admin Data Routes ────────────────────────────────────────────────────────
app.get("/api/orders", authMiddleware, (req, res) => {
  const orders = readData("orders.json");
  res.json({ orders });
});

app.get("/api/customers", authMiddleware, (req, res) => {
  const customers = readData("customers.json");
  res.json({ customers });
});

app.get("/api/admin/suppliers", authMiddleware, (req, res) => {
  const suppliers = readData("suppliers.json");
  res.json({ suppliers });
});

app.post("/api/admin/suppliers", authMiddleware, (req, res) => {
  const suppliers = loadDB("suppliers_admin");
  const supplier = { id: Date.now(), ...req.body };
  suppliers.push(supplier);
  saveDB("suppliers_admin", suppliers);
  res.status(201).json(supplier);
});

app.put("/api/admin/suppliers/:id", authMiddleware, (req, res) => {
  const suppliers = loadDB("suppliers_admin");
  const index = suppliers.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Not found" });
  suppliers[index] = { ...suppliers[index], ...req.body };
  saveDB("suppliers_admin", suppliers);
  res.json(suppliers[index]);
});

app.get("/api/admin/products", authMiddleware, (req, res) => {
  const products = readData("products.json");
  res.json({ products });
});

app.post("/api/admin/products", authMiddleware, (req, res) => {
  const products = loadDB("admin_products");
  const product = { id: Date.now(), ...req.body };
  products.push(product);
  saveDB("admin_products", products);
  res.status(201).json(product);
});

app.put("/api/admin/products/:id", authMiddleware, (req, res) => {
  const products = loadDB("admin_products");
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Not found" });
  products[index] = { ...products[index], ...req.body };
  saveDB("admin_products", products);
  res.json(products[index]);
});

app.delete("/api/admin/products/:id", authMiddleware, (req, res) => {
  let products = loadDB("admin_products");
  products = products.filter((p) => p.id !== parseInt(req.params.id));
  saveDB("admin_products", products);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
