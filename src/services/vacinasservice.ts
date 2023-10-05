import * as sqlite3 from 'sqlite3';

class VacinasService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('PetPlus.sqlite');
    this.createVacinasTable(); // Cria a tabela Vacinas se ela não existir.
  }

  createVacinasTable() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS Vacinas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pet INTEGER,
        descricao TEXT,
        data_aplicacao DATE,
        data_proxima DATE
      )
    `);
  }

  createVacina(vacina: any) {
    const { id_pet, descricao, data_aplicacao, data_proxima } = vacina;
    const sql = 'INSERT INTO Vacinas (id_pet, descricao, data_aplicacao, data_proxima) VALUES (?, ?, ?, ?)';
    
    this.db.run(sql, [id_pet, descricao, data_aplicacao, data_proxima], (err) => {
      if (err) {
        console.error('Erro ao criar uma nova vacina:', err);
      } else {
        console.log('Nova vacina criada com sucesso.');
      }
    });
  }

  // Implemente as funções getVacinaById, updateVacina e deleteVacina da mesma forma que foi feito na classe PetService.

  closeDatabase() {
    this.db.close();
  }
}

export default VacinasService;