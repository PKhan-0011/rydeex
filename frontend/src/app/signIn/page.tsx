// yha p tera signIn aur signUp ka page banega okkh!..
"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/validation/signIn";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  //const [backendData, setBackendData] = useState<string>("");

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // yha p abb like na submit karna hai handleSubmit!..

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/v1/auth/signIn", {
        email,
        password,
      });

      // yha p hame backend 4 chize deta hai like
      // error, url, ok, status..

      if (!response) {
        toast(response);
      }

      setIsSubmitting(false);
    } catch (e) {
      const error = e as Error;
      console.log(error);
      toast("Error Catch wala");
    }
  };

  return (
    <div className="mx-auto flex min-h-7 max-w-4xl justify-center">
      <div className="mt-8">
        <div className="m-4 mt-2 space-y-2">
          <h1 className="font-serif text-4xl font-semibold text-black">
            Get started
          </h1>
          <p className="text-gray-700">
            do not have an account?{" "}
            <Link className="text-orange-400" href={`/signUp`}>
              Sign Up
            </Link>
          </p>
        </div>

        {/* signUp with google and github*/}

        <div className="m-4 mt-8 flex gap-4">
          <div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-16 py-2 hover:bg-gray-100">
            <FcGoogle />
            <span className="font-medium">Google</span>
          </div>

          <div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-16 py-2 hover:bg-gray-100">
            <RxGithubLogo />
            <span className="font-medium">Github</span>
          </div>
        </div>

        {/*signUp with email*/}
        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="flex-1 border-t border-gray-400"></div>
          <h1 className="text-sm tracking-tight text-orange-500">
            OR CONTINUE WITH EMAIL
          </h1>
          <div className="flex-1 border-t border-gray-400"></div>
        </div>

        {/* form ayega abb yha s and iske bhut sari chize ayengi like loader and kahi kahi kuch text color etc,,*/}

        <div className="m-4 mt-4 flex gap-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm font-medium"
                        placeholder="Enter Your Email.."
                        {...field}
                        value={email}
                        onChange={(e) => {
                          field.onChange(e);
                          setEmail(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm font-medium"
                        placeholder="Password"
                        {...field}
                        value={password}
                        onChange={(e) => {
                          field.onChange(e);
                          setPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* form submitting button banega uska okkh!..*/}

              <div className="flex items-center pt-2">
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={submitting}
                  className="bg-red-600 px-16 text-white hover:bg-red-700"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Create account <ArrowRight />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
