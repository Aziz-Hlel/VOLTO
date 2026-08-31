import ContentLayout from "@/components/Layout/ContentLayout";
import MainContentLayout from "@/components/Layout/MainContentLayout";
import { Outlet } from "react-router-dom";

function Membership() {
  return (
    <ContentLayout>
      <MainContentLayout>
        <Outlet />
      </MainContentLayout>
    </ContentLayout>
  );
}

export default Membership;
