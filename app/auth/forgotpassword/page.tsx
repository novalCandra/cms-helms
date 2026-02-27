import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { HardHat } from "lucide-react";

export default function page() {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <HardHat className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-muted-foreground">
              HelmHub
            </span>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <h2 className="text-2xl font-bold text-foreground">
                Forgot Password
              </h2>
              <p className="text-muted-foreground">
                Please fill in the number below.
              </p>
            </CardHeader>
            <CardContent>
              <Field>
                <div className="flex flex-row sm:flex-col justify-center items-center gap-4">
                  <FieldLabel>Masukan Token</FieldLabel>
                  <FieldTitle className="text-muted-foreground">
                    Please enter the correct token.
                  </FieldTitle>
                </div>
                <InputOTP id="digitis-only" maxLength={6}>
                  <div className="flex justify-center items-center mx-auto">
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot
                        index={0}
                        className="bg-secondary text-white"
                      />
                      <InputOTPSlot
                        index={1}
                        className="bg-secondary text-white"
                      />
                      <InputOTPSlot
                        index={2}
                        className="bg-secondary text-white"
                      />
                      <InputOTPSlot
                        index={3}
                        className="bg-secondary text-white"
                      />
                      <InputOTPSlot
                        index={4}
                        className="bg-secondary text-white"
                      />
                      <InputOTPSlot
                        index={5}
                        className="bg-secondary text-white"
                      />
                    </InputOTPGroup>
                  </div>
                </InputOTP>
              </Field>
            </CardContent>
            <CardFooter className="flex flex-row sm:flex-col w-56 sm:w-80 mx-auto">
              <Field>
                <Button className="rounded-[10px] cursor-pointer px-10 py-4">
                  Vertifikasi
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
