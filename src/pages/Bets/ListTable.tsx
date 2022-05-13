import {
  Center,
  HStack,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useCallback } from 'react';
import { BsCheck, BsList, BsPencilSquare, BsTrash, BsX } from 'react-icons/bs';
import { Transaction, TransactionStatus } from '../../models/transaction';
import { formatMoney } from '../../utils';

type Props = {
  data?: Transaction[];
  isLoading?: boolean;
  pendingTable: boolean;
};

export default function ListTable({ data, isLoading, pendingTable }: Props) {
  const getResultColor = useCallback((status: TransactionStatus) => {
    let color = '';
    if (status === TransactionStatus.LOSS) {
      color = 'red.500';
    } else if (status === TransactionStatus.DRAW) {
      color = 'yellow.500';
    } else if (status === TransactionStatus.PENDING) {
      color = 'blue.500';
    } else {
      color = 'green.500';
    }
    return color;
  }, []);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (!isLoading && (!data || data?.length === 0))
    return (
      <Center>
        <Text>Não há dados.</Text>
      </Center>
    );

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Evento</Th>
            <Th>Data</Th>
            <Th isNumeric>Valor</Th>
            <Th isNumeric>Odd</Th>
            {!pendingTable && <Th isNumeric>Resultado</Th>}
            {pendingTable && (
              <Th>
                <Center>Status</Center>
              </Th>
            )}
            <Th>
              <Center>Ações</Center>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item) => (
            <Tr key={item.id}>
              <Td>{item.eventName}</Td>
              <Td>{format(new Date(item.date), 'dd/MM/yyyy')}</Td>
              <Td isNumeric>{formatMoney(item.stake)}</Td>
              <Td isNumeric>{item.odd}x</Td>
              {item.status !== TransactionStatus.PENDING && (
                <Td isNumeric color={getResultColor(item.status)}>
                  {formatMoney(item.result)}
                </Td>
              )}
              {item.status === TransactionStatus.PENDING && (
                <Td>
                  <Center>
                    <HStack>
                      <IconButton
                        size="sm"
                        backgroundColor="green.300"
                        color="white"
                        aria-label="Ganhar"
                        icon={<BsCheck size={20} />}
                      />
                      <IconButton
                        size="sm"
                        backgroundColor="red.300"
                        color="white"
                        aria-label="Perder"
                        icon={<BsX size={20} />}
                      />
                      <IconButton
                        size="sm"
                        backgroundColor="blue.300"
                        color="white"
                        aria-label="Empatar"
                        icon={<BsList size={20} />}
                      />
                    </HStack>
                  </Center>
                </Td>
              )}
              <Td>
                <Center>
                  <HStack>
                    <IconButton
                      size="sm"
                      aria-label="Editar aposta"
                      icon={<BsPencilSquare />}
                    />

                    <IconButton
                      size="sm"
                      aria-label="Deletar aposta"
                      icon={<BsTrash />}
                    />
                  </HStack>
                </Center>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
