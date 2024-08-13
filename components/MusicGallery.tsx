import { MasonryFlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { FlexAlignType } from "react-native";
import { Card, CardProps, Image, Text } from "tamagui";

import {
  AmbientNoise,
  BinuralBeats,
  BirdSongs,
  CampfireCrackles,
  ChillWave,
  GongSounds,
  GreenNoise,
  GregorianChants,
  LofiBeats,
  OceanSounds,
  RainSounds,
  WhiteNoise,
} from "./exports/ImageUriExports";

import { MultiStepFormEnums, Step5Values } from "~/types/forms";

export function MusicCard({
  title,
  alignSelf,
  onPress,
  selected,
  ImageSource,
  ...props
}: {
  title: string;
  alignSelf: "auto" | FlexAlignType;
  onPress: () => void;
  selected: boolean;
  ImageSource: string;
  props?: CardProps;
}) {
  return (
    <Card
      elevate
      size="$1"
      minHeight={170}
      minWidth={160}
      margin="$1.5"
      animation="lazy"
      pressStyle={{ scale: 0.875 }}
      onPress={onPress}
      onLongPress={() => {}}
      radiused
      style={{
        boxShadow: selected ? "inset 0 0 0 4px $color.primaryHover" : "none",
        filter: selected ? "grayscale(100%)" : "none",
      }}
      {...props}
    >
      <BlurView
        intensity={80}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 36,
          zIndex: 100,
        }}
      >
        <Card.Footer
          backgroundColor="#0f172a33"
          height={36}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          padding={2}
        >
          <Text color="#fff">{title}</Text>
        </Card.Footer>
      </BlurView>
      <Card.Background>
        <Image
          resizeMode="cover"
          alignSelf={alignSelf}
          source={{
            width: 400,
            height: 400,
            uri: ImageSource,
          }}
        />
      </Card.Background>
    </Card>
  );
}

const exports = {
  "Ocean Waves": OceanSounds,
  "Nature Sounds": BirdSongs,
  "Binural Beats": BinuralBeats,
  "Gong Sounds": GongSounds,
  "Sounds of Rain": RainSounds,
  "White Noise": WhiteNoise,
  "Green Noise": GreenNoise,
  "Lofi Beats": LofiBeats,
  "Ambient Noise": AmbientNoise,
  ChillWave,
  "CampFire Crackles": CampfireCrackles,
  "Gregorian Chants": GregorianChants,
};

const titles: MultiStepFormEnums["step5"] = [
  "Ocean Waves",
  "Nature Sounds",
  "Binural Beats",
  "Gong Sounds",
  "Sounds of Rain",
  "White Noise",
  "Green Noise",
  "Lofi Beats",
  "Ambient Noise",
  "ChillWave",
  "CampFire Crackles",
  "Gregorian Chants",
];

const images = titles.map((title) => exports[title]);

const MusicData = titles.map((title, index) => ({
  title,
  image: images[index],
}));

export default function MusicGallerySelector({
  handleMusicGalleryChange,
}: {
  handleMusicGalleryChange: (value: Step5Values, checked: boolean) => void;
}) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handlePress = (title: Step5Values) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(title)) {
        newSelectedItems.delete(title);
        handleMusicGalleryChange(title, false);
      } else {
        newSelectedItems.add(title);
        handleMusicGalleryChange(title, true);
      }
      return newSelectedItems;
    });
  };
  return (
    <MasonryFlashList
      data={MusicData}
      numColumns={2}
      focusable
      pagingEnabled
      showsVerticalScrollIndicator={false}
      style={{ height: "100%" }}
      renderItem={({ item }) => (
        <MusicCard
          alignSelf="center"
          ImageSource={item.image}
          title={item.title}
          onPress={() => handlePress(item.title)}
          selected={selectedItems.has(item.title)}
          props={{
            width: "160",
            height: "101",
            margin: "$1",
          }}
        />
      )}
      estimatedItemSize={60}
    />
  );
}
