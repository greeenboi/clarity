import { YStackProps, YStack } from 'tamagui';

interface ContainerProps extends YStackProps {
  children: React.ReactNode;
}

export const Container = ({ children, ...ystackProps }: ContainerProps) => {
  return (
    <YStack flex={1} padding="$6" {...ystackProps}>
      {children}
    </YStack>
  );
};
