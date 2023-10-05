import * as sqlite3 from 'sqlite3';

class ProntuarioService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('PetPlus.sqlite');
    this.createProntuarioTable(); // Cria a tabela Prontuario se ela não existir.
  }

  createProntuarioTable() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS Prontuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pet INTEGER,
        descricao TEXT,
        data TEXT
      )
    `);
  }

  createProntuario(prontuario: any) {
    const { id_pet, descricao, data } = prontuario;
    const sql = 'INSERT INTO Prontuario (id_pet, descricao, data) VALUES (?, ?, ?)';
    
    this.db.run(sql, [id_pet, descricao, data], (err) => {
      if (err) {
        console.error('Erro ao criar um novo prontuário:', err);
      } else {
        console.log('Novo prontuário criado com sucesso.');
      }
    });
  }

  getProntuarioById(id: number, callback: (prontuario: any) => void) {
    const sql = 'SELECT * FROM Prontuario WHERE id = ?';

    this.db.get(sql, [id], (err, row) => {
      if (err) {
        console.error('Erro ao buscar o prontuário pelo ID:', err);
        callback(null);
      } else {
        callback(row);
      }
    });
  }

  updateProntuario(id: number, prontuario: any) {
    const { id_pet, descricao, data } = prontuario;
    const sql = 'UPDATE Prontuario SET id_pet = ?, descricao = ?, data = ? WHERE id = ?';

    this.db.run(sql, [id_pet, descricao, data, id], (err) => {
      if (err) {
        console.error('Erro ao atualizar o prontuário:', err);
      } else {
        console.log('Prontuário atualizado com sucesso.');
      }
    });
  }

  deleteProntuario(id: number) {
    const sql = 'DELETE FROM Prontuario WHERE id = ?';

    this.db.run(sql, [id], (err) => {
      if (err) {
        console.error('Erro ao excluir o prontuário:', err);
      } else {
        console.log('Prontuário excluído com sucesso.');
      }
    });
  }

  closeDatabase() {
    this.db.close();
  }
}

export default ProntuarioService;