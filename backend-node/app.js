const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');

// Création de l'application Express
const app = express();
app.use(express.json());

// Configuration de la connexion MySQL
const connection = mysql.createConnection({
    host: 'damienbaptistemysqlserver.mysql.database.azure.com',
    user: 'mysqladmin@damienbaptistemysqlserver',
    password: 'Dadabapt94340@',
    database: 'damienbaptistemysqldb',
    port: 3306,
    ssl  : {
        ca : fs.readFileSync('DigiCertGlobalRootG2.crt.pem')
      }
  });

// Endpoint pour tester la connexion à la base de données
app.get('/test-db', (req, res) => {
  connection.connect(err => {
    if (err) {
      return res.status(500).send('Erreur lors de la connexion à la base de données : ' + err.message);
    }
    res.send('Connexion à la base de données réussie !');
  });
});

app.get('/blogs', (req, res) => {
    connection.query('SELECT * FROM blog', (err, results) => {
      if (err) {
        return res.status(500).send('Erreur lors de la récupération des données : ' + err.message);
      }
      res.json(results);
    });
  });
  

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
