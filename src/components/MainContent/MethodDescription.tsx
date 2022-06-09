import React, { useMemo, memo, useEffect } from 'react';
import { MethodSummary } from './MethodSummary';
import { MethodParameters } from './MethodParameters';

type MethodDescriptionProps = {
  method: SwaggerJson.ApiMethod | null;
  definitions: Record<string, SwaggerJson.Schema> | null;
};

export const MethodDescription: React.FC<MethodDescriptionProps> = ({ method, definitions }) => {
  useEffect(() => {
    console.log('---------MethodDescription--------');
  }, [method]);
  return (
    <>
      <MethodSummary method={method} />
      <MethodParameters parameters={method!.parameters} definitions={definitions || {}} />
    </>
  );
};
