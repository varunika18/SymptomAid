"use client";

import { useTranslation } from "@/hooks/use-translation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-auto gap-2">
        <Languages className="h-4 w-4" />
        <SelectValue placeholder={t('language_placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिन्दी</SelectItem>
        <SelectItem value="te">తెలుగు</SelectItem>
      </SelectContent>
    </Select>
  );
}
