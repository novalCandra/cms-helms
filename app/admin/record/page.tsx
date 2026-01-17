"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import Navbar from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronUp,
  ClipboardPenIcon,
  MoreHorizontal,
  Search,
  User2,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
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
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";
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
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });
  const [loading, setIsLoading] = useState<boolean>(true);
  const [borrowed, setIsBorrowed] = useState<TypeBorrowes[]>([]);
  const [search, setIsSearch] = useState("");
  const [select, setSelect] = useState("all");

  const filteredData = borrowed.filter((item) => {
    const searchFilter =
      search.trim() === "" ||
      `${item.users.full_name} ${item.helm.helmet_name}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const selectStatus = select === "all" || item.status === select;
    return searchFilter && selectStatus;
  });
  async function getProfile() {
    const token = Cookies.get("token");
    const apiProfile = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-cache",
      },
    );
    return apiProfile.json();
  }

  async function AllBorrowing() {
    const token = Cookies.get("token");
    const ApiBorrowing = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/borroed`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-cache",
      },
    );

    return ApiBorrowing.json();
  }
  useEffect(() => {
    async function BorrowingAll() {
      const AllBorrowings = await AllBorrowing();
      const Profile = await getProfile();
      setProfile({
        full_name: Profile.data.full_name,
        email: Profile.data.email,
      });
      setIsBorrowed(AllBorrowings.data);
      setIsLoading(false);
    }
    BorrowingAll();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center mx-auto w-[100vw]">
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
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="container min-h-full w-[250rem]">
        <Navbar />
        <div className="flex items-center px-10 py-7">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div className="flex items-center gap-3.5">
                  <ClipboardPenIcon className="w-7 h-7 text-sky-400" />
                  <h3 className="text-xl font-bold">All Borrowing Records</h3>
                </div>
                <div className="flex items-center gap-3.5">
                  <InputGroup className="bg-white rounded-md">
                    <InputGroupInput
                      placeholder="Enter You Search"
                      onChange={(e) => setIsSearch(e.target.value)}
                    />
                    <InputGroupAddon>
                      <Search />
                    </InputGroupAddon>
                  </InputGroup>
                  <Select onValueChange={setSelect}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="available">Avaible</SelectItem>
                        <SelectItem value="rented">Retired</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="borrowed">Borrowed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Helments</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
