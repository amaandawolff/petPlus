import * as sqlite3 from 'sqlite3';

class PetService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('PetPlus.sqlite');
    this.createPetTable(); // Cria a tabela Pet se ela não existir.
  }

  createPetTable() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS Pet (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade INTEGER,
        especie TEXT,
        sexo TEXT,
        prontuario TEXT
      )
    `);
  }

  createPet(pet: any) {
    const { nome, idade, especie, sexo, prontuario } = pet;
    const sql = 'INSERT INTO Pet (nome, idade, especie, sexo, prontuario) VALUES (?, ?, ?, ?, ?)';
    
    this.db.run(sql, [nome, idade, especie, sexo, prontuario], (err) => {
      if (err) {
        console.error('Erro ao criar um novo pet:', err);
      } else {
        console.log('Novo pet criado com sucesso.');
      }
    });
  }

  getPetById(id: number, callback: (pet: any) => void) {
    const sql = 'SELECT * FROM Pet WHERE id = ?';

    this.db.get(sql, [id], (err, row) => {
      if (err) {
        console.error('Erro ao buscar o pet pelo ID:', err);
        callback(null);
      } else {
        callback(row);
      }
    });
  }

  updatePet(id: number, pet: any) {
    const { nome, idade, especie, sexo, prontuario } = pet;
    const sql = 'UPDATE Pet SET nome = ?, idade = ?, especie = ?, sexo = ?, prontuario = ? WHERE id = ?';

    this.db.run(sql, [nome, idade, especie, sexo, prontuario, id], (err) => {
      if (err) {
        console.error('Erro ao atualizar o pet:', err);
      } else {
        console.log('Pet atualizado com sucesso.');
      }
    });
  }

  deletePet(id: number) {
    const sql = 'DELETE FROM Pet WHERE id = ?';

    this.db.run(sql, [id], (err) => {
      if (err) {
        console.error('Erro ao excluir o pet:', err);
      } else {
        console.log('Pet excluído com sucesso.');
      }
    });
  }

  closeDatabase() {
    this.db.close();
  }
}

export default PetService;