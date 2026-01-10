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
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import Navbar from "./components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleCheck,
  ClipboardList,
  Clock,
  HardHat,
  TriangleAlert,
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
import DataTable from "./config/ConfigDataTable";
import ConfigSidebar from "./config/configSidebar";
export default function Page() {
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
        <SidebarFooter className="px-5">
          <div className="flex items-center cursor-pointer gap-2.5">
            <Avatar>
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <div className="hidden sm:block">
                <p className="text-sm font-bold">Mikaela</p>
                <p className="text-muted-foreground">Mikaela@gmail.com</p>
              </div>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="container min-h-full w-[250rem]">
        <Navbar />
        <div className="text-start px-10 py-1">
          <h2 className="text-xl font-bold">Welcome to Admin</h2>
        </div>
        <div className="grid grid-cols-4 lg:grid-col-4 md:grid-col-4 px-10 py-10">
          <Card className="border-0 shadow-md lg:w-64 md:w-40">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <h3 className="text-md">Total Helmets</h3>
                <span className="text-2xl">10</span>
              </CardTitle>
              <div className="bg-sky-200 px-2 py-1 rounded-[5px]">
                <HardHat className="w-7 h-7 text-blue-500" />
              </div>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-md lg:w-64 md:w-40">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <h3 className="text-md">Total Helmets</h3>
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
                    <TableHead>User</TableHead>
                    <TableHead>Helmet ID</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DataTable.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{item.helment_id}</TableCell>
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
