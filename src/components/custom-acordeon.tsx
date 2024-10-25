import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  title: string;
  content: string;
};

export default function CustomAccordion({ title, content }: Props) {
  return (
    <Accordion
      sx={{
        "&::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <FontAwesomeIcon
            icon={faChevronDown}
            fontSize="15px"
            color="#4f9a94"
          />
        }
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1" component="div">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
