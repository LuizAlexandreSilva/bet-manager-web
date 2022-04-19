import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

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
  // const router = useRouter();

  const onSubmit = useCallback(async (formData: FormData) => {
    // const res = await signIn<'credentials'>('credentials', {
    //   redirect: false,
    //   callbackUrl: '/dashboard',
    //   email: formData.email,
    //   password: formData.password,
    // });
    // if (res?.error) {
    //   toast();
    // }
    // if (res?.url) {
    //   router.push(res.url);
    // }
  }, []);

  return (
    <Flex h="100vh" align="center" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box maxW="container.xs" borderWidth="1px" borderRadius="lg" p="6">
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
