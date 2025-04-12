import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { propsBreadcrums } from "@/core/interfaces/props";
import { HomeIcon } from "@heroicons/react/16/solid";

export default function Breadcrumb({ items }: propsBreadcrums) {
  const handleClick = (route: string) => {
    window.location.replace("/" + route);
  };

  return (
    <div className="flex items-center bg-gray-300 px-6 py-2 gap-2">
      <HomeIcon className="w-5 h-5" />
      <Breadcrumbs>
        {items.map((item, index) => (
          <BreadcrumbItem
            key={index}
            className="font-semibold select-none cursor-pointer hover:underline"
            onPress={() => handleClick(item.href)}
          >
            {item.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}
