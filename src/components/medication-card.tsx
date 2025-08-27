import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Pill } from "lucide-react";

interface MedicationCardProps {
  name: string;
  brandName: string;
  dosage: string;
  sideEffects: string;
}

export function MedicationCard({ name, brandName, dosage, sideEffects }: MedicationCardProps) {
  const { t } = useTranslation();
  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-semibold">
          <Pill className="h-6 w-6 text-primary" />
          {name}
        </CardTitle>
        <p className="text-sm text-muted-foreground pt-1">{t('brand_name_label')}: {brandName}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t('dosage_label')}</h3>
          <p className="text-base">{dosage}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{t('side_effects_label')}</h3>
          <p className="text-base">{sideEffects}</p>
        </div>
      </CardContent>
    </Card>
  );
}
