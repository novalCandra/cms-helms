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
import { ClipboardPenIcon, Search } from "lucide-react";
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
import DataRecord from "../config/ConfigDataRecord";
export default function page() {
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
                      id="search"
                      placeholder="Enter You Search"
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
                    <TableHead>User</TableHead>
                    <TableHead>Helmet ID</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DataRecord.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{item.helment_id}</TableCell>
                      <TableCell>{item.borrow_date}</TableCell>
                      <TableCell>{item.return_date}</TableCell>
                      <TableCell>{item.action}</TableCell>
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
