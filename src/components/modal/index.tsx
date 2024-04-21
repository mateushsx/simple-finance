'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { createTransaction } from '~/services/transactions';

import type { TTransaction } from '~/services/transactions';

const defaultTransaction = {
  description: '',
  amount: 0,
  category: '',
  type: '' as TTransaction['type'],
  date: '',
};

export function CreateTransactionModal() {
  const [transaction, setTransaction] = useState(defaultTransaction);

  const handleUpdateTransaction = (key: string, value: string | number) => {
    setTransaction({ ...transaction, [key]: value });
  };

  const handleCreateTransaction = async () => {
    try {
      await createTransaction(transaction);
      setTransaction(defaultTransaction);
    } catch (error) {
      console.log('error: >=>', error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[450px]">
      <DialogHeader>
        <DialogTitle>Cadastrar Transação</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para adicionar uma nova transação.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-2 py-4">
        <div className="flex flex-col gap-2">
          <Label>Descricão</Label>
          <Input
            type="text"
            onChange={(e) =>
              handleUpdateTransaction('description', e.target.value)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Valor</Label>
          <Input
            type="number"
            onChange={(e) => handleUpdateTransaction('amount', e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Categoria</Label>
          <Input
            type="text"
            onChange={(e) =>
              handleUpdateTransaction('category', e.target.value)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Tipo</Label>
          <Select
            onValueChange={(value) => handleUpdateTransaction('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="input">Entrada</SelectItem>
              <SelectItem value="output">Saída</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Data</Label>
          <Input
            type="date"
            onChange={(e) => handleUpdateTransaction('date', e.target.value)}
          />
        </div>
      </div>

      <DialogFooter>
        <Button onClick={handleCreateTransaction}>Cadastrar</Button>
      </DialogFooter>
    </DialogContent>
  );
}
