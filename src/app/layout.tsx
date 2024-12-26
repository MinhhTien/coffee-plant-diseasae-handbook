"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/contexts/AuthProvider";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js" async></script>
        <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.3/dist/teachablemachine-image.min.js" async></script>
      </head>
      <body suppressHydrationWarning={true}>
        <ToastContainer />
        <CopilotKit runtimeUrl="/api/copilotkit">
          <AuthProvider>{loading ? <Loader /> : children}</AuthProvider>
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
              clickOutsideToClose={true}
            />
          </div>
        </CopilotKit>
      </body>
    </html>
  );
}
