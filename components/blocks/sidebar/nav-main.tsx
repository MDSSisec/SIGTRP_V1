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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type NavMainItem = {
  title: string
  url: string
  icon?: React.ReactNode
  isActive?: boolean
  disabled?: boolean
  items?: {
    title: string
    url: string
    isActive?: boolean
    disabled?: boolean
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
          ) : item.disabled ? (
            <SidebarMenuItem key={item.title} className={sectionClass}>
              <SidebarMenuButton
                tooltip="Seção bloqueada"
                aria-disabled
                className={cn(buttonClass, "pointer-events-none opacity-40")}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem key={item.title} className={sectionClass}>
              <SidebarMenuButton
                tooltip={{ children: item.title, hidden: false }}
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
  const isGroupDisabled = Boolean(item.disabled)

  const shouldBeOpen =
    !isGroupDisabled &&
    (item.isActive || (item.items?.some((subItem) => subItem.isActive) ?? false))

  const [open, setOpen] = React.useState(shouldBeOpen)

  React.useEffect(() => {
    if (shouldBeOpen) setOpen(true)
  }, [shouldBeOpen])

  if (isGroupDisabled) {
    return (
      <SidebarMenuItem className={sectionClass}>
        <SidebarMenuButton
          tooltip="Seção bloqueada"
          aria-disabled
          className={cn(buttonClass, "pointer-events-none opacity-40")}
        >
          {item.icon}
          <span>{item.title}</span>
          <ChevronRightIcon className="ml-auto opacity-50" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible"
      render={<SidebarMenuItem className={sectionClass} />}
    >
      <CollapsibleTrigger
        render={
          <SidebarMenuButton
            tooltip={{ children: item.title, hidden: false }}
            className={buttonClass}
          />
        }
      >
        {item.icon}
        <span>{item.title}</span>
        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <NavSubItem
                title={subItem.title}
                url={subItem.url}
                isActive={subItem.isActive}
                disabled={subItem.disabled}
                className={subButtonClass}
              />
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}

type NavSubItemProps = {
  title: string
  url: string
  isActive?: boolean
  disabled?: boolean
  className?: string
}

/** Subitem do menu com tooltip do título completo (textos longos truncam). */
function NavSubItem({
  title,
  url,
  isActive,
  disabled,
  className,
}: NavSubItemProps) {
  if (disabled) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <SidebarMenuSubButton
              aria-disabled
              className={cn(className, "pointer-events-none opacity-40")}
            />
          }
        >
          <span>{title}</span>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs text-wrap">
          Seção bloqueada
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <SidebarMenuSubButton
            isActive={isActive}
            className={className}
            render={<Link href={url} />}
          />
        }
      >
        <span>{title}</span>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs text-wrap">
        {title}
      </TooltipContent>
    </Tooltip>
  )
}
