import { useDeleteTask,useEditTask } from "./reactQueryCustomHooks";

const SingleItem = ({ item }) => {
   const {deleteTask,isDeletingTask}= useDeleteTask()
   const {editTask}= useEditTask()


  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({taskId:item.id,isDone:!item.isDone})}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        disabled={isDeletingTask}
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
