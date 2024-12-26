"use client";
import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
  items?: { name: string; href: string }[];
}

const Breadcrumb = ({ pageName, items }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link
              className="font-medium"
              href="/"
              onClick={() => {
                localStorage.setItem("selectedMenu", `"trang chủ"`);
              }}
            >
              Trang chủ /
            </Link>
          </li>
          {items &&
            items?.map((item, index) => (
              <li key={index}>
                <Link
                  className="font-medium"
                  href={item.href}
                  onClick={() => {
                    localStorage.setItem("selectedMenu", `"${item.name.toLocaleLowerCase()}"`);
                  }}
                >
                  {item.name} /
                </Link>
              </li>
            ))}
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
