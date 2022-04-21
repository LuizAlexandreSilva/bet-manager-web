import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = useCallback(
    async (formData: FormData) => {
      try {
        const { email, password } = formData;
        await signIn({ email, password });

        navigate('/dashboard', { replace: true });
      } catch (err: any) {
        toast({
          id: 'sign-in-error',
          title:
            err?.response?.data?.message ||
            'Ocorreu um erro inesperado. Tente novamente.',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [signIn, navigate, toast],
  );

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  return (
    <Flex h="100vh" align="center" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box maxW="container" borderWidth="1px" borderRadius="lg" p="6">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              id="email"
              placeholder="email@exemplo.com"
              type="email"
              {...register('email', {
                required: 'Campo obrigatório',
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password" mt="4">
              Senha
            </FormLabel>
            <Input
              id="password"
              placeholder="******"
              type="password"
              {...register('password', {
                required: 'Campo obrigatório',
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>

            <Button
              type="submit"
              isLoading={isSubmitting}
              w="100%"
              mt="6"
              colorScheme="blue"
            >
              Entrar
            </Button>
          </FormControl>
        </Box>
      </form>
    </Flex>
  );
};

export default SignIn;
