
import * as sqlite3 from 'sqlite3';

// Crie ou conecte-se a um banco de dados SQLite
const db = new sqlite3.Database('PetPlus.sqlite');

export default db;