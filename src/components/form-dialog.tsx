import axiosInstance from "@/service/axios";
import { endpoints } from "@/service/endpoints";
import { faCreditCard, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  Fragment,
  ReactElement,
  Ref,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import pixIcon from "../../public/pix-icon.svg";
import { Input } from "./input";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  isPaidSession: boolean | undefined;
};

export default function FormDialog({ isPaidSession }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setisValidEmail] = useState(false);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  function validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  useEffect(() => {
    setisValidEmail(validateEmail(email));
  }, [email]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCheckoutCard = async () => {
    try {
      const response = await axiosInstance.post(endpoints.stripe.checkoutCard, {
        email,
      });

      const checkout = response.data;
      localStorage.setItem("sessionId", checkout.id);
      router.push(checkout.url);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Erro ao selecionar pagamento"
      );
    }
  };

  const handleCheckoutPix = async () => {
    try {
      const response = await axiosInstance.post(
        endpoints.mercadoPago.checkoutPix,
        {
          email,
        }
      );

      const checkout = response.data;
      localStorage.setItem("sessionId", checkout.id);
      router.push(checkout.url);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Erro ao selecionar pagamento"
      );
    }
  };

  return (
    <Fragment>
      <LoadingButton
        variant="contained"
        sx={{ p: 1 }}
        onClick={handleClickOpen}
        disabled={isPaidSession}
      >
        Dieta Personalizda R$4,99
      </LoadingButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: smDown ? "16px" : "20px" }}>
          {"E-mail para seguir com o pagamento"}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <FontAwesomeIcon icon={faX} fontSize={15} />
        </IconButton>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          label="Seu melhor e-mail"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 1,
            alignItems: "center",
            gap: 1,
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{ borderRadius: 0.5, width: "100%" }}
            size="large"
            disabled={!isValidEmail}
            startIcon={<FontAwesomeIcon icon={faCreditCard} />}
            onClick={() => {
              handleClose();
              handleCheckoutCard();
            }}
          >
            Pagar com cartão
          </Button>
          <Button
            variant="contained"
            size="large"
            disabled={!isValidEmail}
            onClick={() => {
              handleClose();
              handleCheckoutPix();
            }}
            sx={{ borderRadius: 0.5, width: "100%" }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Image src={pixIcon} alt="logo pix" width={20} height={20} />
              <>Pagar com Pix</>
            </Box>
          </Button>
        </Box>
      </Dialog>
    </Fragment>
  );
}
