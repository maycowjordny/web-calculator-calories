import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Stack, Typography } from "@mui/material";

type CardProps = {
  name: string;
  icon: IconProp;
  size?: SizeProp;
  macroValue?: number;
};

export default function CardMacronutrients({
  icon,
  size,
  name,
  macroValue = 0,
}: CardProps) {
  return (
    <Card
      sx={{
        minHeight: 80,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 1.8,
      }}
    >
      <FontAwesomeIcon icon={icon} size={size} color="#4f9a94" />
      <Stack>
        <Typography>Meta de {name} diária</Typography>
        <Typography variant="body1" fontWeight="bold" color="#4f9a94">
          {macroValue}g
        </Typography>
      </Stack>
    </Card>
  );
}
