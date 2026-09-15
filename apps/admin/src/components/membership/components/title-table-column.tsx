import { useNavigate } from "react-router-dom";

const TitleTableColumn = ({ title, id }: { title: string; id: string }) => {
  const navigate = useNavigate();

  return (
    <div
      className="font-medium capitalize hover:underline cursor-pointer"
      onClick={() => {
        navigate(`/membership/overview/${id}`);
      }}
    >
      {title}
    </div>
  );
};

export default TitleTableColumn;
