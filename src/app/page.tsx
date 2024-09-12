"use client";
import CardMacronutrients from "@/components/card";
import CustomAccordion from "@/components/custom-acordeon";
import FormProvider from "@/components/form/form-provider";
import Header from "@/components/header";
import { Input } from "@/components/input";
import RHFSelect from "@/components/select-input";
import { MacrosProps } from "@/interface/macros";
import { calculatorCaloriesSchema } from "@/schema/calculator-calories-schema";
import { CalculatorCaloriesFormData } from "@/schema/types";
import axiosInstance from "@/service/axios";
import { endpoints } from "@/service/endpoints";
import { activityOptions } from "@/utils/activity-options";
import {
  faBreadSlice,
  faCheese,
  faDrumstickBite,
} from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Container, Typography } from "@mui/material";
import { useState } from "react";
import CountUp from "react-countup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [totalCalories, setTotalCalories] = useState(0);
  const [macros, setMacros] = useState<MacrosProps>({
    carbs: 0,
    fat: 0,
    protein: 0,
  });
  const [diets, setDiet] = useState<[]>([]);

  const defaultValues = {
    age: 0,
    gender: "male",
    weight: 0,
    height: 0,
    activity: 1.2,
    weightGoal: 0,
  };

  const methods = useForm<CalculatorCaloriesFormData>({
    resolver: zodResolver(calculatorCaloriesSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (data: CalculatorCaloriesFormData) => {
    const { activity, age, gender, height, weight, weightGoal } = data;

    try {
      const response = await axiosInstance.post(endpoints.calculateCalories, {
        activity,
        age,
        gender,
        height,
        weight,
        weightGoal,
      });

      const { quantity, carbs, fat, protein } = response.data.calories;
      console.log(response.data);

      setTotalCalories(quantity);
      setMacros({ carbs, fat, protein });

      toast.success("Calculo de calorias feito com sucesso!");

      toast.promise(
        axiosInstance
          .post(endpoints.gemini.diet, {
            calories: quantity,
          })
          .then((responseDiet) => {
            setDiet(responseDiet.data.diet);
            return responseDiet.data.diet;
          }),
        {
          pending: "Carregando dieta...",
          success: "Dieta carregada com sucesso!",
          error: "Falha ao carregar dieta.",
        }
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Header />
      <Container sx={{ mt: 5, mb: 5 }} maxWidth="md">
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr" }}
          gap={3}
          justifyContent="center"
        >
          <Card sx={{ p: 3 }}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap={2}
            >
              <Input
                name="gender"
                type="radio"
                options={[
                  { value: "male", label: "homem" },
                  { value: "female", label: "mulher" },
                ]}
              />
              <Input name="age" type="number" label="idade" />
              <Input
                name="weight"
                type="number"
                label="peso"
                placeholder="kg"
              />
              <Input
                name="weightGoal"
                type="number"
                label="meta de peso"
                placeholder="kg"
              />
              <Input
                name="height"
                type="number"
                label="altura"
                placeholder="cm"
              />
              <RHFSelect name="activity" options={activityOptions} />
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={!isDirty}
              >
                Calcular
              </LoadingButton>
            </Box>
          </Card>
          <Card sx={{ p: 3 }}>
            <Typography variant="h2" color="primary" textAlign="center">
              <CountUp start={0} end={totalCalories} duration={2.75} />
              kcal
            </Typography>
          </Card>
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
          >
            <CardMacronutrients
              icon={faDrumstickBite}
              size="2x"
              name="Proteína"
              macroValue={macros.protein}
            />
            <CardMacronutrients
              icon={faBreadSlice}
              size="2x"
              name="Carboidrato"
              macroValue={macros.carbs}
            />
            <CardMacronutrients
              icon={faCheese}
              size="2x"
              name="Gordura"
              macroValue={macros.fat}
            />
          </Box>
          {diets.map((diet, index) => (
            <CustomAccordion
              key={index}
              content={diet}
              title={`Dieta ${index + 1}`}
            />
          ))}
        </Box>
      </Container>
    </FormProvider>
  );
}
