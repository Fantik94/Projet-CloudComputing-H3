const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: 'damienbaptistemysqlserver.mysql.database.azure.com',
    user: 'mysqladmin@damienbaptistemysqlserver',
    password: 'Dadabapt94340@',
    database: 'damienbaptistemysqldb',
    port: 3306,
    ssl: {
        ca: fs.readFileSync('DigiCertGlobalRootG2.crt.pem')
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

app.get('/test-db', async (req, res) => {
    try {
        await executeQuery('SELECT 1');
        res.send('Connexion à la base de données réussie !');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la connexion à la base de données : ' + err.message);
    }
});

app.get('/all-blogs', async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM blog');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des données : ' + err.message);
    }
});

app.post('/blogs', async (req, res) => {
    try {
        const { titre, description, image_url, pseudo } = req.body;
        const query = 'INSERT INTO blog (titre, description, image_url, pseudo) VALUES (?, ?, ?, ?)';
        const results = await executeQuery(query, [titre, description, image_url, pseudo]);
        res.status(201).send(`Entrée ajoutée avec l'ID: ${results.insertId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'ajout de l\'entrée : ' + err.message);
    }
});

app.get('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM blog WHERE id = ?';
        const results = await executeQuery(query, [id]);
        if (results.length === 0) {
            return res.status(404).send('Aucun blog trouvé avec cet ID.');
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération du blog : ' + err.message);
    }
});

app.put('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, description, image_url, pseudo } = req.body;
        const query = 'UPDATE blog SET titre = ?, description = ?, image_url = ?, pseudo = ? WHERE id = ?';
        await executeQuery(query, [titre, description, image_url, pseudo, id]);
        res.send('Blog mis à jour avec succès');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la mise à jour du blog : ' + err.message);
    }
});

app.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM blog WHERE id = ?';
        const results = await executeQuery(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).send('Aucune entrée trouvée avec cet ID.');
        }
        res.send(`Entrée avec l'ID ${id} a été supprimée.`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression de l\'entrée : ' + err.message);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erreur du serveur');
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

process.on('uncaughtException', (error) => {
    console.error('Erreur non capturée', error);
});
