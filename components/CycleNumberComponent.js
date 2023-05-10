import React from "react";
import { Chip } from "@mui/material";
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';


export const CycleNumberComponent = ({ cycleNumber }) => {
  return <Chip icon={<ModelTrainingIcon />} label={`Cycle #${cycleNumber}`} />;
};
