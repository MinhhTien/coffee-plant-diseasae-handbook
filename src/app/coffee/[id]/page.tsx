import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import VarietyDetail from "@/components/VarietyDetail/VarietyDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết giống cà phê - Cẩm nang số bệnh cây cà phê",
  description: "Xây dựng cẩm nang số bệnh cây cà phê ở Việt Nam",
};

export default function CoffeeDetail({ params }: { params: { id: string } }) {
  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb
          pageName="Chi tiết giống cà phê"
          items={[{ name: "Giống cà phê", href: "/coffee" }]}
        />
        {/* <TableTwo /> */}
        <VarietyDetail id={params.id} />
      </div>
    </DefaultLayout>
  );
}
