import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Link,
  FormErrorMessage,
  Logo,
  Input,
  Button,
} from '@src/common/components';
import { FormControl, VStack, Text } from '@chakra-ui/react';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import Policy from './Policy';

type SignUpFormProps = {
  onSubmit: (values: SignUpFormTypes) => void;
  isInvalid: boolean;
  isLoading: boolean;
};

export default function SignUpForm({
  onSubmit,
  isInvalid,
  isLoading,
}: SignUpFormProps) {
  const { t } = useTranslation('auth');

  const formValues = {
    inputs: [
      {
        type: 'text',
        name: 'username',
        placeholder: t('signup.username.placeholder'),
        leftElement: <AiOutlineUser />,
      },
      {
        type: 'email',
        name: 'email',
        placeholder: t('signup.email.placeholder'),
        leftElement: <AiOutlineMail />,
      },
      {
        type: 'password',
        name: 'password',
        placeholder: t('signup.password.placeholder'),
        leftElement: <RiLockPasswordLine />,
      },
    ],
    defaultValues: {
      username: '',
      email: '',
      password: '',
      acceptPolicy: 0,
    },
    schema: yup
      .object({
        username: yup
          .string()
          .required(t('signup.username.error.required'))
          .min(6, t('signup.username.error.min-length')),
        email: yup.string().email().required(t('signup.email.error.required')),
        password: yup.string().required(t('signup.password.error.required')),
        acceptPolicy: yup.boolean().isTrue(t('signup.policy.error.required')),
      })
      .required(),
  };

  const { handleSubmit, control } = useForm({
    defaultValues: formValues.defaultValues,
    resolver: yupResolver(formValues.schema),
    reValidateMode: 'onBlur',
  });

  return (
    <VStack maxW="480px" align="stretch" gap="60px">
      <Logo />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={isInvalid}>
          <VStack align="stretch" gap="30px">
            {formValues.inputs.map(
              ({ type, name, placeholder, leftElement }, index) => {
                return (
                  <Input
                    key={index}
                    type={type}
                    name={name}
                    control={control}
                    placeholder={placeholder}
                    leftElement={leftElement}
                  />
                );
              },
            )}

            <Policy name="acceptPolicy" control={control} />
            <FormErrorMessage error={t('signup.error.user-exist')} />
            <Button type="submit" isLoading={isLoading}>
              {t('signup.button')}
            </Button>
          </VStack>
        </FormControl>
      </form>
      <Text textAlign="center">
        {t('signup.no-account.description')}
        <Link highlight href="/">
          {t('signup.no-account.action')}
        </Link>
      </Text>
    </VStack>
  );
}
