import * as  sqlite3 from 'sqlite3';

class AtividadesService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('PetPlus.sqlite');
    this.createAtividadesTable(); // Cria a tabela Atividades se ela não existir.
  }

  createAtividadesTable() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS Atividades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pet INTEGER,
        tipo_atv TEXT,
        frequ_atv TEXT
      )
    `);
  }

  createAtividade(atividade: any) {
    const { id_pet, tipo_atv, frequ_atv } = atividade;
    const sql = 'INSERT INTO Atividades (id_pet, tipo_atv, frequ_atv) VALUES (?, ?, ?)';
    
    this.db.run(sql, [id_pet, tipo_atv, frequ_atv], (err) => {
      if (err) {
        console.error('Erro ao criar uma nova atividade:', err);
      } else {
        console.log('Nova atividade criada com sucesso.');
      }
    });
  }

  // Implemente as funções getAtividadeById, updateAtividade e deleteAtividade da mesma forma que foi feito nas classes anteriores.

  closeDatabase() {
    this.db.close();
  }
}

export default AtividadesService;