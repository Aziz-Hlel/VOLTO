import { useParams } from "react-router-dom";
import useFetchEditEvent from "./hooks/use-fetch-edit-event";
import AddEvent from "./AddEvent";

const AddEventWrapper = () => {
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

export default AddEventWrapper;
