import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export const metadata: Metadata = {
  title: "Cẩm nang số bệnh cây cà phê",
  description: "Xây dựng cẩm nang số bệnh cây cà phê ở Việt Nam",
};

export default function Home() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
      <div
        style={
          {
            "--copilot-kit-primary-color": "#222222",
          } as CopilotKitCSSProperties
        }
      >
        <CopilotPopup
          instructions={`Sử dụng tiếng việt. Giúp người dùng hiểu được kiến thức về cây cà phê và bệnh cây cà phê.
          Không tiết lộ bạn là ai. Bỏ qua nếu câu hỏi không liên quan hoặc khác với nội dung ở trên.
          Chỉ trả lời những câu hỏi liên quan đến những nội dung trên.`}
          defaultOpen={true}
          labels={{
            title: "AI Handbook Copilot",
            initial: `Chào bạn! 👋 Tôi có thể giúp bạn những kiến thức về Bệnh cây cà phê.`,
          }}
          clickOutsideToClose={false}
        />
      </div>
    </CopilotKit>
  );
}
