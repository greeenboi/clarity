import { BlurView } from "expo-blur";
import { useState } from "react";
import { FlexAlignType } from "react-native";
import { Card, CardProps, Image, Stack, Text } from "tamagui";

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
import { Play } from "./icons";

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
  // console.log("title is selected: ", title, selected);

  const handleLongPress = () => {
    console.log("Long Pressed");

  };

  return (
    <Card
      elevate
      size="$1"
      height={170}
      minWidth={160}
      width={250}
      margin="$1.5"
      animation="quick"
      pressStyle={{ scale: 0.875 }}
      onPress={onPress}
      scale={selected ? 0.95 : 1}
      // onLongPress={handleLongPress}
      borderRadius={16}
      borderWidth={selected ? 4 : 0}
      borderColor="$color.primaryHover"
      {...props}
    >
      <BlurView
        intensity={80}
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          height: 36,
          zIndex: 100,
          borderWidth: 0,
          borderRadius: 12,
        }}
      >
        <Card.Footer
          backgroundColor="#0f172a33"
          height={36}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          padding={2}
        >
          <Text color="#fff">{title}</Text>
          <Play />
        </Card.Footer>
      </BlurView>
      <Card.Background borderRadius={12}>
        <Image
          resizeMode="cover"
          alignSelf={alignSelf}
          source={{
            width: 250,
            height: 170,
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
    <Stack
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
    >
      {MusicData.map((item) => (
        <MusicCard
          key={item.title}
          alignSelf="center"
          ImageSource={item.image}
          title={item.title}
          onPress={() => handlePress(item.title)}
          selected={selectedItems.has(item.title)}
        />
      ))}
    </Stack>
  );
}
