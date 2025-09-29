import { useParams } from "react-router-dom";
import AddEvent from "./AddEvent";

const AddStaffWrapper = () => {
  const { eventId } = useParams();
  const editMode = !!eventId;

  const { payload: data, isLoading } = useFetchEditEvent({ eventId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (editMode && !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddEvent event={data} />
    </>
  );
};

export default AddStaffWrapper;
