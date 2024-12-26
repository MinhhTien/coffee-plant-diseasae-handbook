import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import ChatBox from "@/components/Chat/ChatBox";

export const metadata: Metadata = {
  title: "Chat cộng đồng - Cẩm nang số bệnh cây cà phê",
  description: "Xây dựng cẩm nang số bệnh cây cà phê ở Việt Nam",
};

export default function ChatScreen() {
    
  return (
    <>
      <DefaultLayout>
        <div className="mx-auto w-full ">
          <Breadcrumb pageName="Chat cộng đồng" />

          <ChatBox />
        </div>
      </DefaultLayout>
    </>
  );
}
