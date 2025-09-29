import { useParams } from "react-router-dom";
import useFetchEditStaff from "./hook/use-fetch-edit-staff";
import StaffAddForm from "./AddStaff";

const AddStaffWrapper = () => {
  const { staffId } = useParams();
  const editMode = !!staffId;

  const { payload, isLoading } = useFetchEditStaff({ staffId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (editMode && !payload) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StaffAddForm staff={payload} />
    </>
  );
};

export default AddStaffWrapper;
