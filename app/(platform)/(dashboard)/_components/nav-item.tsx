"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Activity, CreditCard, Layout, Settings } from "lucide-react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

export type Organization = {
    id: string
    slug: string
    imageUrl: string
    name: string
}

interface NavItemProps {
    isActive: boolean
    organization: Organization
    isExpanded: boolean
    onExpand: (id: string) => void
}

export const NavItem = ({
    isActive,
    organization,
    isExpanded,
    onExpand,
}: NavItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const routes = [
        {
            label: "Boards",
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: [`/organization/${organization.id}`],
        },
        {
            label: "activity",
            icon: <Activity className="h-4 w-4 mr-2" />,
            href: [`/organization/${organization.id}/activity`],
        },
        {
            label: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: [`/organization/${organization.id}/settings`, `/organization/${organization.id}/settings/organization-members`],
        },
        {
            label: "Billing",
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            href: [`/organization/${organization.id}/billing`],
        }
    ];

    const onClick = (href: string) => {
        router.push(href)
    }

    return (
        <AccordionItem
            value={organization.id}
            className="bordor-none"
        >
            <AccordionTrigger
                onClick={() => {
                    onExpand(organization.id)
                }}
                className={cn("flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
                )}
            >
                <div className="flex items-center gap-x-2">
                    <div className="h-7 w-7 relative">
                        <Image
                            fill
                            src={organization.imageUrl}
                            alt="organizationImage"
                            className="rounded-sm object-cover"
                        />
                    </div>
                    <span className="font-medium text-sm">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((route) => {
                    return <Button
                        key={route?.href[0]}
                        size={"sm"}
                        onClick={() => {
                            onClick(route?.href[0])
                        }}
                        className={cn(
                            "w-full font-normal justify-start pl-10 mb-1",
                            route?.href?.includes(pathname) && "bg-sky-500/10 text-sky-700"
                        )}
                        variant={"ghost"}
                    >
                        {route.icon}
                        {route.label}
                    </Button>
                })}
            </AccordionContent>
        </AccordionItem>
    )
};

NavItem.skeleton = function SkeletonNavItem(){
    return (
        <div className="flex items-center gap-x-2 my-4">
            <div className="w-8 h-8 relative shrink-0">
                <Skeleton className="h-full w-full absolute"/>
            </div>
            <Skeleton className="h-8 w-full"/>
        </div>
    )
}
NavItem.skeletonSided = function SkeletonNavItem(){
    return (
        <div className="flex items-center gap-x-2 pl-6 my-2">
            <div className="w-8 h-8 relative shrink-0">
                <Skeleton className="h-full w-full absolute"/>
            </div>
            <Skeleton className="h-8 w-full"/>
        </div>
    )
}