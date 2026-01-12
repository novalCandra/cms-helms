"use client";
import Link from "next/link";
import { Eye, HardHat, Lock, Mail, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSchemaRegister from "../schema/SchemaRegister";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
export default function Page() {
  const navigate = useRouter();
  const form = useForm<z.infer<typeof FormSchemaRegister>>({
    resolver: zodResolver(FormSchemaRegister),
    defaultValues: {
      full_name: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchemaRegister>) {
    const resRegister = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await resRegister.json();

    if (!data) {
      alert("gagal register");
      return;
    }

    await fetch("api/auth/set_token", {
      method: "POST",
      body: JSON.stringify({ token: data.token }),
    });
    navigate.push("/auth/login");
  }
  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="w-full max-w-md">
          {/* logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <HardHat className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              HelmetHub
            </span>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <h2 className="text-2xl font-bold text-foreground">
                Create Account
              </h2>
              <p className="text-muted-foreground">
                Join us and start borrowing safely
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  className="space-y-5"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>full name</FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                type="full name"
                                placeholder="Enter Your fullname"
                                {...field}
                              />
                              <InputGroupAddon>
                                <User />
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
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>email</FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                type="email"
                                placeholder="Enter Your email"
                                {...field}
                              />
                              <InputGroupAddon>
                                <Mail />
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
                    name="phonenumber"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>phone number</FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                type="number"
                                placeholder="Enter Your Phone Number"
                                {...field}
                              />
                              <InputGroupAddon>
                                <Phone />
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
                          <FormLabel>password</FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                type="password"
                                placeholder="Enter Your password"
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

                  <FormField
                    control={form.control}
                    name="confirmpassword"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>confirm password</FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                type="password"
                                placeholder="Enter Your Confirm Password"
                                {...field}
                              />
                              <InputGroupAddon>
                                <Eye />
                              </InputGroupAddon>
                            </InputGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <div className="flex justify-center text-center">
                    <Checkbox className="bg-gray-300 mt-1 mr-3" />
                    <p>I agree to the Terms & Conditions and Privacy Policy</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <Button className="w-80">Register</Button>
                  </div>
                </form>
              </Form>
              <div className="d-flex mt-2 text-center">
                <p>
                  Already have an account?
                  <Link className="text-sky-500" href={"/auth/login"}>
                    Login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
