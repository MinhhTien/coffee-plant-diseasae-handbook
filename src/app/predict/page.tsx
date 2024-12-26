'use client'

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from 'next/dynamic'

const TeachableMachine = dynamic(
  () => import('../../components/TeachableMachine'),
  { ssr: false }
)

const PredictPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Nhận diện" />
        <TeachableMachine />
      </div>
    </DefaultLayout>
  );
};

export default PredictPage;
