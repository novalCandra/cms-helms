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
import { HardHat, Lock, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import FormSchema from "../schema/schemaLogin";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function FormAuth() {
  const navigate = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function OnSubmit(values: z.infer<typeof FormSchema>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!data) {
      alert("Tidak bisa Login");
      return;
    }

    await fetch("/api/auth/set_token", {
      method: "POST",
      body: JSON.stringify({ token: data.data.token }),
      credentials: "include",
    });

    if (data.data.role === "admin") {
      navigate.push("/admin");
    } else if (data.data.role === "petugas") {
      navigate.push("/petugas");
    } else {
      navigate.push("/users/home");
    }
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
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(OnSubmit)}
              >
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
                            <InputGroupAddon>
                              <MailIcon />
                            </InputGroupAddon>
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
                            <InputGroupAddon>
                              <Lock />
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="text-end text-sm text-sky-500">
                  <Link href={"/auth/forgotpassword"}>Forgot password</Link>
                </div>
                <div className="flex justify-center items-center">
                  <Button className="w-80">Login</Button>
                </div>
              </form>
            </Form>
            <div className="d-flex mt-2 text-center">
              <p>
                Already to{" "}
                <Link className="text-sky-500" href={"/auth/register"}>
                  Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
