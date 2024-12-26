import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import ChatBox from "@/components/Chat/ChatBox";

export const metadata: Metadata = {
  title: "Trò chuyện - Cẩm nang số bệnh cây cà phê",
  description: "Xây dựng cẩm nang số bệnh cây cà phê ở Việt Nam",
};

export default function ChatScreen() {
    
  return (
    <>
      <DefaultLayout>
        <div className="mx-auto w-full ">
          <Breadcrumb pageName="Trò chuyện" />

          <ChatBox />
        </div>
      </DefaultLayout>
    </>
  );
}
