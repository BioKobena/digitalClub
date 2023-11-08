const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;
const cors = require("cors");
const uri = require("./config/atlas-uri");
const { MongoClient } = require("mongodb");

const client = new MongoClient(uri);
const dbname = "nouraDB";

// const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Base de données connectée : ${dbname}`);
  } catch (err) {
    console.error(`Erreur de connexion à la base de données ${err}`);
  }
};

const main = async () => {
  try {
    await connectToDatabase();
    const databaseList = await client.db().admin().listDatabases();
    databaseList.databases.forEach((db) => console.log(`- ${dbname}`));
  } catch (err) {
    console.error(err);
  } finally {
    // Do not close the database connection here; keep it open for API usage.
  }
};

main();

console.log(uri);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.json("Bienvenue sur mon serveur web");
});

app.listen(PORT, () => {
  console.log(`Le serveur est en marche sur le port : ${PORT}`);
});
