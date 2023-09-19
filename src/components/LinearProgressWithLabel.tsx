import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const STEP = 2; // 2 ticks of progress of 100 total
const INTERVAL_MS = 20;

const OuterProgressBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UpperProgressBox = styled(Box)`
  width: 80%;
  margin-right: 10px;
`;

const LowerProgressBox = styled(Box)`
  min-width: 35;
`;

const ProgressTypography = styled(Typography)`
  font-weight: 800;
  letter-spacing: .05em;
`;

const ProgressContainer = styled(Box)`
  width: 100%;
`;

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <OuterProgressBox>
      <UpperProgressBox>
        <LinearProgress variant='determinate' sx={{
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#333'
          }
        }} {...props} />
      </UpperProgressBox>
      <LowerProgressBox>
        <ProgressTypography variant='body2'>{`${Math.round(
          props.value,
        )}%`}</ProgressTypography>
      </LowerProgressBox>
    </OuterProgressBox>
  );
}

export function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if(prevProgress >= 100) {
          clearInterval(timer);
          return prevProgress;
        }
        return prevProgress + STEP;
      });
    }, INTERVAL_MS);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ProgressContainer>
      <LinearProgressWithLabel value={progress} />
    </ProgressContainer>
  );
}
