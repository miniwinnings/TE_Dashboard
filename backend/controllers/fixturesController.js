// Import required libraries and modules
const fixturesModel = require('../models/fixturesModel');
const { pool } = require('../db.js');

// Class for handling fixtures
class fixturesController {
    // Function to get all the fixtures 
    static getAllFixtures = async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM testboard_master_log LIMIT 5');
            res.json(result.rows);
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database query failed' });
        }
    }
    // Function to get a fixture by it's id
    static getFixtureById = async (req, res) => {
        try{
            if (!req.params.id) return res.status(400).json({ error: 'Missing required query parameters: id' });
            
            let params = [req.params.id];
            let query = `
                SELECT *
                FROM testboard_master_log
                WHERE id = $1
                `;
            
            const result = await pool.query(query, params);
            if (result.rows.length == 0) return res.status(404).json({ error: `No results found for id: ${req.params.id}`});
            res.json(result.rows);
        } catch (error){
            res.status(500).json({ error: 'Database query failed' });
        }
    }

}

module.exports = fixturesController;
