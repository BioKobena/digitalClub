const express = require("express");
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 8000;
const uri = require("./atlas-uri");
const cors = require("cors")

app.use(cors());

const client = new MongoClient(uri);
const dbname = "nouraDB";

app.use(bodyParser.json());

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Base de données connectée : ${dbname}`);
  } catch (err) {
    console.error(`Erreur de connexion à la base de données ${err}`);
  }
}

const main = async () => {
  try {
    await connectToDatabase();
    const databaseList = await client.db().admin().listDatabases();
    databaseList.databases.forEach(db => console.log(`- ${dbname}`));
  } catch (err) {
    console.error(err);
  } finally {
    // Do not close the database connection here; keep it open for API usage.
  }
}

main();

console.log(uri);

// création de la colletion MongoDB (users)
const usersCollection = client.db(dbname).collection('users');
// adminCollection.js

const adminCollection = client.db(dbname).collection('administrators');
// adminLogin.js

//Création de la collection produits
const productsCollection = client.db(dbname).collection('products');

// Créer une collection MongoDB pour les commandes
const ordersCollection = client.db(dbname).collection('orders');

app.post("/api/orders", async (req, res) => {

  try {
    // Récupérez les informations de l'utilisateur depuis l'authentification
    // const user = req.body.username; // Assurez-vous que votre middleware d'authentification place les informations de l'utilisateur dans req.user

    

    const { cart, total } = req.body;
    // const username = user;

    // Enregistrez la commande dans la base de données avec le nom de l'utilisateur
    await ordersCollection.insertOne({ cart, total });

    res.json({ message: 'Commande passée avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Échec de la commande' });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    // Récupérez les informations de l'utilisateur depuis l'authentification (si nécessaire)

    // Récupérez les commandes de la base de données
    const orders = await ordersCollection.find({}).toArray();

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Échec de la récupération des commandes' });
  }
});


app.post("/api/products", async (req, res) => {
  try {
    const { name, price } = req.body;

    // Insert the new product into the products collection
    await productsCollection.insertOne({ name, price });

    res.json({ message: 'Product added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

const { ObjectId } = require('mongodb');
app.delete("/api/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Supprimez le produit correspondant de la base de données
    const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount === 1) {
      res.json({ message: 'Produit supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Produit non trouvé' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Échec de la suppression du produit' });
  }
});



app.get("/api/products", async (req, res) => {
  try {
    // Retrieve all products from the products collection
    const products = await productsCollection.find().toArray();

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Accès")

    // Trouvez l'administrateur par son nom d'utilisateur
    const admin = await adminCollection.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: 'Administrateur introuvable' });
    }

    // Vérifiez le mot de passe
    // const isPasswordValid = await bcrypt.compare(password, admin.password);

    
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: 'Mot de passe invalide' });
    // }

    // Le mot de passe est valide, l'administrateur est authentifié
    res.json({ message: 'Connexion administrateur réussie' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Échec de la connexion administrateur' });
  }
});

// Route d'inscription
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    // Vérifier si l'email existe déjà (s'il a déjà été enregistré)
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà inscrit' });
    }

    // Hash the password before saving it
    // Hachage du mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer un utilisateur dans la base de données
    // Insert the user into the database
    await usersCollection.insertOne({ username, email, password: hashedPassword });
    res.json({ message: 'Succes inscription' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Echec inscription' });
  }
});



// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    // Trouver un utilisateur avec le mail entré
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur inexistant' });
    }

    // Verify the password
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe invalide' });
    }
    // Password is valid, user is authenticated
    // Si le mot de passe est valide alors, on établit la connexion
    res.json({ message: 'Succes de connexion' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Echec de connexion' });
  }
});

app.get("/", (req, res) => {
  res.json("Bienvenue sur mon serveur web");
});

app.listen(PORT, () => {
  console.log(`Le serveur est en marche sur le port : ${PORT}`);
});
