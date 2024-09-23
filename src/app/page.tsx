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
import { Alert, Box, Card, Container, Typography } from "@mui/material";
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
          <Alert severity="info">
            <Typography variant="body1" mb={1}>
              Se você inserir um peso abaixo do seu peso atual na meta de peso,
              a calculadora irá reduzir 20% das calorias diárias para promover a
              perda de peso.
            </Typography>
            <Typography variant="body1" mb={1}>
              Se sua meta de peso for maior, adicionaremos 300 calorias à sua
              dieta para facilitar o ganho de peso.
            </Typography>
            <Typography variant="subtitle1" mt={2}>
              Estagnação de peso:
            </Typography>
            <Typography variant="body2" mb={1}>
              Se após 3 semanas o seu peso estagnar (não perder ou ganhar peso),
              recomendamos ajustar 200 calorias:
            </Typography>
            <Typography variant="body2" mb={1}>
              Ganhar peso: Aumente 200 calorias, principalmente de carboidratos.
            </Typography>
            <Typography variant="body2" mb={1}>
              Perder peso: Reduza 200 calorias, retirando-as dos carboidratos.
            </Typography>
            <Typography variant="subtitle1" mt={2}>
              Manutenção de Massa Muscular:
            </Typography>
            <Typography variant="body1">
              Para proteger seus músculos, mantenha sua ingestão de proteínas em
              2x o seu peso atual. Nossa calculadora já estima a quantidade
              ideal de proteínas, carboidratos e gorduras com base em suas
              necessidades.
            </Typography>
          </Alert>
          <Box>
            <Typography
              variant="h4"
              fontWeight={500}
              textAlign="center"
              color="#4f9a94"
              mb={2}
            >
              FAQ - Fit Caloria
            </Typography>
            <CustomAccordion
              title="O que é a Fit Caloria?"
              content="A Fit Caloria é uma ferramenta online que ajuda você a calcular suas necessidades diárias de calorias e macronutrientes (proteínas, carboidratos e gorduras) com base nas suas informações físicas e no seu objetivo de peso, seja para emagrecer, ganhar massa muscular ou manter seu peso atual."
            />
            <CustomAccordion
              title="Como funciona a calculadora de calorias?"
              content="Nossa calculadora utiliza dados como idade, altura, peso, sexo, nível de atividade física e sua meta de peso para calcular o total de calorias que você precisa consumir diariamente. Se sua meta for perder peso, a calculadora ajustará automaticamente as calorias para promover o emagrecimento. Se sua meta for ganhar peso, adicionaremos calorias extras para auxiliar no ganho muscular."
            />
            <CustomAccordion
              title=" Quais são os macronutrientes calculados?"
              content="Nós calculamos três macronutrientes essenciais:

Proteínas: Estimamos a quantidade ideal de proteínas com base no seu peso e objetivo. Recomendamos manter a ingestão de proteínas em 2x o seu peso corporal.
Carboidratos: Ajustamos a quantidade de carboidratos dependendo do seu nível de atividade física e meta de peso.
Gorduras: Calculamos a quantidade de gorduras necessárias para manter um bom equilíbrio nutricional."
            />
            <CustomAccordion
              title="A Fit Caloria cria dietas personalizadas?"
              content="Sim! Além de calcular suas calorias e macronutrientes, oferecemos dietas personalizadas baseadas nas suas necessidades calóricas diárias. Essas dietas são elaboradas automaticamente após o cálculo das calorias, ajudando você a planejar suas refeições de acordo com seus objetivos."
            />
            <CustomAccordion
              title=" O que devo fazer se meu peso estagnar?"
              content="Se, após algumas semanas, seu peso não mudar (não houver perda ou ganho de peso), sugerimos ajustar sua ingestão calórica em cerca de 200 calorias:

Para ganhar peso: Aumente 200 calorias, preferencialmente de carboidratos.
Para perder peso: Reduza 200 calorias, diminuindo a ingestão de carboidratos."
            />
          </Box>
        </Box>
      </Container>
    </FormProvider>
  );
}
