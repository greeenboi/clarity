import React, { memo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ListRenderItemInfo,
  ToastAndroid,
} from "react-native";
import SmoothPicker from "react-native-smooth-picker";
import { Text } from "tamagui";

const opacities: { [key: number]: number } = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText: { [key: number]: number } = {
  0: 20,
  1: 15,
  2: 10,
};

const Item = memo(
  ({
    opacity,
    selected,
    vertical,
    fontSize,
    name,
  }: {
    opacity: number;
    selected: boolean;
    vertical: boolean;
    fontSize: number;
    name: string;
  }) => {
    return (
      <View
        style={[
          styles.OptionWrapper,
          {
            opacity,
            borderColor: selected ? "#1DAC92" : "transparent",
            width: vertical ? 120 : "auto",
            height: 180,
          },
        ]}
      >
        <Text
          wordWrap="normal"
          style={{ fontSize, color: "#1DAC92", flexWrap: "nowrap" }}
        >
          {name}
        </Text>
      </View>
    );
  },
);

const ItemToRender = (
  { item, index }: ListRenderItemInfo<any>,
  indexSelected: number,
  vertical: boolean,
) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);
  // console.log("gap", gap);

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[4];
  }
  let fontSize = sizeText[gap] + 10;
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return (
    <Item
      opacity={opacity}
      selected={selected}
      vertical={vertical}
      fontSize={fontSize}
      name={item}
    />
  );
};

const NumberSlider = ({ onSelect }: { onSelect: (value: number) => void }) => {
  const numbers = Array.from({ length: 60 }, (_, i) => i + 1);
  function handleChange(index: number) {
    setSelected(index);
    onSelect(index);
    if (refPicker.current) {
      // @ts-ignore
      refPicker.current.scrollToIndex({
        animated: !isMomentumScrolling,
        index,
        viewOffset: -20,
      });
    }
  }

  const [isMomentumScrolling, setIsMomentumScrolling] = useState(false);
  const [selected, setSelected] = useState(1);
  const refPicker = useRef<SmoothPicker>(null);

  return (
    <SmoothPicker
      initialScrollToIndex={selected}
      onScrollToIndexFailed={() =>
        ToastAndroid.show("Failed to scroll", ToastAndroid.SHORT)
      }
      keyExtractor={(_, index) => index.toString()}
      data={numbers}
      scrollAnimation
      selectOnPress
      alwaysBounceHorizontal
      horizontal
      hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
      onMomentumScrollBegin={() => setIsMomentumScrolling(true)}
      onMomentumScrollEnd={() => setIsMomentumScrolling(false)}
      onEndReached={() =>
        ToastAndroid.show("That's All Folks!", ToastAndroid.SHORT)
      }
      onEndReachedThreshold={1.2}
      activeOpacityButton={1}
      onSelected={({ item, index }) => handleChange(index)}
      renderItem={(option) => ItemToRender(option, selected, true)}
      magnet
    />
  );
};

export default NumberSlider;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 30,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  wrapperHorizontal: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "black",
  },
  wrapperVertical: {
    width: 250,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "black",
  },
  OptionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    borderWidth: 3,
    borderRadius: 10,
  },
});
