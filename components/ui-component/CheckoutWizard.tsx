import { Stepper, StepLabel, Step } from '@mui/material';

type Props = {
  steps: number;
};

const listStep: string[] = ['Login', 'Shipping Address', 'Payment Method', 'Place Order'];

const CheckoutWizard = ({ steps = 0 }: Props) => {
  return (
    <Stepper activeStep={steps} alternativeLabel>
      {listStep.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutWizard;
