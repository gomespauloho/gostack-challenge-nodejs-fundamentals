import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

type TransactionType = 'income' | 'outcome';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!(type as TransactionType)) {
      throw new Error('Invalid transaction type');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw new Error('Invalid transaction');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type: type as TransactionType,
    });

    return transaction;
  }
}

export default CreateTransactionService;
