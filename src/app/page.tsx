import { LanguageProvider } from "@/components/language-provider";
import { SymptomForm } from "@/components/symptom-form";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-2xl">
          <SymptomForm />
        </div>
      </main>
    </LanguageProvider>
  );
}
