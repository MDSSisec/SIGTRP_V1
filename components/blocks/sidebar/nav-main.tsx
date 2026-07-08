"use client"

import * as React from "react"
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
            <NavMainCollapsibleItem
              key={item.title}
              item={item}
              sectionClass={sectionClass}
              buttonClass={buttonClass}
              subButtonClass={subButtonClass}
            />
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

type NavMainCollapsibleItemProps = {
  item: NavMainItem
  sectionClass?: string
  buttonClass?: string
  subButtonClass?: string
}

function NavMainCollapsibleItem({
  item,
  sectionClass,
  buttonClass,
  subButtonClass,
}: NavMainCollapsibleItemProps) {
  const shouldBeOpen =
    item.isActive || (item.items?.some((subItem) => subItem.isActive) ?? false)

  const [open, setOpen] = React.useState(shouldBeOpen)

  // Abre automaticamente quando um subitem passa a estar ativo (mudança de rota)
  React.useEffect(() => {
    if (shouldBeOpen) setOpen(true)
  }, [shouldBeOpen])

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible"
      render={<SidebarMenuItem className={sectionClass} />}
    >
      <CollapsibleTrigger
        render={<SidebarMenuButton tooltip={item.title} className={buttonClass} />}
      >
        {item.icon}
        <span>{item.title}</span>
        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
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
  )
}
