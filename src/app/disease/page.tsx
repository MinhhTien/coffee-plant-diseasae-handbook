import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SettingBoxes from "@/components/SettingBoxes";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";

export const metadata: Metadata = {
  title: "Bệnh cây cà phê - Cẩm nang số bệnh cây cà phê",
  description: "Xây dựng cẩm nang số bệnh cây cà phê ở Việt Nam",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full ">
        <Breadcrumb pageName="Bệnh cây cà phê" />

        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Settings;
