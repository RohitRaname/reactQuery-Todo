import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "./utils";
import { toast } from "react-toastify";

// these are all hooks
const useFetchTasks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async() => {
      const res = await customFetch.get("/");
      return res.data;
    },
  });
  return { data, isLoading, isError };
};

const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask,isLoading } = useMutation({
    mutationFn: (title) => customFetch.post("/", { title }),
    onSuccess: () => {
      // refetch query
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Item added to list");
    },
    onError: () => {
      toast.error("provide name");
    },
  });

  return { createTask ,isLoading};
};
const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading: isDeletingTask } = useMutation({
    mutationFn: (taskId) => customFetch.delete(`/${taskId}`),
    onSuccess: () => {
      // refetch query
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { deleteTask, isDeletingTask };
};
const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) =>
      customFetch.patch(`/${taskId}`, { isDone }),
    onSuccess: () => {
      // refetch query
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { editTask };
};

export { useFetchTasks, useCreateTask, useDeleteTask, useEditTask };
