import ContentLayout from "@/components/Layout/ContentLayout";
import MainContentLayout from "@/components/Layout/MainContentLayout";
import { Outlet } from "react-router-dom";

const Staff = () => {
  return (
    <ContentLayout>
      <MainContentLayout>
        <Outlet />
      </MainContentLayout>
    </ContentLayout>
  );
};

export default Staff;
