import React, { useMemo, memo, useEffect } from 'react';
import { MethodSummary } from './MethodSummary';
import { MethodParameters } from './MethodParameters';
import { MethodResponse } from './MethodResponse';
type MethodDescriptionProps = {
  method: SwaggerJson.ApiMethod | null;
  definitions?: Record<string, SwaggerJson.Schema>;
};

export const MethodDescription: React.FC<MethodDescriptionProps> = ({ method, definitions }) => {
  return (
    <>
      <MethodSummary method={method} />
      <MethodParameters parameters={method!.parameters} definitions={definitions || {}} />
      <MethodResponse response={method?.responses} definitions={definitions} />
    </>
  );
};
