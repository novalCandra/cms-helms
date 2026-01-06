"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HardHat } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import FormSchema from "../schema/schemaLogin";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
export default function FormAuth() {
  const navigate = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit() {
    console.log("check");
    navigate.push("/");
  }
  return (
    <>
      <div className="w-full max-w-md">
        {/* logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <HardHat className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">HelmetHub</span>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput
                              type="email"
                              placeholder="Enter Your Email"
                              {...field}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="flex justify-center items-center">
                  <Button className="w-80">Login</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
