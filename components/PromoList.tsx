import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useRef, useState } from "react";
import { Card, Image, YStack, Text, Progress, H3 } from "tamagui";

import {
  PromoData1,
  PromoData2,
  PromoData3,
  PromoData4,
} from "./exports/ImageUriExports";

const DATA = [
  {
    title: "RELAX MORE.",
    subtitle: "Reduce stress and anxiety with guided meditations",
    uri: PromoData1,
  },
  {
    title: "FOCUS BETTER.",
    subtitle: "Improve concentration and productivity",
    uri: PromoData2,
  },
  {
    title: "SLEEP LONGER.",
    subtitle: "Calm racing mind and prepare your body for deep sleep",
    uri: PromoData3,
  },
  {
    title: "LIVE BETTER.",
    subtitle: "Invest in personal sense of inner peace and balance",
    uri: PromoData4,
  },
];

const PromoList = () => {
  const flashListRef = useRef(null);
  const scrollInterval = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    //@ts-ignore
    scrollInterval.current = setInterval(() => {
      if (flashListRef.current) {
        const nextIndex = (currentIndex + 1) % DATA.length;
        //@ts-ignore
        flashListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
        setProgress((nextIndex + 1) * 25);
      }
    }, 4000);

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [currentIndex]);

  return (
    <>
      <FlashList
        ref={flashListRef}
        data={DATA}
        horizontal
        snapToAlignment="start"
        snapToInterval={100}
        pagingEnabled
        pinchGestureEnabled
        snapToStart
        decelerationRate={1}
        snapToOffsets={[0, 300, 600, 900, 1200]}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        estimatedItemSize={4}
        renderItem={({ item }) => (
          <Card
            elevate
            size="$4"
            alignItems="center"
            backgroundColor="$color.gray9"
            maxWidth="300"
          >
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
              <YStack alignItems="center" space={2}>
                <H3>{item.title}</H3>
                <Text color="$color.white" maxWidth="$15" textAlign="center">
                  {item.subtitle}
                </Text>
              </YStack>
            </Card.Footer>
          </Card>
        )}
      />
      <Progress size="$2" backgroundColor="$color.gray8" value={progress}>
        <Progress.Indicator
          backgroundColor="$color.primary"
          animation="bouncy"
        />
      </Progress>
    </>
  );
};

export default PromoList;
