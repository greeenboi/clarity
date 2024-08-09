import * as yup from "yup";

export type pwdScheme = "Sign in" | "Sign up";

export const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain at least one letter and one number",
    )
    .required("Password is required"),
});

export interface MultiStepFormEnums {
  step1: "Relax More" | "Sleep Better" | "Reduce Stress" | "Improve Focus";
  step2: ("Restless" | "Anxiety" | "Difficulty Concentrating" | "Insomnia")[];
  step3: "Yes" | "No" | "A Little";
  step4: number;
  step5: (
    | "Ocean Waves"
    | "Nature Sounds"
    | "Binural Beats"
    | "Gong Sounds"
    | "Sounds of Rain"
    | "White Noise"
    | "Green Noise"
    | "Lofi Beats"
    | "Ambient Noise"
    | "ChillWave"
    | "CampFire Crackles"
    | "Gregorian Chants"
  )[];
}

export interface MultiStepFormProps {
  question1: "What would you like to achieve?";
  question2: "Do you experience any of the following?";
  question3: "Do you have experience with meditation?";
  question4: "How many mindful minutes would you like to have in a day?";
  question5: "Choose a few of the sounds you find relaxing?";
}

export type MultiStepFormState = {
  [key in keyof MultiStepFormEnums]: MultiStepFormEnums[key];
};
