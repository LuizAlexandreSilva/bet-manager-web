import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import { subMonths } from 'date-fns/esm';
import { ptBR } from 'date-fns/locale';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { BsPlus } from 'react-icons/bs';
import Card from '../../components/Card';
import { useAuth } from '../../hooks/auth';
import { Transaction } from '../../models/transaction';
import api from '../../services/apiClient';
import BetModal from './BetModal';
import ListTable from './ListTable';

type LoadBetsParams = {
  start: Date;
  end: Date;
};

export default function Bets() {
  const [pendingBets, setPendingBets] = useState<Transaction[]>();
  const [bets, setBets] = useState<Transaction[]>();

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isLoadingPendingBets, setIsLoadingPendingBets] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [markets, setMarkets] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const loadPendingBets = useCallback(async () => {
    try {
      setIsLoadingPendingBets(true);
      const response = await api.get<Transaction[]>(
        '/transactions/bets/pending',
      );
      setPendingBets(response.data);
    } catch (err) {
      console.error(JSON.stringify(err));
    } finally {
      setIsLoadingPendingBets(false);
    }
  }, []);

  const loadBets = useCallback(async ({ start, end }: LoadBetsParams) => {
    try {
      setIsLoading(true);
      const response = await api.get<Transaction[]>('/transactions/bets', {
        params: {
          startDate: start,
          endDate: end,
        },
      });
      setBets(response.data);
    } catch (err) {
      console.error(JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMarkets = useCallback(async () => {
    const response = await api.get<[]>('/markets', {
      params: {
        userId: user.id,
      },
    });
    setMarkets(response.data);
  }, [user.id]);

  const loadCategories = useCallback(async () => {
    const response = await api.get<[]>('/categories', {
      params: {
        userId: user.id,
      },
    });
    setCategories(response.data);
  }, [user.id]);

  useEffect(() => {
    const today = new Date();
    const monthAgo = subMonths(today, 1);
    setEndDate(today);
    setStartDate(monthAgo);

    loadPendingBets();
    loadBets({ start: monthAgo, end: today });
    loadMarkets();
    loadCategories();
  }, [loadBets, loadPendingBets, loadMarkets, loadCategories]);

  const onChange = useCallback(
    (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      setStartDate(start || undefined);
      setEndDate(end || undefined);

      if (start && end) {
        loadBets({ start, end });
      }
    },
    [loadBets],
  );

  const handleClickNewBet = useCallback(() => {
    onModalOpen();
  }, [onModalOpen]);

  const ButtonDatePicker = forwardRef(({ value, onClick }: any, ref) => (
    <Button onClick={onClick} ref={ref as any} variant="outline">
      {value}
    </Button>
  ));

  return (
    <>
      <Button
        onClick={() => handleClickNewBet()}
        colorScheme="blue"
        leftIcon={<BsPlus size={20} />}
      >
        Nova aposta
      </Button>
      <Card mt={8}>
        <Heading as="h6" size="md" mb={4}>
          Apostas pendentes
        </Heading>
        <ListTable
          pendingTable
          isLoading={isLoadingPendingBets}
          data={pendingBets}
        />
      </Card>
      <Card mt={8}>
        <Heading as="h6" size="md">
          Apostas no período
        </Heading>
        <Box my={4}>
          <DatePicker
            locale={ptBR}
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            monthsShown={2}
            selectsRange
            customInput={<ButtonDatePicker />}
          />
        </Box>
        <ListTable isLoading={isLoading} data={bets} pendingTable={false} />
      </Card>
      <BetModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        markets={markets}
        categories={categories}
      />
    </>
  );
}
