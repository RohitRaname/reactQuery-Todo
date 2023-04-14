import SingleItem from './SingleItem';
import { useFetchTasks } from './reactQueryCustomHooks';
const Items = () => {

  const {data,isLoading,isError}= useFetchTasks()
  console.log('data',data)

  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>There was an error...</p>


  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;