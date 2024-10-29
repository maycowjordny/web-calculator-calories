export interface SessionProps {
  id: string;
  email: string;
  isPaid: boolean;
  paymentType: "CARD" | "BOLETO" | "PIX";
  sessionId: string;
}
