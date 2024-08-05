import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { Card, Image, YStack, H3, Text } from 'tamagui'

import { PromoData1, PromoData2, PromoData3, PromoData4 } from './exports/ImageUriExports';

const DATA = [
  {
    title: 'STRESS LESS.',
    subtitle: 'Make mindfulness a daily habit and be kind to your mind.',
    uri: PromoData1,
  },
  {
    title: 'RELAX MORE.',
    subtitle: 'Unwind and find serenity in a guided meditation session',
    uri: PromoData2,
  },
  {
    title: 'SLEEP LONGER.',
    subtitle: 'Calm racing mind and prepare your body for deep sleep',
    uri: PromoData3,
  },
  {
    title: 'LIVE BETTER.',
    subtitle: 'Invest in personal sense of inner peace and balance',
    uri: PromoData4,
  },
];

const PromoList = () => {
  return (
    <FlashList
      data={DATA}
      horizontal
      snapToAlignment='start'
      snapToInterval={100}
      pagingEnabled
      pinchGestureEnabled
      snapToStart
      decelerationRate={1}
      snapToOffsets={[0, 300, 600, 900, 1200]}
      // scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => 
        <Card elevate size="$4" alignItems='center' backgroundColor='$color.gray9' maxWidth='300'>
            <Image
              resizeMode="contain"
              alignSelf="center"
              source={{
                  width: 300,
                  height: 458,
                  uri: item.uri,
              }}
            />
            <Card.Footer padded>
                <YStack
                  alignItems='center'
                  space={2}
                >
                  <H3>{item.title}</H3>
                  <Text color='$color.white' maxWidth='$15' textAlign='center'>{item.subtitle}</Text>
                </YStack>
            </Card.Footer>
        </Card>
      }
      estimatedItemSize={5}
      // inverted
      onEndReached={
        () => ToastAndroid.show('End', ToastAndroid.SHORT)
      }
    />
  );
};

export default PromoList;
