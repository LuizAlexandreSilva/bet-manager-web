import {
  As,
  Center,
  HStack,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { BsCheck, BsClock, BsPencilSquare, BsTrash, BsX } from 'react-icons/bs';
import { Transaction, TransactionStatus } from '../../models/transaction';
import { formatMoney } from '../../utils';

type Props = {
  data?: Transaction[];
  isLoading?: boolean;
};
const StatusIcon: As = (status: TransactionStatus) => {
  if (status === TransactionStatus.WON) {
    return <BsCheck />;
  }
  if (status === TransactionStatus.LOSS) {
    return <BsX />;
  }
  return <BsClock />;
};

export default function ListTable({ data = [], isLoading }: Props) {
  if (isLoading) return <Spinner />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Evento</Th>
            <Th>Data</Th>
            <Th>Mercado</Th>
            <Th isNumeric>Valor</Th>
            <Th isNumeric>Odd</Th>
            <Th>
              <Center>Status</Center>
            </Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.eventName}</Td>
              <Td>{format(new Date(item.date), 'dd/MM/yyyy HH:mm')}</Td>
              <Td>{item.Market?.name || '-'} </Td>
              <Td isNumeric>{formatMoney(item.stake)}</Td>
              <Td isNumeric>{item.odd}x</Td>
              <Td>
                <Center>
                  <Icon as={StatusIcon} />
                </Center>
              </Td>
              <Td>
                <HStack>
                  <BsPencilSquare />
                  <BsTrash />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
