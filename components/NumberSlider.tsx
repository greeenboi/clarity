import { FlashList } from "@shopify/flash-list";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const NumberSlider = ({ onSelect }: { onSelect: (value: number) => void }) => {
  const numbers = Array.from({ length: 60 }, (_, i) => i + 1);
  const middleIndex = Math.floor(numbers.length / 2);
  const [selectedNumber, setSelectedNumber] = useState(numbers[middleIndex]);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      //@ts-ignore
      listRef.current.scrollToIndex({ index: middleIndex, animated: true });
    }
    onSelect(numbers[middleIndex]);
  }, [listRef.current]);

  const handleSelect = (item: number) => {
    setSelectedNumber(item);
    onSelect(item);
  };

  return (
    <FlashList
      ref={listRef}
      data={numbers}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelect(item)}>
          <View
            style={{
              padding: 10,
              margin: 5,
              backgroundColor: item === selectedNumber ? "#aaa" : "#ddd",
              borderRadius: 5,
            }}
          >
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.toString()}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={middleIndex}
      //   getItemLayout={(data, index) => ({
      //     length: 50,
      //     offset: 50 * index,
      //     index,
      //   })}
    />
  );
};

export default NumberSlider;
