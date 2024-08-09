import { MasonryFlashList } from "@shopify/flash-list";
import { Text } from "tamagui";
import { Container } from "./Container";

export default function MusicGallerySelector() {
  const DATA = Array.from({ length: 60 }, (_, i) => i + 1);
  return (
    <MasonryFlashList
        data={DATA}
        numColumns={2}
        renderItem={({ item }) => <Text>{item}</Text>}
        estimatedItemSize={60}
    />
  );
}
