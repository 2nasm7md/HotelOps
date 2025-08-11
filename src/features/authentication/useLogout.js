import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast.success("Successfully Loged out");
      queryClient.removeQueries();
    },
    onError: () => {
      toast.error("Can't logout correctly");
    },
  });
  return { logout, isPending };
}
