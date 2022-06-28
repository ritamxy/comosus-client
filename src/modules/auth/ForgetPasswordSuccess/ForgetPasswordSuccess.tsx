import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalRoute } from '@src/constants/PageRoutes';
import { VStack, Text, Link } from '@chakra-ui/react';
import { Button } from '@common/components';

export default function ForgetPasswordSuccess() {
  const { t } = useTranslation('auth');

  return (
    <VStack minW="567px" minH="280px" gap="60px" align="center">
      <VStack align="stretch">
        <Text fontSize="30px" fontWeight="400">
          {t('forget-password-success.page.title')}
        </Text>
        <Text fontSize="15px" fontWeight="400">
          {t('forget-password-success.page.subtitle')}
        </Text>
      </VStack>
      <Button type="button">
        <Link href={GlobalRoute.Root}>
          {t('forget-password-success.button')}
        </Link>
      </Button>
    </VStack>
  );
}
