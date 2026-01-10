import React from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import ConfigSidebar from "@/app/admin/config/configSidebar";
import { Avatar, AvatarFallback } from "../ui/avatar";
export default function Sidebar() {
  return (
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
  );
}
