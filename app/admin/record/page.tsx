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
import Navbar from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUp, ClipboardPenIcon, Search, User2 } from "lucide-react";
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
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useRoute";
import useRecord from "@/hooks/useRecord";

export default function Page() {
  const { logout } = useAuth();

  const { profile, borrowed, loading } = useRecord();
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

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center mx-auto w-screen">
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
      <div className="container min-h-full w-10000">
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
