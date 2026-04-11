"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ConfigSidebar from "../config/configSidebar";
import { ChevronUp, MoreHorizontal, Plus, User, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useRoute";
import { useDashboard } from "@/hooks/useDashboard";
import { Spinner } from "@/components/ui/spinner";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
export default function PageUsers() {
  type DataAllusers = {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
  };

  type TypeFormUsers = {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
  };
  const { logout } = useAuth();
  const { profile, loading } = useDashboard();
  const [datausers, setDatausers] = useState<DataAllusers[]>([]);
  const [formUsers, setFormUsers] = useState<TypeFormUsers>();
  const [modal, setModal] = useState<boolean>(false);
  async function PostUsers() {
    const token = Cookies.get("token");
    try {
      const formDataUsers = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/manage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-cache",
        },
      );
      toast.success("Success Create Users");
      setModal(false);
      return formDataUsers.json();
    } catch (error) {
      toast.error("Not Create users");
      console.error(error);
    }
  }

  async function getDataAllUsers() {
    const token = Cookies.get("token");
    try {
      const dataAllUsers = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/manage`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-cache",
        },
      );
      return dataAllUsers.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function DeleteUsers(id: number) {
    const token = Cookies.get("token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manage/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-cache",
      });
      setDatausers((prev) => prev.filter((item) => id !== item.id));
      toast.success("success delete data users");
    } catch (error) {
      console.error(error);
      return toast.error("Error Delete Data users");
    }
  }

  useEffect(() => {
    async function allData() {
      const dataApiUsers = await getDataAllUsers();
      setDatausers(dataApiUsers.data.data);
      console.log(setDatausers(dataApiUsers?.data));
    }
    allData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center mx-auto items-center text-center w-screen">
        <Spinner className="size-10 text-sky-400" />
      </div>
    );
  }
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ConfigSidebar.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild className="h-16">
                      <a href={item.url}>
                        <div>
                          <item.icon className="flex h-10" />
                        </div>
                        <span className="text-md">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center cursor-pointer gap-2.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="bg-white">
                <SidebarMenuButton>
                  <User2 /> {profile.full_name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56 rounded-[10px]">
                <DropdownMenuItem
                  variant="destructive"
                  className="w-56 rounded-[10px] cursor-pointer"
                >
                  <span onClick={logout}>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="container  min-h-full w-1000">
        <Navbar />
        <div className="flex items-center px-10 py-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-7 h-7 text-blue-400" />
                  <h3 className="text-xl">Manage Users</h3>
                </div>
                <div className="flex justify-between gap-5">
                  <Dialog open={modal} onOpenChange={setModal}>
                    <form>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus /> ADD USERS
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                          <DialogTitle className="text-start text-xl font-medium">
                            Add USERS
                          </DialogTitle>
                          <DialogDescription>
                            Create sebuah account users
                          </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                          <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text'"
                              placeholder={"John due"}
                            />
                          </Field>
                          <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder={"john@gmail.com"}
                            />
                          </Field>

                          <Field>
                            <Label htmlFor="password">password</Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              placeholder={"********"}
                            />
                          </Field>
                          <Field>
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input
                              id="phone_number"
                              name="phone_number"
                              type="number"
                              placeholder={"+62"}
                            />
                          </Field>
                        </FieldGroup>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant={"ghost"}>Cancel</Button>
                          </DialogClose>
                          <Button variant={"destructive"}>Submit</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="cursor-pointer">
                <TableHeader>
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datausers?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.full_name}</TableCell>
                      <TableCell>{item?.email}</TableCell>
                      <TableCell>{item?.phone_number}</TableCell>
                      <TableCell>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button size={"icon-sm"} className="cursor-pointer">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40" align="end">
                            <DropdownMenuLabel>Action USERS</DropdownMenuLabel>
                            <DropdownMenuGroup>
                              <DropdownMenuItem className="cursor-pointer">
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => DeleteUsers(item.id)}
                                className="cursor-pointer text-red-500"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
