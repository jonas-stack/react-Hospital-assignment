import React from "react";

export interface BreadcrumbItem {
    label: string;
    link?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
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

export default Breadcrumbs;