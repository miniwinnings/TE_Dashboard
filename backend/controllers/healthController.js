// controller for health table

// Import required libraries and modules
//const fixturesModel = require('../models/fixturesModel');
const { pool } = require('../db.js');

// Class for handling health
class healthController {
   
    //READ all health
    static async getAllHealth(req, res) {
        try {
            const query = 'SELECT * FROM health ORDER BY fixture_id ASC;';
            const result = await pool.query(query);
            res.json(result.rows);
        }
        catch (error) {
            console.error('Database error (getAllHealth):', error);
            res.status(500).json({ error: 'Database query failed' });
        }
    }



    //READ Health by ID

    static async getHealthById(req, res) {
        try {
            const id = parseInt(req.params.fixture_id, 10);
            if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid or missing id parameter' });

                const query = 'SELECT * FROM health WHERE fixture_id = $1';

                const result = await pool.query(query, [id]);
                if (result.rows.length === 0) return res.status(404).json({ error: `No result found for id: ${id}` });
                res.json(result.rows[0]);
        } 
        catch (error) {
            console.error('Database error (getHealthById):', error);
            res.status(500).json({ error: 'Database query failed' });
        }
        }

    //CREATE Health

    static async postHealth(req, res) {
        try {
            const { fixture_id, status, comments, creator, create_date } = req.body;
            if (!status || !fixture_id || !creator) {
                return res.status(400).json({ error: 'Missing required fields: fixture_id, status, comments, ' });
            }

            const query = `
                INSERT INTO fixtures (fixture_id, status, comments, creator, create_date)
                VALUES ($1, $2, $3, $4, Date.now())
                RETURNING *;
            `;

            const values = [fixture_id, status, comments, creator, create_date];
            const result = await pool.query(query, values);
            res.status(201).json(result.rows[0]);
        } 
        catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database insert failed' });
        }
    }
     
    // UPDATE Fixtures allowing partial updates
    static async updateHealth(req, res) {
        try {
            const id = parseInt(req.params.fixture_id, 10);
            if (Number.isNaN(id)) {
                 return res.status(400).json({ error: 'Invalid or missing id parameter' });
            }
            const allowed = ['fixture_id', 'status', 'comments', 'creator', 'create_date'];

            const setClauses = [];
            const values = [];
            let paramIndex = 1;

            for (const col of allowed) {
                if (Object.prototype.hasOwnProperty.call(req.body, col)) {
                    setClauses.push(`${col} = $${paramIndex}`);
                    values.push(req.body[col]);
                    paramIndex++;
                }
            }

            if (setClauses.length === 0) {
                return res.status(400).json({ error: 'No valid fields provided for update' });
            }
            
            //add id 

            values.push(id);
            const query = `
                UPDATE health
                SET ${setClauses.join(', ')}
                WHERE id = $${paramIndex}
                RETURNING *;
            `;

            const result = await pool.query(query, values);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: `No fixture health found with id: ${id}` });
            }
            res.json('Sussessfully updated fixture health with id: ' + id + '. Updated row: ' + result.rows[0]);
          
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database update failed' });
        }
    }
    // DELETE Health
    static async deleteHealth(req, res) {
        try {
            const id = parseInt(req.params.fixture_id, 10);
            if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid or missing id parameter' });
            const query = 'DELETE FROM health WHERE id = $1 RETURNING *;';
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: `No fixture health found with id: ${id}` });
            }
            else {
                res.json({ message: `Fixture Health with id: ${id} deleted successfully.`, deletedRow: result.rows[0] });
            }
        }
         catch (error) {
                console.error('Database error (deleteHealth):', error);
                res.status(500).json({ error: 'Database delete failed' });
            }
    }
}
    module.exports = healthController;
