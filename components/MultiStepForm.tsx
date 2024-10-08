import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { H2, ScrollView, Progress, YStack } from "tamagui";

import CheckboxWithLabel from "./CheckboxLabel";
import { Container } from "./Container";
import MusicGallerySelector from "./MusicGallery";
import NumberSlider from "./NumberSlider";

import { Button } from "~/tamagui.config";
import {
  MultiStepFormEnums,
  MultiStepFormProps,
  MultiStepFormState,
  Step2Values,
  Step5Values,
} from "~/types/forms";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const totalSteps = 5;
  useEffect(() => {
    setProgress((step / totalSteps) * 100);
  }, [step]);
  const [formState, setFormState] = useState<MultiStepFormState>({
    step1: "Relax More",
    step2: [],
    step3: "Yes",
    step4: 0,
    step5: [],
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleStep1Change = (key: keyof MultiStepFormState, value: any) => {
    console.log(`Updating ${key} to ${value}`);
    setFormState((prev) => {
      const newState = { ...prev, [key]: value };
      console.log("New State:", newState);
      return newState;
    });
  };

  const handleCheckboxChange = (value: Step2Values, checked: boolean) => {
    console.log("Checkbox Change:", value, checked);
    setFormState((prev) => {
      const newStep2 = checked
        ? [...prev.step2, value]
        : prev.step2.filter((item) => item !== value);
      console.log("New Step 2:", newStep2);
      return { ...prev, step2: newStep2 };
    });
  };

  const handleMusicGalleryChange = (value: Step5Values, checked: boolean) => {
    console.log("Music Change:", value, checked);
    setFormState((prev) => {
      const newStep5 = checked
        ? [...prev.step5, value]
        : prev.step5.filter((item) => item !== value);
      console.log("New Step 5:", newStep5);
      return { ...prev, step5: newStep5 };
    });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formState);
    ToastAndroid.show("Form Submitted", ToastAndroid.SHORT);
    router.replace("/details");
  };

  const Questions: MultiStepFormProps = {
    question1: "What would you like to achieve?",
    question2: "Do you experience any of the following?",
    question3: "Do you have experience with meditation?",
    question4: "How many mindful minutes would you like to have in a day?",
    question5: "Choose a few of the sounds you find relaxing?",
  };

  const step1Values: MultiStepFormEnums["step1"][] = [
    "Relax More",
    "Sleep Better",
    "Reduce Stress",
    "Improve Focus",
  ];

  const step2Values: Step2Values[] = [
    "Restless",
    "Anxiety",
    "Difficulty Concentrating",
    "Insomnia",
  ];

  const step3Values: MultiStepFormEnums["step3"][] = ["Yes", "No", "A Little"];

  return (
    <>
      <Progress
        size="$2"
        value={progress}
        backgroundColor="$color.gray5"
        position="absolute"
        top="$0"
        alignSelf="center"
      >
        <Progress.Indicator animation="lazy" backgroundColor="$color.primary" />
      </Progress>
      <ScrollView
        backgroundColor="$color.gray9"
        flexDirection="column"
        scrollEnabled={step === 5}
        width="100%"
        height="100%"
        padding="$0"
        marginVertical="$10"
        flexGrow={1}
      >
        {step === 1 && (
          <Container
            width="100%"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            padding="$1"
            gap="$4"
          >
            <H2
              textAlign="center"
              width="100%"
              minWidth="$20"
              fontSize={24}
              numberOfLines={2}
            >
              {Questions.question1}
            </H2>
            <Container width="100%" padding="$1" marginVertical="$4" gap="$2">
              {step1Values.map((value: MultiStepFormState["step1"]) => (
                <Button
                  backgroundColor={
                    formState.step1 === value ? "#4A5A82" : "#252D41"
                  }
                  selectionColor="#4A5A82"
                  key={value}
                  size="$5"
                  onPress={() => {
                    handleStep1Change("step1", value);
                    handleNext();
                  }}
                >
                  {value}
                </Button>
              ))}
            </Container>
          </Container>
        )}
        {step === 2 && (
          <Container
            width="100%"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            padding="$1"
            gap="$4"
          >
            <H2
              textAlign="center"
              width="100%"
              minWidth="$20"
              fontSize={24}
              numberOfLines={2}
            >
              {Questions.question2}
            </H2>
            <Container width="100%" padding="$1" marginVertical="$4" gap="$3">
              {step2Values.map((value: Step2Values, index) => (
                <CheckboxWithLabel
                  key={value}
                  size="$2"
                  id={`checkbox-${index}`}
                  backgroundColor={
                    formState.step2.includes(value) ? "#4A5A82" : "#252D41"
                  }
                  checked={formState.step2.includes(value)}
                  label={value}
                  onCheckedChange={(checked) => {
                    // console.log("Checked: ", checked, value);
                    handleCheckboxChange(value, checked as boolean);
                  }}
                />
              ))}
            </Container>
          </Container>
        )}
        {step === 3 && (
          <Container
            width="100%"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            padding="$1"
            gap="$4"
          >
            <H2
              textAlign="center"
              width="100%"
              minWidth="$20"
              fontSize={24}
              numberOfLines={2}
            >
              {Questions.question3}
            </H2>
            <Container width="100%" padding="$1" marginVertical="$4" gap="$2">
              {step3Values.map((value: MultiStepFormState["step3"]) => (
                <Button
                  backgroundColor={
                    formState.step3 === value ? "#4A5A82" : "#252D41"
                  }
                  selectionColor="#4A5A82"
                  key={value}
                  size="$5"
                  textAlign="center"
                  onPress={() => {
                    handleStep1Change("step3", value);
                    handleNext();
                  }}
                >
                  {value}
                </Button>
              ))}
            </Container>
          </Container>
        )}
        {step === 4 && (
          <Container
            width="100%"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            padding="$1"
            gap="$4"
          >
            <H2
              textAlign="center"
              width="100%"
              minWidth="$20"
              fontSize={24}
              numberOfLines={3}
            >
              {Questions.question4}
            </H2>
            <Container
              width="100%"
              minHeight="$10"
              padding="$1"
              marginVertical="$6"
              gap="$2"
              justifyContent="center"
              alignItems="center"
            >
              <NumberSlider
                onSelect={(value) => handleStep1Change("step4", value)}
              />
            </Container>
          </Container>
        )}
        {step === 5 && (
          <Container
            style={{
              flex: 1,
              height: "auto",
              // width: Dimensions.get("screen").width,
            }}
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            padding="$0"
            gap="$4"
            height="100%"
            minWidth="$20"
            minHeight={500}
          >
            <H2
              textAlign="center"
              width="100%"
              minWidth="$20"
              fontSize={24}
              numberOfLines={3}
              marginVertical="$4"
            >
              {Questions.question5}
            </H2>
            <MusicGallerySelector
              handleMusicGalleryChange={handleMusicGalleryChange}
            />
          </Container>
        )}
      </ScrollView>
      <YStack maxHeight="108px" margin="0" padding="0">
        {step < 5 && step > 1 && (
          <Button
            onPress={handleNext}
            width="100%"
            minWidth="$14"
            marginVertical="$1"
          >
            Next
          </Button>
        )}
        {step === 5 && (
          <Button onPress={handleSubmit} marginVertical="$1">
            Submit
          </Button>
        )}
        {step > 1 && (
          <Button
            onPress={handlePrev}
            width="100%"
            minWidth="$14"
            marginVertical="$1"
            chromeless
          >
            Previous
          </Button>
        )}
      </YStack>
    </>
  );
}
