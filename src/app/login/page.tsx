import { LanguageProvider } from "@/components/language-provider";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <LanguageProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </LanguageProvider>
  );
}
