const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const cors = require('cors')

// Création de l'application Express
const app = express();
app.use(express.json());
app.use(cors());

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

app.get('/all-blogs', (req, res) => {
    connection.query('SELECT * FROM blog', (err, results) => {
      if (err) {
        return res.status(500).send('Erreur lors de la récupération des données : ' + err.message);
      }
      res.json(results);
    });
  });
  

app.post('/blogs', (req, res) => {
  const { titre, description, image_url, pseudo } = req.body;
  const query = 'INSERT INTO blog (titre, description, image_url, pseudo) VALUES (?, ?, ?, ?)';

  connection.query(query, [titre, description, image_url, pseudo], (err, results) => {
    if (err) {
      return res.status(500).send('Erreur lors de l\'ajout de l\'entrée : ' + err.message);
    }
    res.status(201).send(`Entrée ajoutée avec l'ID: ${results.insertId}`);
  });
});


app.delete('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM blog WHERE id = ?';
  
    connection.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).send('Erreur lors de la suppression de l\'entrée : ' + err.message);
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Aucune entrée trouvée avec cet ID.');
      }
      res.send(`Entrée avec l'ID ${id} a été supprimée.`);
    });
  });

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
