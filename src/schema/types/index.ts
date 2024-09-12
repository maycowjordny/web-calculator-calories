import { z } from "zod";
import { calculatorCaloriesSchema } from "../calculator-calories-schema";

export type CalculatorCaloriesFormData = z.infer<
  typeof calculatorCaloriesSchema
>;
