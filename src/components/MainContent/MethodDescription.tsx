import React, { memo } from 'react';
import { MethodSummary } from './MethodSummary';
import { MethodParameters } from './MethodParameters';
import { MethodResponse } from './MethodResponse';
type MethodDescriptionProps = {
  method: SwaggerJson.ApiMethod;
  definitions?: Record<string, SwaggerJson.Schema>;
};

export const MethodDescription: React.FC<MethodDescriptionProps> = memo(
  ({ method, definitions }) => {
    return (
      <>
        <MethodSummary method={method} />
        <MethodParameters parameters={method.parameters} definitions={definitions} />
        <MethodResponse responses={method.responses} definitions={definitions} />
      </>
    );
  },
);
