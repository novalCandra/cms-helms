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
import Navbar from "./components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronUp,
  CircleCheck,
  ClipboardList,
  Clock,
  HardHat,
  TriangleAlert,
  User2,
} from "lucide-react";
import BorrowingChart from "./components/BorrowingChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfigSidebar from "./config/configSidebar";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

type TypeBorrowes = {
  id: number;
  users: users;
  helm: helm;
  full_name: string;
  helmet_name: string;
  borrow_date: string;
  status: string;
  return_date: string;
};

type users = {
  full_name: string;
};

type helm = {
  helmet_name: string;
};
export default function Page() {
  const navigate = useRouter();
  const [profile, setprofile] = useState({
    full_name: "",
    email: "",
  });
  const [helms, setHelms] = useState([]);
  const [loading, isloading] = useState(true);
  const [borrowed, setBorrowed] = useState<TypeBorrowes[]>();

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

  async function dataHelms() {
    const token = Cookies.get("token");
    const responApiHelms = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/helments?per_page=100`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-cache",
      },
    );

    return responApiHelms.json();
  }

  async function BorrowedApi() {
    const token = Cookies.get("token");
    const apiBorrowed = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/borroed`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-cache",
      },
    );
    return apiBorrowed.json();
  }

  const logoutProfile = async (): Promise<void> => {
    const token = Cookies.remove("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authozation: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-cache",
    });
    navigate.push("/auth/login");
    window.location.reload();
  };
  useEffect(() => {
    async function fetchProfile() {
      const profileAdmin = await apiProfile();
      setprofile({
        full_name: profileAdmin.data.full_name,
        email: profileAdmin.data.email,
      });
      const AllHelms = await dataHelms();
      const AllBorrowed = await BorrowedApi();
      setBorrowed(AllBorrowed.data);
      setHelms(AllHelms.data.data);
      setHelms(AllHelms.data.total);
      isloading(false);
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex min-h-screen justify-center items-center mx-auto w-screen">
          <Spinner className="size-10 text-sky-400" />
        </div>
      </>
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
                  <span onClick={logoutProfile}>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="container min-h-full w-1000">
        <Navbar />
        <div className="text-start px-10 py-1">
          <h2 className="text-xl font-bold">Welcome to Admin</h2>
        </div>
        <div className="grid grid-cols-4 lg:grid-col-4 md:grid-col-2 px-10 py-10">
          <Card className="border-0 shadow-md lg:w-64 md:w-40">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <h3 className="text-md">Total Helmets</h3>
                <span className="text-2xl">{helms}</span>
              </CardTitle>
              <div className="bg-sky-200 px-2 py-1 rounded-[5px]">
                <HardHat className="w-7 h-7 text-blue-500" />
              </div>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-md lg:w-64 md:w-40">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <h3 className="text-md">Total Borrowed</h3>
                <span className="text-2xl">10</span>
              </CardTitle>
              <div>
                <Clock className="w-7 h-7" />
              </div>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-md lg:w-64 md:w-40">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <h3 className="text-md">Available</h3>
                <span className="text-2xl">5</span>
              </CardTitle>
              <div className="bg-green-200 px-2 py-1 rounded-[5px]">
                <CircleCheck className="w-7 h-7 text-green-500" />
              </div>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-md lg:w-64 md:w-40">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <h3 className="text-md">Late Returns</h3>
                <span className="text-2xl">1</span>
              </CardTitle>
              <div className="bg-red-200 px-2 py-1 rounded-[5px]">
                <TriangleAlert className="w-7 h-7 text-red-600" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-1 px-10 py-10 gap-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>
                <h3>Borrowing Activity</h3>
              </CardTitle>
              <CardContent>
                <BorrowingChart />
              </CardContent>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-8 h-8 text-sky-400" />
                  <h3 className="text-md ">Recent Borrowing Records</h3>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>users</TableHead>
                    <TableHead>Helment</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowed?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.users.full_name}</TableCell>
                      <TableCell>{item.helm.helmet_name}</TableCell>
                      <TableCell>{item.borrow_date}</TableCell>
                      <TableCell>{item.status}</TableCell>
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
