"use client";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Hammer,
  Hand,
  HardHat,
  Undo2,
  WalletCardsIcon,
  Warehouse,
} from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import SchemaBorrowed from "../schema/SchemaBorrowed";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Home from "@/app/page";
import { ToastContainer, toast } from "react-toastify";
type TypeHelms = {
  helmet_name: string;
  condition: string;
  status: string;
  daily_price: string;
};
export default function Page() {
  const navigate = useRouter();
  const [isModelOpen, setModalOpen] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [avaible, setAvaible] = useState<TypeHelms[]>([]);

  const form = useForm<z.infer<typeof SchemaBorrowed>>({
    resolver: zodResolver(SchemaBorrowed),
    defaultValues: {
      helmet_id: "",
      borrow_date: "",
      return_date: "",
    },
  });

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  async function apiProfile() {
    const token = Cookies.get("token");
    const responApiProvile = await fetch(
      `http://127.0.0.1:8000/api/v1/auth/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-cache",
      },
    );
    return responApiProvile.json();
  }

  async function ApiHelms() {
    try {
      const token = Cookies.get("token");
      const helms = await fetch(`http://127.0.0.1:8000/api/v1/helments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        credentials: "include",
      });
      return helms.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function PostBorrowed(values: z.infer<typeof SchemaBorrowed>) {
    const token = Cookies.get("token");
    try {
      const Borrowed = await fetch(`http://127.0.0.1:8000/api/v1/borroed`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-cache",
        credentials: "include",
        body: JSON.stringify(values),
      });
      toast.success("Sucess Borrwoed Helms");
      Borrowed.json();
      form.reset();
      setModalOpen(false)
      console.log("check");
    } catch (error) {
      toast.error("error");
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      const data = await apiProfile();
      setProfile({
        full_name: data.data.full_name,
        email: data.data.email,
      });
      const dataHelms = await ApiHelms();
      setAvaible(dataHelms.data.data);
      setIsLoading(false);
    }

    fetchProfile();
  }, []);

  const OnLogout = async (): Promise<void> => {
    const token = Cookies.remove("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authrization: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-cache",
    });
    navigate.push("/auth/login");
  };

  if (loading) {
    return (
      <>
        <div className="flex min-h-screen justify-center items-center">
          <Spinner className="size-10 text-sky-400" />
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar
        profile={{
          full_name: profile.full_name || "Quest",
          email: profile.email || "quest@gmail.com",
          onLogout: OnLogout,
        }}
      />
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {profile.full_name || "Quest"}!
            </h1>
            <p className="text-muted-foreground">
              Manage your helmet borrowing and stay safe.
            </p>
          </div>
          {/* end welcome */}
          {/* Status card */}
          <div className="flex flex-col md:flex-row gap-10 justify-between mb-6">
            {/* Current Status */}
            <Card className="border-0 shadow-md lg:w-72 md:w-40">
              <CardHeader className="-pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Borrowing Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <HardHat className="w-8 h-8 text-sky-600" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        HLM-003
                      </p>
                      <p className="text-muted-foreground">
                        Currently Borrowed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Calendar size={20} className="text-gray-400" />
                    <p className="text-base text-muted-foreground">
                      Return by: 2024-02-10
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* end Current Status */}

            {/* borrows */}
            <Card className="border-0 shadow-md lg:w-72 md:w-40">
              <CardHeader className="-pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Borrows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-sky-200 py-2 px-2 rounded-sm">
                      <HardHat className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-base text-foreground">All time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* end borrows */}

            {/* Quick Action */}
            <Card className="border-0 shadow-md lg:w-96 md:w-40">
              <CardHeader className="-pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={isModelOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size={"lg"}>
                      <HardHat className="w-4 h-4 mr-2" />
                      Borrow Helmet
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Borrow a Helmet</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(PostBorrowed)}
                        className="space-y-6"
                      >
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label>Select Helmet</Label>
                            <FormField
                              control={form.control}
                              name="helmet_id"
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose A Helments" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="6">KYT</SelectItem>
                                    <SelectItem value="2">
                                      Shoies X16
                                    </SelectItem>
                                    <SelectItem value="8">
                                      Arai RX-7V
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Borrow Date</Label>
                            <FormField
                              control={form.control}
                              name="borrow_date"
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  type="date"
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                          <div className="spave-y-2">
                            <Label>Return Schedule</Label>
                            <FormField
                              control={form.control}
                              name="return_date"
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  type="date"
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                          {/* <DialogClose asChild> */}
                          <Button className="w-full" type="submit">
                            <WalletCardsIcon className="w-7 h-7 text-white" />
                            Confirm Borrow
                          </Button>
                          {/* </DialogClose> */}
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"} className="w-full" size={"lg"}>
                      <Undo2 className="w-4 h-4 mr-2" />
                      Return Helments
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Return Helmet</DialogTitle>
                      <DialogDescription>Returning a Helms</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="p-4 bg-muted rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Helmet ID:
                          </span>
                          <span className="font-medium">HLM-003</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Borrowed on:
                          </span>
                          <span className="font-medium">2024-02-01</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Due date:
                          </span>
                          <span className="font-medium">2024-02-10</span>
                        </div>
                      </div>
                      <DialogClose asChild>
                        <Button type="submit" className="w-full">
                          Confirm Return
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            {/* end borrows */}
          </div>
          {/*end status card */}
          {/* Table Avaible Helments */}
          <Card className="border-0 shadow-md mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="w-10 h-10 text-sky-300 " />
                <p className="text-xl font-bold">Available Helmets</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>Helmet</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Price/Day</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {avaible.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell>{item.helmet_name}</TableCell>
                        <TableCell>{item.condition}</TableCell>
                        <TableCell className="text-blue-400">
                          {item.daily_price}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "available"
                                ? "default"
                                : item.status === "rented"
                                  ? "destructive"
                                  : item.status === "maintenance"
                                    ? "outline"
                                    : "secondary"
                            }
                          >
                            {item.status === "available" ? (
                              <>
                                <Warehouse />
                                {item.status}
                              </>
                            ) : item.status === "rented" ? (
                              <>
                                <Hand />
                                {item.status}
                              </>
                            ) : item.status === "maintenance" ? (
                              <>
                                <Hammer />
                                {item.status}
                              </>
                            ) : (
                              <Home />
                            )}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          {/* end table Avaible Helments */}{" "}
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
