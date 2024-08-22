import React from "react";

export interface BreadcrumbItem {
    label: string;
    link?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <div className="breadcrumbs text-sm">
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.link ? <a href={item.link}>{item.label}</a> : item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
    const pathParts = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = pathParts.map((part, index) => {
        const path = `/${pathParts.slice(0, index + 1).join("/")}`;
        return {
            label: part.charAt(0).toUpperCase() + part.slice(1), // Capitalize first letter
            link: path,
        };
    });

    return [{ label: "Home", link: "/" }, ...breadcrumbs];
}