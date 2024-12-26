import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DiseaseDetail from "@/components/DiseaseDetail/DiseaseDetail";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết bệnh cây cà phê - Cẩm nang số bệnh cây cà phê",
  description: "Xây dựng cẩm nang số bệnh cây cà phê ở Việt Nam",
};

export default function CoffeeDetail({ params }: { params: { id: string } }) {
  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb
          pageName="Chi tiết bệnh cây cà phê"
          items={[{ name: "Bệnh cây cà phê", href: "/disease" }]}
        />
        {/* <TableTwo /> */}
        <DiseaseDetail id={params.id} />
      </div>
    </DefaultLayout>
  );
}
