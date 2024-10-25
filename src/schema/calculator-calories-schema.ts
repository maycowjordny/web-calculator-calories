import { z } from "zod";

export const calculatorCaloriesSchema = z.object({
  age: z
    .union([
      z.string().regex(/^\d*$/, "Invalid number").transform(Number),
      z.number().min(1, "campo idade é obrigatório"),
    ])
    .refine((val) => !isNaN(val), "Invalid number"),
  gender: z.string().min(1, "O campo gênero é obrigatório"),
  weight: z
    .union([
      z.string().regex(/^\d*$/, "Invalid number").transform(Number),
      z.number().min(1, "campo peso é obrigatório"),
    ])
    .refine((val) => !isNaN(val), "Invalid number"),
  height: z
    .union([
      z.string().regex(/^\d*$/, "Invalid number").transform(Number),
      z.number().min(1, "campo altura é obrigatório"),
    ])
    .refine((val) => !isNaN(val), "Invalid number"),
  activity: z
    .union([
      z.string().regex(/^\d*$/, "Invalid number").transform(Number),
      z.number().min(1, "campo nível de atividade é obrigatório"),
    ])
    .refine((val) => !isNaN(val), "Invalid number"),
  weightGoal: z
    .union([
      z.string().regex(/^\d*$/, "Invalid number").transform(Number),
      z.number().min(1, "campo meta de peso é obrigatório"),
    ])
    .refine((val) => !isNaN(val), "Invalid number"),
  excludedFoods: z
    .array(z.string())
    .max(5, "So é permitido colocar 5 alimetos"),
});
