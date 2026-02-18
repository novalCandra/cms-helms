"use client";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Ban,
  CheckLine,
  ChevronUp,
  HardHat,
  Menu,
  User,
  User2,
} from "lucide-react";
import { ConfigSidebar } from "../config/SidebarConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

type TypeUsers = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  delete_at: string | undefined;
};
export default function Page() {
  const navigate = useRouter();
  const [loading, setIsLoading] = useState<boolean>(true);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
  });
  const [users, setusers] = useState<TypeUsers[]>([]);

  async function ApiProfile() {
    const token = Cookies.get("token");
    try {
      const apiProfle = await fetch(
        `http://127.0.0.1:8000/api/v1/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
          credentials: "include",
        },
      );

      return apiProfle.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function apiManage() {
    const token = Cookies.get("token");
    try {
      const Manage = await fetch(`http://127.0.0.1:8000/api/v1/manage`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        credentials: "include",
      });
      return Manage.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function ApiBanned(id: number) {
    const token = Cookies.get("token");
    try {
      await fetch(`http://127.0.0.1:8000/api/v1/manage/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setusers((prev) => prev.filter((item) => id !== item.id));
      toast.success("successfully banned users");
    } catch (error) {
      console.error(error);
      toast.error("cannot ban users");
    }
  }

  const OnLogout = async (): Promise<void> => {
    const token = Cookies.get("token");
    await fetch(`http://127.0.0.1:8000/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
      credentials: "include",
    });
    navigate.push("auth/login");
    Cookies.remove("token");
  };
  useEffect(() => {
    async function fetchingManage() {
      const apidataProfile = await ApiProfile();
      setForm({
        full_name: apidataProfile.data.full_name,
        email: apidataProfile.data.email,
      });

      const apiDataManage = await apiManage();
      setusers(apiDataManage.data);
      setIsLoading(false);
    }
    fetchingManage();
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex container min-h-screen justify-center items-center mx-auto w-screen">
          <Spinner className="size-10 text-sky-400" />
        </div>
      </>
    );
  }
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500 text-white cursor-pointer">
              <HardHat className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xl text-center font-bold text-foreground">
            HelmetHub
          </span>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {ConfigSidebar.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild className="h-16">
                    <a href={item.url}>
                      <div>
                        <item.icon className="flex h-10" />
                      </div>
                      <span className="text-md">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <div className="flex items-center cursor-pointer gap-2.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="bg-white">
                <SidebarMenuButton>
                  <User2 /> {form.full_name || "quest"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56 rounded-[10px]">
                <DropdownMenuItem
                  variant="destructive"
                  className="w-56 rounded-[10px] cursor-pointer"
                >
                  <span>
                    <Button
                      onClick={OnLogout}
                      className="w-full bg-transparent text-black hover:bg-transparent cursor-pointer"
                    >
                      Sign out
                    </Button>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="container min-w-96">
        {/* Content */}
        <header className="bg-card border-b w-400 border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button variant={"ghost"} size={"icon"} className="lg:hidden">
              <Menu />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                User Management
              </h1>
              <p className="text-sm text-primary font-medium">
                Officer Control Panel
              </p>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 py-6">
          {/* users Managements */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  User Managements
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>Full name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.full_name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone_number}</TableCell>
                        <TableCell className="text-right">
                          {item.delete_at ? (
                            <Button variant={"secondary"} type="button">
                              <CheckLine className="w-4 h-4" />
                              Success
                            </Button>
                          ) : (
                            <Button
                              variant={"destructive"}
                              type="submit"
                              onClick={() => ApiBanned(item.id)}
                            >
                              <Ban className="w-4 h-4" />
                              Banned
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* end users Managements */}
      </div>
      {/* End Content */}
      <ToastContainer position="top-right" autoClose={50000} />
    </>
  );
}
