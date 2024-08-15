import { Audio } from "expo-av";
import { useEffect } from "react";
import { Label } from "tamagui";

import { Pause, Play } from "./icons";

export default function PlaySound({
  uri,
  shouldPlay = true,
  volume = 1.0,
  isLooping = false,
  isMuted = false,
  rate = 1.0,
  positionMillis = 0,
  progressUpdateIntervalMillis = 500,
  onPlaybackStatusUpdate,
  isPlaying,
  sound,
  setSound,
}: {
  uri: string;
  shouldPlay?: boolean;
  volume?: number;
  isLooping?: boolean;
  isMuted?: boolean;
  rate?: number;
  positionMillis?: number;
  progressUpdateIntervalMillis?: number;
  onPlaybackStatusUpdate?: (status: any) => void;
  isPlaying?: boolean;
  sound?: Audio.Sound | undefined;
  setSound?: (sound: Audio.Sound) => void;
}) {
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay, volume, isLooping, isMuted, rate, positionMillis },
    );
    if (onPlaybackStatusUpdate) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
    sound.setIsLoopingAsync(isLooping);
    sound.setIsMutedAsync(isMuted);
    sound.setRateAsync(rate, false);
    sound.setPositionAsync(positionMillis);
    sound.setProgressUpdateIntervalAsync(progressUpdateIntervalMillis);
    if (shouldPlay) {
      await sound.playAsync();
      console.log("Playing Sound");
    }
    if (sound && setSound) {
      setSound(sound);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Label onPress={playSound}>
      {sound && isPlaying ? <Pause /> : <Play />}
    </Label>
  );
}
