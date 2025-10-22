import { useAuth } from "@/context/AuthContext";
import EditAccount from "./EditAccount";
import { useQuery } from "@tanstack/react-query";
import accountService from "@/Api/services/account.service";
import { Spinner } from "../ui/spinner";

const EditAccountWrapper = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => await accountService.me(),
  });

  const me = data?.data;

  if (isLoading || !me) return <Spinner />;

  return <EditAccount me={me} />;
};

export default EditAccountWrapper;
