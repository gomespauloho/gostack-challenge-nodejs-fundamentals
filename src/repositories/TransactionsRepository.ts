import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private getTotalByType(type: 'income' | 'outcome'): number {
    const reduced = this.transactions.reduce((acumulator, transaction) => {
      return acumulator + transaction.type === type ? transaction.value : 0;
    }, 0);

    return reduced;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator, transaction) => {
        const { type, value } = transaction;

        switch (type) {
          case 'income':
            accumulator.income += value;
            break;
          case 'outcome':
            accumulator.outcome += value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const { income, outcome } = balance;

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
