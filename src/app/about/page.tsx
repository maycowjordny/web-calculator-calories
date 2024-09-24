"use client";
import Header from "@/components/header";
import { Box, Card, Container, Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 5, mb: 5 }} maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h4"
            fontWeight={500}
            color="primary"
            gutterBottom
          >
            Sobre a Fit Caloria
          </Typography>
          <Card sx={{ p: 3 }}>
            <Typography variant="body1" mb={2}>
              A <strong>Fit Caloria</strong> foi criada com o objetivo de ajudar
              pessoas a alcançarem seus objetivos de saúde e fitness por meio de
              uma ferramenta simples e eficaz de cálculo de calorias e
              macronutrientes. A partir de dados pessoais como idade, peso,
              altura, e nível de atividade física, nós calculamos suas
              necessidades diárias de calorias, além de sugerir dietas
              personalizadas com base nesses dados.
            </Typography>
            <Typography variant="body1" mb={2}>
              Nossa calculadora é projetada para oferecer precisão nas suas
              metas, seja para emagrecimento, ganho de massa muscular ou
              manutenção de peso. Sabemos que alcançar seus objetivos de saúde
              pode ser desafiador, por isso oferecemos um suporte prático para
              que você mantenha uma dieta balanceada e otimizada para seu estilo
              de vida.
            </Typography>
            <Typography variant="body1" mb={2}>
              Além do cálculo de calorias, nossa plataforma também sugere dietas
              personalizadas, levando em consideração as suas preferências
              alimentares e a quantidade ideal de proteínas, carboidratos e
              gorduras que você deve consumir diariamente.
            </Typography>
            <Typography variant="body1" mb={2}>
              Na Fit Caloria, acreditamos que a nutrição é a chave para o
              sucesso nos seus objetivos de saúde. Queremos fazer parte da sua
              jornada, oferecendo uma ferramenta acessível e confiável para
              ajudar você a viver de forma mais saudável.
            </Typography>
            <Typography variant="h6" mt={2} color="secondary">
              Nossa Missão
            </Typography>
            <Typography variant="body1">
              Ajudar você a atingir seus objetivos de saúde e bem-estar de
              maneira simples e eficiente, fornecendo cálculos precisos de
              calorias e dietas personalizadas ajustadas ao seu estilo de vida.
            </Typography>
          </Card>
        </Box>
      </Container>
    </>
  );
}
