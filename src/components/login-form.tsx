"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AtSign, Phone, Lock, LogIn } from "lucide-react";
import { SymptomAidLogo } from "./icons";
import { useTranslation } from "@/hooks/use-translation";
import { LanguageSwitcher } from "@/components/language-switcher";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export function LoginForm() {
    const { t } = useTranslation();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onEmailSubmit = (values: z.infer<typeof emailSchema>) => {
    console.log("Email login:", values);
    // Handle email login logic here
  };

  const onPhoneSubmit = (values: z.infer<typeof phoneSchema>) => {
    console.log("Phone login:", values);
    // Handle phone login logic here
  };

  return (
    <Card>
      <CardHeader className="text-center relative">
        <div className="absolute top-2 right-2">
            <LanguageSwitcher />
        </div>
        <div className="flex justify-center mb-2">
            <SymptomAidLogo className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl">{t('welcome_back')}</CardTitle>
        <CardDescription>
          {t('sign_in_prompt')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">
              <AtSign className="mr-2 h-4 w-4" /> {t('email_tab')}
            </TabsTrigger>
            <TabsTrigger value="phone">
              <Phone className="mr-2 h-4 w-4" /> {t('phone_tab')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-6 pt-4"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email_label')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emailForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('password_label')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t('sign_in_with_email_button')}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="phone">
            <Form {...phoneForm}>
              <form
                onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
                className="space-y-6 pt-4"
              >
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('phone_label')}</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="tel"
                            placeholder="+1 (555) 555-5555"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={phoneForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('password_label')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                   <LogIn className="mr-2 h-4 w-4" />
                   {t('sign_in_with_phone_button')}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
