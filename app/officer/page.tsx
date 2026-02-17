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
  ChevronUp,
  Clipboard,
  HardHat,
  Menu,
  Search,
  User2,
} from "lucide-react";
import { ConfigSidebar } from "./config/SidebarConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsConfig } from "./config/StatsConfig";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
type TypeActiveBorrowed = {
  id: number;
  borrow_date: string;
  return_date: string;
  status: string;
  users: {
    full_name: string;
  };
  helm: {
    helmet_name: string;
  };
};
export default function Page() {
  const navigate = useRouter();
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  const [active, setActive] = useState<TypeActiveBorrowed[]>();

  const [loading, setIsLoading] = useState<boolean>(true);

  async function Apiprofile() {
    const token = Cookies.get("token");
    try {
      const apiProfile = await fetch(
        `http://127.0.0.1:8000/api/v1/auth/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
          credentials: "include",
        },
      );
      return apiProfile.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function ActiveApi() {
    const token = Cookies.get("token");
    try {
      const apiDataActive = await fetch(
        `http://127.0.0.1:8000/api/v1/borroed`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          cache: "no-cache",
        },
      );
      return apiDataActive.json();
    } catch (error) {
      console.error(error);
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
    window.location.reload();
    navigate.push("auth/login");
    Cookies.remove("token");
  };

  useEffect(() => {
    async function fethingProfile() {
      const apiprofile = await Apiprofile();
      setProfile({
        full_name: apiprofile.data.full_name,
        email: apiprofile.data.email,
      });
      setIsLoading(false);
      const apiActive = await ActiveApi();
      setActive(apiActive.data);
    }
    fethingProfile();
  }, []);
  if (loading) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center mx-auto w-screen">
          <Spinner className="size-10 text-sky-400" />
        </div>
      </>
    );
  }
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex justify-center items-center gap-3">
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
                  <User2 /> {profile?.full_name || "Quest"}
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
        <header className="bg-card border-b w-412 border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button variant={"ghost"} size={"icon"} className="lg:hidden">
              <Menu />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                Active Borrowers
              </h1>
              <p className="text-sm text-primary font-medium">
                Officer Control panel
              </p>
            </div>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {StatsConfig.map((item) => (
              <Card key={item.id} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {item.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* End Stats Summary */}

        {/* Label */}
        <div className="px-4 sm:px-6 py-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Clipboard className="w-5 h-5 text-primary" />
                  Active Borrowers
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by user or helmet..."
                      className="pl-9 w-full sm:w-64"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full sm:w-36">
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="borrowed">Borrowed</SelectItem>
                      <SelectItem value="returned">Returned</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Helmet Name</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Banned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {active?.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.users.full_name}</TableCell>
                        <TableCell>{item.helm.helmet_name}</TableCell>
                        <TableCell>{item.borrow_date}</TableCell>
                        <TableCell>{item.return_date}</TableCell>
                        <TableCell>{item.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* end Label */}
      </div>
    </>
  );
}
