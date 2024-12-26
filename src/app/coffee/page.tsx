import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/components/CalenderBox";
import TableTwo from "@/components/Tables/TableTwo";

export const metadata: Metadata = {
  title: "Giống cà phê - Cẩm nang số bệnh cây cà phê",
  description: "Xây dựng cẩm nang số bệnh cây cà phê ở Việt Nam",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Giống cà phê" />

        {/* <CalendarBox /> */}
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
