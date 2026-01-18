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
import {
  ChevronUp,
  HardHat,
  MoreHorizontal,
  Search,
  User2,
} from "lucide-react";
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
  SelectLabel,
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });
  const [loading, setIoading] = useState(true);
  const [pageData, setpageData] = useState<TypeProduct[]>([]);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [search, setIsSearch] = useState("");
  const [select, setSelect] = useState("all");
  const [selectedHelms, setSelectHelms] = useState<TypeProduct | null>(null);
  const [formData, setFormData] = useState({
    helmet_name: "",
    condition: "",
    status: "",
    daily_price: "",
    late_fee_per_day: "",
  });

  // filter Search and Select
  const filteredeData = pageData.filter((item) => {
    const matchSearch =
      search.trim() === "" ||
      `${item.helmet_name} ${item.status} ${item.condition}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus = select === "all" || item.status === select;

    return matchSearch && matchStatus;
  });

  // all Helms
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
      },
    );

    return apiHelmsAll.json();
  }

  // all Profile
  async function Profile() {
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

  // delete Data
  async function deleteData(id: number) {
    const token = Cookies.get("token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/helments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-cache",
      });
      setpageData((prev) => prev.filter((item) => id !== item.id));
      toast.success("sucess Delete Data");
    } catch (error) {
      toast.error("gagal Deleet Data");
    }
  }

  // update Data
  async function updateData(id: number) {
    try {
      if (!selectedHelms) return;

      // 2. siapkan data ke backend
      const payload = {
        helmet_name: formData.helmet_name,
        condition: formData.condition,
        status: formData.status,
        daily_price: Number(formData.daily_price),
        late_fee_per_day: Number(formData.late_fee_per_day),
      };
      const token = Cookies.get("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/helments/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-cache",
        body: JSON.stringify(payload),
      });
      // setpageData((prev) => prev.map((item) => id !== item.id));
      setpageData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...payload } : item)),
      );
      toast.success("Success Update Helms");
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  useEffect(() => {
    async function setApiHelms() {
      const addApiData = await helmsData();
      const apiProfile = await Profile();
      setProfile({
        full_name: apiProfile.data.full_name,
        email: apiProfile.data.email,
      });
      setpageData(addApiData.data.data);
      setIoading(false);
    }
    setApiHelms();
  }, []);

  useEffect(() => {
    if (selectedHelms) {
      setFormData({
        helmet_name: selectedHelms.helmet_name,
        condition: selectedHelms.condition,
        status: selectedHelms.status,
        daily_price: String(selectedHelms.daily_price),
        late_fee_per_day: String(selectedHelms.late_fee_per_day),
      });
    }
  }, [selectedHelms]);

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
      <div className="container min-h-full w-10000">
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
                    <InputGroupInput
                      placeholder="Search Helments"
                      onChange={(e) => setIsSearch(e.target.value)}
                    />
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
                        <SelectItem value="available">Avaible</SelectItem>
                        <SelectItem value="rented">Retired</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
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
                  {filteredeData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
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
                                onSelect={() => {
                                  setSelectHelms(item);
                                  setShowNewDialog(true);
                                  setFormData({
                                    helmet_name: item.helmet_name,
                                    condition: item.condition,
                                    status: item.status,
                                    daily_price: String(item.daily_price),
                                    late_fee_per_day: String(
                                      item.late_fee_per_day,
                                    ),
                                  });
                                }}
                                className="cursor-pointer"
                                onClick={() => updateData(item.id)}
                              >
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500 cursor-pointer"
                                onClick={() => deleteData(item.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Dialog
                          open={showNewDialog}
                          onOpenChange={setShowNewDialog}
                        >
                          <DialogContent className="sm:max-w-[425px] bg-[#FCF8F8]">
                            <DialogHeader>
                              <DialogTitle>Update Data Helms</DialogTitle>
                              <DialogDescription>
                                mengedit sebuah Data Helms
                              </DialogDescription>
                            </DialogHeader>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                updateData(selectedHelms?.id);
                                setShowNewDialog(false);
                              }}
                            >
                              <FieldGroup>
                                <FieldSet>
                                  <Field>Helment Name</Field>
                                  <Input
                                    value={formData.helmet_name}
                                    readOnly
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        helmet_name: e.target.value,
                                      })
                                    }
                                    className=" bg-white rounded-[10px] py-6"
                                  />
                                  <Field>condition</Field>
                                  <Select
                                    onValueChange={setSelect}
                                    value={formData.status}
                                  >
                                    <SelectTrigger className="w-96 py-6 bg-white rounded-[10px]">
                                      <SelectValue placeholder="Select Status Helm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Status Helms</SelectLabel>
                                        <SelectItem value="available">
                                          Available
                                        </SelectItem>
                                        <SelectItem value="rented">
                                          Rented
                                        </SelectItem>
                                        <SelectItem value="maintenance">
                                          Maintenance
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  <Field>status</Field>
                                  <Select
                                    onValueChange={setSelect}
                                    value={formData.status}
                                  >
                                    <SelectTrigger className="w-96 py-6 bg-white rounded-[10px]">
                                      <SelectValue placeholder="Select Status Helm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Status Helms</SelectLabel>
                                        <SelectItem value="available">
                                          Available
                                        </SelectItem>
                                        <SelectItem value="rented">
                                          Rented
                                        </SelectItem>
                                        <SelectItem value="maintenance">
                                          Maintenance
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  <Field>Daily Price</Field>
                                  <Input
                                    type="number"
                                    readOnly
                                    value={formData.daily_price}
                                    className=" bg-white rounded-[10px] py-6"
                                  />
                                  <Field> Late Fee Per Day</Field>
                                  <Input
                                    type="number"
                                    readOnly
                                    value={formData.daily_price}
                                    className=" bg-white rounded-[10px] py-6"
                                  />
                                </FieldSet>
                              </FieldGroup>
                              <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                  <Button
                                    type="submit"
                                    variant={"destructive"}
                                    className="cursor-pointer"
                                  >
                                    Batal
                                  </Button>
                                </DialogClose>
                                <Button
                                  type="submit"
                                  className="cursor-pointer"
                                >
                                  Update
                                </Button>
                              </DialogFooter>
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
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
