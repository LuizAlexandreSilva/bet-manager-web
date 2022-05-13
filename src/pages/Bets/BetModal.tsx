import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { TransactionStatus } from '../../models/transaction';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categories?: any[];
  markets?: any[];
};

export default function BetModal({
  isOpen,
  onClose,
  categories = [],
  markets = [],
}: Props) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nova aposta</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormControl mt={2}>
              <FormLabel htmlFor="eventName">Evento *</FormLabel>
              <Input
                id="eventName"
                {...register('eventName', {
                  required: 'Campo obrigatório',
                  minLength: {
                    value: 4,
                    message: 'Mínimo 4 caracteres',
                  },
                })}
              />
            </FormControl>

            <HStack mt={4}>
              <FormControl>
                <FormLabel>Data *</FormLabel>
                <DatePicker
                  locale={ptBR}
                  dateFormat="dd/MM/yyyy"
                  selected={selectedDate}
                  onChange={(date) => {
                    setValue('date', date);
                    setSelectedDate(date);
                  }}
                  customInput={
                    <Input
                      id="date"
                      {...register('date', {
                        required: 'Campo obrigatório',
                      })}
                    />
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="category">Esporte/Campeonato</FormLabel>
                <Controller
                  control={control}
                  render={() => (
                    <Select
                      placeholder="Selecione"
                      id="category"
                      options={categories.map((c: any) => ({
                        label: c.name,
                        value: c.id,
                      }))}
                      onChange={(v: any) => setValue('category', v.value)}
                    />
                  )}
                  name="category"
                />
              </FormControl>
            </HStack>

            <HStack mt={4}>
              <FormControl>
                <FormLabel htmlFor="market">Mercado/Estratégia</FormLabel>
                <Controller
                  name="market"
                  render={() => (
                    <Select
                      id="market"
                      placeholder="Selecione"
                      options={markets.map((m: any) => ({
                        label: m.name,
                        value: m.id,
                      }))}
                      onChange={(v: any) => setValue('market', v.value)}
                    />
                  )}
                  control={control}
                />
              </FormControl>
            </HStack>

            <HStack mt={4}>
              <FormControl>
                <FormLabel htmlFor="stake">Valor *</FormLabel>
                <NumberInput precision={2} min={0.1}>
                  <NumberInputField
                    id="stake"
                    {...register('stake', {
                      required: 'Campo obrigatório',
                    })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="odd">Odd *</FormLabel>
                <NumberInput min={1}>
                  <NumberInputField
                    id="odd"
                    min={1}
                    {...register('odd', {
                      required: 'Campo obrigatório',
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>

            <FormControl mt={4}>
              <FormLabel htmlFor="note">Descrição</FormLabel>
              <Textarea
                maxLength={255}
                id="note"
                {...register('note')}
                noOfLines={2}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="status">Status *</FormLabel>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    defaultValue={TransactionStatus.WON}
                    onChange={onChange}
                    value={value}
                  >
                    <HStack justify="space-between">
                      <Radio value={TransactionStatus.WON}>Vitória</Radio>
                      <Radio value={TransactionStatus.LOSS}>Derrota</Radio>
                      <Radio value={TransactionStatus.DRAW}>Empate</Radio>
                      <Radio value={TransactionStatus.PENDING}>Pendente</Radio>
                    </HStack>
                  </RadioGroup>
                )}
                name="status"
                control={control}
              />
            </FormControl>
            <Box mt={3} d="flex" justifyContent="flex-end">
              <Text as="small">* Campos obrigatórios</Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" type="submit">
              Salvar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
