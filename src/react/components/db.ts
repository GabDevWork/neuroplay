import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: '192.168.56.10',
    user: 'neuroplay',
    password: 'neuroplay',
    database: 'neuroplay',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;