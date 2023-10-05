import * as sqlite3 from 'sqlite3';

class AlimentacaoService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('PetPlus.sqlite');
    this.createAlimentacaoTable(); 
  }

  createAlimentacaoTable() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS Alimentacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pet INTEGER,
        tipo TEXT,
        nome TEXT,
        quant_refeicao INTEGER,
        vezes_dia INTEGER
      )
    `);
  }

  createAlimentacao(alimentacao: any) {
    const { id_pet, tipo, nome, quant_refeicao, vezes_dia } = alimentacao;
    const sql = 'INSERT INTO Alimentacao (id_pet, tipo, nome, quant_refeicao, vezes_dia) VALUES (?, ?, ?, ?, ?)';
    
    this.db.run(sql, [id_pet, tipo, nome, quant_refeicao, vezes_dia], (err) => {
      if (err) {
        console.error('Erro ao criar uma nova alimentação:', err);
      } else {
        console.log('Nova alimentação criada com sucesso.');
      }
    });
  }

  // Implemente as funções getAlimentacaoById, updateAlimentacao e deleteAlimentacao da mesma forma que foi feito na classe PetService.

  closeDatabase() {
    this.db.close();
  }
}

export default AlimentacaoService;