"use client";
import CustomAccordion from "@/components/custom-acordeon"; // Assumindo que você usa o acordeão
import Header from "@/components/header"; // Assumindo que você tem o Header como componente global
import { Box, Card, CardContent, Container, Typography } from "@mui/material";

export default function Tips() {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dicas para uma Vida Saudável
        </Typography>
        <Typography variant="body1" gutterBottom>
          Aqui estão algumas dicas para te ajudar a manter uma alimentação
          saudável e equilibrada.
        </Typography>

        <Box display="grid" gap={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                1. Beba bastante água
              </Typography>
              <Typography variant="body2">
                Manter-se hidratado é essencial para o bom funcionamento do seu
                corpo. Tente beber pelo menos 2 litros de água por dia.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                2. Equilibre sua alimentação
              </Typography>
              <Typography variant="body2">
                Mantenha uma dieta equilibrada com todos os macronutrientes
                (proteínas, carboidratos e gorduras). Evite exageros e prefira
                alimentos naturais.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                3. Faça exercícios regularmente
              </Typography>
              <Typography variant="body2">
                Exercícios físicos ajudam a manter o peso e a melhorar o
                condicionamento físico. Tente praticar pelo menos 30 minutos de
                atividade física por dia.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                4. Evite alimentos processados
              </Typography>
              <Typography variant="body2">
                Alimentos ultraprocessados possuem aditivos e conservantes que
                podem prejudicar sua saúde a longo prazo. Prefira alimentos
                frescos e naturais.
              </Typography>
            </CardContent>
          </Card>

          <CustomAccordion
            title="Dica Extra: Planeje suas refeições"
            content="Planejar suas refeições com antecedência pode te ajudar a manter uma alimentação mais equilibrada e evitar escolhas impulsivas que não são saudáveis."
          />
        </Box>
      </Container>
    </>
  );
}
