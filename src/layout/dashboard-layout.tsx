import Header from "@/components/header";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <Box>
      <Header />
      <Box paddingX={16} paddingY={6}>
        {children}
      </Box>
    </Box>
  );
}
