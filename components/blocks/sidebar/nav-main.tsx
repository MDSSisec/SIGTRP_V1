"use client"

import Link from "next/link"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"

export type NavMainItem = {
  title: string
  url: string
  icon?: React.ReactNode
  isActive?: boolean
  items?: {
    title: string
    url: string
    isActive?: boolean
  }[]
}

type NavMainProps = {
  items: NavMainItem[]
  label?: string
  sectionSpacing?: boolean
}

export function NavMain({
  items,
  label = "Sistema",
  sectionSpacing = false,
}: NavMainProps) {
  const sectionClass = sectionSpacing ? "mb-2 last:mb-0" : undefined
  const buttonClass = sectionSpacing
    ? "h-auto min-h-9 py-2 leading-normal"
    : undefined
  const subButtonClass = sectionSpacing
    ? "h-auto min-h-8 py-1.5 leading-normal"
    : undefined

  return (
    <SidebarGroup>
      {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
      <SidebarMenu>
        {items.map((item) =>
          item.items?.length ? (
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive || item.items.some((subItem) => subItem.isActive)}
              className="group/collapsible"
              render={<SidebarMenuItem className={sectionClass} />}
            >
              <CollapsibleTrigger
                render={
                  <SidebarMenuButton tooltip={item.title} className={buttonClass} />
                }
              >
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        isActive={subItem.isActive}
                        className={subButtonClass}
                        render={<Link href={subItem.url} />}
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title} className={sectionClass}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={item.isActive}
                className={buttonClass}
                render={<Link href={item.url} />}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
