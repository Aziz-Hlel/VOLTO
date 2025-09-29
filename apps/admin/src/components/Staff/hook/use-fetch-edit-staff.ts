import staffService from "@/Api/services/staff.service";
import { useQuery } from "@tanstack/react-query";

const useFetchEditStaff = ({ staffId }: { staffId?: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["staff", staffId],
    queryFn: () => staffService.get(staffId!),
    enabled: !!staffId,
  });

  const payload = data?.data;

  return {
    payload,
    isLoading,
  };
};

export default useFetchEditStaff;
