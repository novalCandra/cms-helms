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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronUp,
  MoreHorizontal,
  Plus,
  SquareLibrary,
  User2,
} from "lucide-react";
import { useAuth } from "@/hooks/useRoute";
import { useDashboard } from "@/hooks/useDashboard";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { TypeCategories, TypeUpdateCategores } from "../types/categories";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  SchemaAddCategories,
  SchemaUpdateCategorie,
} from "../schema/SchemaAddCategorie";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function PageCategories() {
  const { logout } = useAuth();
  const { profile } = useDashboard();
  const [postModal, setPostModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [dataCategories, setDataCategories] = useState<TypeCategories | []>([]);
  const [updateCategories, setUpdateCategories] =
    useState<TypeUpdateCategores | null>(null);
  const form = useForm<z.infer<typeof SchemaAddCategories>>({
    resolver: zodResolver(SchemaAddCategories),
    defaultValues: {
      nama: "",
    },
  });

  const formUpdate = useForm<z.infer<typeof SchemaUpdateCategorie>>({
    resolver: zodResolver(SchemaUpdateCategorie),
  });
  async function PostDataCategory(values: z.infer<typeof SchemaAddCategories>) {
    const token = Cookies.get("token");
    try {
      const postDatacategories = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-cache",
          body: JSON.stringify(values),
        },
      );
      form.reset();
      const dataCategories = await postDatacategories.json();
      setDataCategories((prev) => [...prev, dataCategories]);
      window.location.reload();
      setPostModal(false);
    } catch (error) {
      toast.error("Not Create Categories");
      console.error(error);
    }
  }

  async function UpdateCategory(values: z.infer<typeof SchemaUpdateCategorie>) {
    if (!updateCategories) return;
    try {
      const token = Cookies.get("token");
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${updateCategories?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-cache",
          body: JSON.stringify(values),
        },
      );
      setUpdateModal(false);
      window.location.reload();
    } catch (error) {
      toast.error("not update category");
      console.error(error);
    }
  }

  async function getDataCatgeories() {
    const token = Cookies.get("token");
    try {
      const getCategories = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
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
      return getCategories.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCategorie(id: number) {
    const token = Cookies.get("token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Conten-Type": "application/json",
        },
        credentials: "include",
        cache: "no-cache",
      });
      setDataCategories((prev) => prev.filter((item) => id !== item.id));
      toast.success("Succcess Delete Categories");
    } catch (error) {
      toast.error("Not Delete data");
      console.error(error);
    }
  }

  useEffect(() => {
    async function getAllCateories() {
      const categoriesGet = await getDataCatgeories();
      setDataCategories(categoriesGet.data);
    }
    getAllCateories();
  }, []);
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
      <div className="container min-h-screen w-10000">
        <Navbar />
        <div className="flex items-center px-10 py-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div className="flex items-center gap-2">
                  <SquareLibrary className="w-7 h-7 text-sky-400" />
                  <h2 className="text-xl">Managements Categories</h2>
                </div>
                <div className="flex justify-between gap-5">
                  <Dialog open={postModal} onOpenChange={setPostModal}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus /> Add Categories
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="text-start text-xl font-medium">
                          Add Categorie
                        </DialogTitle>
                        <DialogDescription>
                          Create Sebuah Categories
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={form.handleSubmit(PostDataCategory)}>
                        <FieldGroup>
                          <Controller
                            name="nama"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <Label htmlFor={field.name}>Nama</Label>
                                <Input
                                  {...field}
                                  id="nama"
                                  name="nama"
                                  type="text"
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Enter Your Categorie"
                                  autoComplete="off"
                                  required
                                />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </FieldGroup>
                        <DialogFooter>
                          <div className="mt-2">
                            <DialogClose asChild>
                              <Button variant={"ghost"}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" variant={"default"}>
                              Submit
                            </Button>
                          </div>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={updateModal} onOpenChange={setUpdateModal}>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="text-start text-xl font-medium">
                          Update Categorie
                        </DialogTitle>
                        <DialogDescription>
                          Create Sebuah Categories
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={formUpdate.handleSubmit(UpdateCategory)}>
                        <FieldGroup>
                          <Controller
                            name="nama"
                            control={formUpdate.control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <Label htmlFor={field.name}>Nama</Label>
                                <Input {...field} autoComplete="off" />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </FieldGroup>
                        <DialogFooter>
                          <div className="mt-2">
                            <DialogClose asChild>
                              <Button type="button" variant={"ghost"}>
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button type="submit" variant={"default"}>
                              Submit
                            </Button>
                          </div>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="cursor-pointer">
                <TableHeader>
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataCategories ? (
                    dataCategories.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <span
                            className={
                              item.nama === "full_face"
                                ? "bg-sky-400 text-white px-1.5 rounded-2xl"
                                : item.nama === "dual_shory"
                                  ? "bg-green-300 text-black px-1.5 rounded-2xl"
                                  : item.nama === "dual_shory"
                                    ? "bg-yellow-300 text-white px-1.5 rounded-2xl"
                                    : "bg-red-500 text-white px-1.5 rounded-2xl"
                            }
                          >
                            {item.nama}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size={"icon-sm"} className="cursor-alias">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-4z0" align="end">
                              <DropdownMenuLabel>
                                Action Categorie
                              </DropdownMenuLabel>
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setUpdateCategories(item);
                                    formUpdate.reset({
                                      nama: item?.nama,
                                    });
                                    setUpdateModal(true);
                                  }}
                                  className="cursor-pointer"
                                >
                                  Update
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteCategorie(item.id)}
                                  variant="default"
                                  className="cursor-pointer text-red-500"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>
                        <div className="flex justify-between text-center mx-auto items-center w-200">
                          <div className="px-10 py-4 flex text-center mx-auto">
                            <h2 className="text-xl text-sky-300 items-center-500 mx-auto">
                              No data Categories
                            </h2>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
