"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { signUpSchema } from "@/validation/signUp";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

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

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // loading jab koi ui change hona hoga tab mai wha p ye true kar dunga okkh!..
  // jab mughe foam submit karna hoga to us case m mai submitning ko true karunga!..
  const [Submiting, setisSubmiting] = useState<boolean>(false);
  // agar kuch backend s data ayega uskoo store karlo and show karo okkh!..

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
    // dekh defaultValue agar nahi dunga to wo faom m undefined chize dikhegi!..
    // but agar de diya to wo empty hoga undefined nahi okkh!..
  });

  // yha p side backend call bhi kar skta tha like useEffects okkh!..
  // like get method s axios.get() isse and isme like queryParams lgta hai na wo bhi lagega!..

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setisSubmiting(true);
    try {
      const response = await axios.post(`api/sign-Up`, { data });
      console.log(response.data.messages);
      toast(response.data.message);
      router.push("/signIn");
      setisSubmiting(false);
    } catch (e) {
      const error = e as Error;
      console.log(error);
      toast("error catch wala");
      setisSubmiting(false);
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
            Already have an account?{" "}
            <Link className="text-orange-400" href={`/signIn`}>
              Sign in
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
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>userName</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm font-medium"
                        placeholder="UserName"
                        {...field}
                        value={userName}
                        onChange={(e) => {
                          field.onChange(e);
                          setUserName(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  disabled={Submiting}
                  className="bg-red-600 px-16 text-white hover:bg-red-700"
                >
                  {Submiting ? (
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

export default SignUp;
