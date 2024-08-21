// client/src/utils/generateBreadcrumbs.ts
import { BreadcrumbItem } from "./Breadcrumbs.tsx";

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
