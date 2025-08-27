"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Bot, Loader2 } from "lucide-react";
import {
  suggestMedication,
  type MedicationSuggestionOutput,
} from "@/ai/flows/medication-suggestion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { SymptomAidLogo } from "@/components/icons";
import { MedicationCard } from "@/components/medication-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { LanguageSwitcher } from "@/components/language-switcher";

const formSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Please describe your symptoms in at least 10 characters.",
  }),
});

export function SymptomForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<MedicationSuggestionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { t, language } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    setError(null);

    startTransition(async () => {
      try {
        const response = await suggestMedication({ ...values, language });
        if (response && response.medications.length > 0) {
          setResult(response);
        } else {
          setError(t('no_suggestions_error'));
        }
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : t('unexpected_error');
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: t('error_title'),
          description: t('fetch_suggestions_error'),
        });
      }
    });
  }

  return (
    <div className="space-y-8">
       <header className="flex flex-col items-center text-center relative">
        <div className="absolute top-0 right-0">
          <LanguageSwitcher />
        </div>
        <SymptomAidLogo className="h-12 w-12 text-primary mb-2" />
        <h1 className="text-3xl font-bold tracking-tight">{t('symptom_form_title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('symptom_form_subtitle')}
        </p>
      </header>
      
      <Card className="p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">{t('describe_symptoms_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('symptoms_placeholder')}
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-base" disabled={isPending} size="lg">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('analyzing_button')}
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-5 w-5" />
                  {t('get_suggestions_button')}
                </>
              )}
            </Button>
          </form>
        </Form>
      </Card>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t('disclaimer_title')}</AlertTitle>
        <AlertDescription>
          {t('disclaimer_text')}
        </AlertDescription>
      </Alert>
      
      {isPending && (
        <div className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold text-center">{t('finding_suggestions_text')}</h2>
          <Skeleton className="w-full h-[230px] rounded-lg" />
          <Skeleton className="w-full h-[230px] rounded-lg" />
        </div>
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t('error_title')}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {result && (
        <div className="space-y-6 pt-4 animate-in fade-in-50 duration-500">
          <h2 className="text-2xl font-bold text-center">{t('ai_suggestions_title')}</h2>
          <div className="grid gap-4 md:grid-cols-1">
            {result.medications.map((med, index) => (
              <MedicationCard key={index} {...med} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
