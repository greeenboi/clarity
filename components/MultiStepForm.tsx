import { useState } from "react";
import { H2 } from "tamagui";

import { Container } from "./Container";

import { Button } from "~/tamagui.config";
import {
  MultiStepFormEnums,
  MultiStepFormProps,
  MultiStepFormState,
} from "~/types/forms";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<MultiStepFormState>({
    step1: "Relax More",
    step2: [],
    step3: "Yes",
    step4: 0,
    step5: [],
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);
  const handleChange = (key: keyof MultiStepFormState, value: any) => {
    console.log(`Updating ${key} to ${value}`);
    setFormState((prev) => {
      const newState = { ...prev, [key]: value };
      console.log("New State:", newState);
      return newState;
    });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formState);
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

  return (
    <Container
      backgroundColor="$color.gray9"
      flexDirection="column"
      justifyContent="center"
      width="100%"
      padding="$1"
      marginVertical="$10"
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
          <H2>{Questions.question1}</H2>
          <Container width="100%" padding="$1" marginVertical="$4" gap="$2">
            {step1Values.map((value: MultiStepFormState["step1"]) => (
              <Button
                backgroundColor="#252D41"
                selectionColor="#4A5A82"
                key={value}
                onPress={() => {
                  handleChange("step1", value);
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
          <H2>{Questions.question2}</H2>
          <Container width="100%" padding="$1" marginVertical="$4" gap="$2">
            <H2>Part 2 here</H2>
          </Container>
        </Container>
      )}
      {step > 1 && <Button onPress={handlePrev}>Previous</Button>}
      {step < 5 && step > 1 && <Button onPress={handleNext}>Next</Button>}
      {step === 5 && <Button onPress={handleSubmit}>Submit</Button>}
    </Container>
  );
}
