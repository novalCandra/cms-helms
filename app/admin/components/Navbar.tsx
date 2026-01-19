import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleDollarSign, Plus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import z from "zod";
import SchemaAddHelms from "../schema/SchemaAddHelms";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
export default function Navbar() {
  const [open, setOpenModal] = useState(false);
  // handle Form
  const form = useForm<z.infer<typeof SchemaAddHelms>>({
    resolver: zodResolver(SchemaAddHelms),
    defaultValues: {
      helmet_name: "",
      condition: undefined,
      status: undefined,
      daily_price: "",
      late_fee_per_day: "",
    },
  });

  console.log(form.formState.errors);

  async function addHelms(values: z.infer<typeof SchemaAddHelms>) {
    const token = Cookies.get("token");
    try {
      const apiAddHelms = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/helments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-cache",
          body: JSON.stringify(values),
        },
      );

      const allApi = apiAddHelms.json();
      toast.success("Success Add Helms");
      form.reset();
      setOpenModal(true);
    } catch (error) {
      toast.error(`${error} add Helms`);
      console.log(error);
    }
  }

  return (
    <nav className=" border-b-gray-500 top-0 z-50">
      <div className="container mx-auto flex px-10 py-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={open} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button
                variant={"default"}
                className="rounded-[5px] cursor-pointer"
              >
                <Plus />
                Add Helments
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(addHelms)}>
                  <DialogHeader>
                    <DialogTitle>Add New Helmet</DialogTitle>
                    <DialogDescription>
                      Here are the latest Suilahkan Helm helmets.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label>Helm</Label>
                      <FormField
                        control={form.control}
                        name="helmet_name"
                        render={({ field }) => (
                          <InputGroup>
                            <InputGroupInput
                              {...field}
                              placeholder="Enter Your Add Helm"
                            />
                          </InputGroup>
                        )}
                      />
                      <Label>Condition</Label>
                      <FormField
                        control={form.control}
                        name="condition"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-96">
                              <SelectValue placeholder="Condition Helms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Condition Helms</SelectLabel>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="very_good">
                                  Very Good
                                </SelectItem>
                                <SelectItem value="excellent">
                                  Excellent
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <Label>Status</Label>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-96">
                              <SelectValue placeholder="Select Status Helm" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status Helms</SelectLabel>
                                <SelectItem value="available">
                                  Available
                                </SelectItem>
                                <SelectItem value="rented">Rented</SelectItem>
                                <SelectItem value="maintenance">
                                  Maintenance
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      <Label>Daily Price</Label>
                      <FormField
                        control={form.control}
                        name="daily_price"
                        render={({ field }) => (
                          <InputGroup>
                            <InputGroupInput
                              {...field}
                              type="number"
                              placeholder="0.000"
                            />
                            <InputGroupAddon>
                              <CircleDollarSign />
                            </InputGroupAddon>
                          </InputGroup>
                        )}
                      />

                      <Label>Late Fee perDay</Label>
                      <FormField
                        control={form.control}
                        name="late_fee_per_day"
                        render={({ field }) => (
                          <InputGroup>
                            <InputGroupInput
                              {...field}
                              type="number"
                              placeholder="0.000"
                            />
                            <InputGroupAddon>
                              <CircleDollarSign />
                            </InputGroupAddon>
                          </InputGroup>
                        )}
                      />
                    </div>
                  </div>
                  <DialogDescription className="mt-3">
                    <Button
                      type="submit"
                      variant={"default"}
                      className="w-full cursor-pointer rounded-[10px]"
                    >
                      Add helments
                    </Button>
                  </DialogDescription>
                </form>
              </Form>
            </DialogContent>
            <ToastContainer />
          </Dialog>
        </div>
      </div>
    </nav>
  );
}
