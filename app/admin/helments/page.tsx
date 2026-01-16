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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, MoreHorizontal, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";

type TypeProduct = {
  id: number;
  helmet_name: string;
  condition: string;
  status: string;
  daily_price: number;
  late_fee_per_day: number;
};
export default function Page() {
  const [loading, setIoading] = useState(true);
  const [pageData, setpageData] = useState<TypeProduct[]>([]);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const Notify = () =>
    toast.success("Success Add Helments", {
      theme: "colored",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
    });
  async function helmsData() {
    const token = Cookies.get("token");
    const apiHelmsAll = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/helments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-cache",
      }
    );

    return apiHelmsAll.json();
  }
  useEffect(() => {
    async function setApiHelms() {
      const addApiData = await helmsData();
      setpageData(addApiData.data.data);
      setIoading(false);
    }
    setApiHelms();
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex min-h-screen justify-center items-center mx-auto w-[100vw]">
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
        <div className="flex items-center px-10 py-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div className="flex items-center gap-3">
                  <HardHat className="w-7 h-7 text-sky-400" />
                  <h3 className="text-xl">Helmet Inventory</h3>
                </div>
                <div className="flex justify-center gap-5">
                  <InputGroup className="bg-white">
                    <InputGroupInput placeholder="Search Helments" />
                    <InputGroupAddon>
                      <Search />
                    </InputGroupAddon>
                  </InputGroup>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="avaible">Avaible</SelectItem>
                        <SelectItem value="borrowed">Borrowed</SelectItem>
                        <SelectItem value="maintance">MainTance</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="cursor-pointer">
                <TableHeader>
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Helments</TableHead>
                    <TableHead>condition</TableHead>
                    <TableHead>status</TableHead>
                    <TableHead>Daily Price</TableHead>
                    <TableHead>Late Fee Per Day</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.helmet_name}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>Rp.{item.daily_price}</TableCell>
                      <TableCell>Rp.{item.late_fee_per_day}</TableCell>
                      <TableCell>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant={"ghost"}
                              aria-label="Open menu"
                              size="icon-sm"
                              className="cursor-pointer"
                            >
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-40" align="end">
                            <DropdownMenuLabel>
                              Action Helments
                            </DropdownMenuLabel>
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                onSelect={() => setShowNewDialog(true)}
                                className="cursor-pointer"
                              >
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500 cursor-pointer"
                                onClick={Notify}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <ToastContainer
                          position="top-right"
                          autoClose={2000}
                        />
                        <Dialog
                          open={showNewDialog}
                          onOpenChange={setShowNewDialog}
                        >
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Update Data Helms</DialogTitle>
                              <DialogDescription>
                                mengedit sebuah Data Helms
                              </DialogDescription>
                            </DialogHeader>
                            <form>
                              <FieldGroup>
                                <FieldSet>
                                  <Field>Helment Name</Field>
                                  <Input
                                    id="helment_name"
                                    name="helment_name"
                                    placeholder=""
                                  />
                                  <Field>condition</Field>
                                  <Input
                                    id="condition"
                                    name="condition"
                                    placeholder=""
                                  />
                                  <Field>status</Field>
                                  <Input
                                    id="status"
                                    name="status"
                                    placeholder=""
                                  />
                                  <Field>Daily Price</Field>
                                  <Input
                                    type="number"
                                    id="daily_price"
                                    name="daily_price"
                                    placeholder=""
                                  />
                                  <Field> Late Fee Per Day</Field>
                                  <Input
                                    type="number"
                                    id="late_fee_per_day"
                                    name="late_fee_per_day"
                                    placeholder=""
                                  />
                                </FieldSet>
                              </FieldGroup>
                            </form>
                          </DialogContent>
                        </Dialog>
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
