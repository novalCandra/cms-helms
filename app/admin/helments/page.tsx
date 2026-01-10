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
import { HardHat, Search } from "lucide-react";
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
import DataDumyHelms from "../config/ConfigDataHelms";
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
        <div className="flex items-center px-10 py-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div className="flex items-center gap-3">
                  <HardHat className="w-7 h-7 text-sky-400" />
                  <h3 className="text-xl">Helmet Inventory</h3>
                </div>
                <div className="flex justify-center gap-5">
                  <InputGroup>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Helmet ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead> Borrowed By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DataDumyHelms.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.helment_id}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.borrowed_by}</TableCell>
                      <TableCell>{item.action}</TableCell>
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
