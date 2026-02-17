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
  ChevronUp,
  HardHat,
  Menu,
  Search,
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
import { ConfigDataDumy } from "../config/ConfigDataUsers";
export default function Page() {
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
                  <User2 /> Mikaela
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56 rounded-[10px]">
                <DropdownMenuItem
                  variant="destructive"
                  className="w-56 rounded-[10px] cursor-pointer"
                >
                  <span
                  //   onClick={logoutProfile}
                  >
                    Sign out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="container min-w-96">
        {/* Content */}
        <header className="bg-card border-b w-412 border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
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
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Name</TableHead>
                      <TableHead>Total Borrows</TableHead>
                      <TableHead>Active Borrows</TableHead>
                      <TableHead>Late Returns</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ConfigDataDumy.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.total_borrows}</TableCell>
                        <TableCell>{item.active_borrow}</TableCell>
                        <TableCell>{item.late_return}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell className="text-right">
                          <Button variant={"destructive"}>
                            <Ban className="w-4 h-4" />
                            {item.action}
                          </Button>
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
    </>
  );
}
