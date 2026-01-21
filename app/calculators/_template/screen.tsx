// app/calculators/_template/screen.tsx
import React from "react";
import { CalcScreen, Card, AppText } from "../../../components/ui";

export default function TemplateScreen() {
  return (
    <CalcScreen title="Template" showBack>
      <Card title="Template">
        <AppText variant="helper">Replace this with your calculator UI.</AppText>
      </Card>
      {/* UI goes here */}
    </CalcScreen>
  );
}
