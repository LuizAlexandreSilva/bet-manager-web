import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../components/Card';
import { Transaction } from '../../models/transaction';
import api from '../../services/apiClient';
import ListTable from './ListTable';

export default function Bets() {
  const [bets, setBets] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState(true);

  const loadBets = useCallback(async ({ page = 1 }) => {
    try {
      setIsLoading(true);
      const response = await api.get<Transaction[]>(
        '/transactions/bets?bankrollId=6744821c-7b72-401d-b2bf-04fb77fdf291',
      );
      setBets(response.data);
    } catch (err) {
      console.error(JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBets({});
  }, [loadBets]);

  return (
    <Card>
      <ListTable isLoading={isLoading} data={bets} />
    </Card>
  );
}
