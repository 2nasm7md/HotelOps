import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdatingUser() {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: ({ user }) => {
      toast.success("User Updated successfully");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Can't update user correctly");
    },
  });

  return { isUpdating, updateCurrentUser };
}
