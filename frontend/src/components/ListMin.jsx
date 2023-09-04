import { AiOutlineDelete } from "react-icons/ai";

const ListMin = ({ list, fetchLists }) => {
  const delHandler = (e) => {
    e.preventDefault();
    fetch(`/api/list/${list._id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          fetchLists();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="shadow hover:shadow-lg list-item2 duration-300 rounded p-2 m-2 relative">
      <h1 className="text-2xl my-2 text-center">
        {list?.title?.toUpperCase()}
      </h1>
      <div className="sm:hidden absolute right-1 bottom-1 item-buttons">
        <button
          onClick={delHandler}
          className="rounded-full bg-slate-400 hover:bg-rose-400 duration-300 w-fit p-1 ml-1"
        >
          <AiOutlineDelete />
        </button>
      </div>
    </section>
  );
};

export default ListMin;
