"use client";
import {
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlinePlus,
  AiOutlineBars,
} from "react-icons/ai";
import { useEffect, useState } from "react";

const List = ({ listId }) => {
  const [list, setList] = useState();
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    setToggle(false);
    fetch(`/api/list/${listId}`, {
      method: "POST",
      body: JSON.stringify({
        item: item,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setList(data);
        setItem("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const delItem = (itemId) => {
    fetch(`/api/list/${list._id}/${itemId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkItem = (itemId) => {
    fetch(`/api/list/${list._id}/${itemId}`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchList = () => {
    fetch(`/api/list/${listId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <section className="shadow duration-300 rounded p-2 m-2">
      <h1 className="text-2xl my-2 text-center">
        {list?.title?.toUpperCase()}
      </h1>

      {list?.items?.length ? (
        <ul className="py-2">
          {list.items?.map((item) => {
            return (
              <li
                className="border rounded my-1 overflow-hidden"
                key={item._id}
              >
                <div className="text-md py-1 flex items-center gap-2 duration-300 ml-[-40px] hover:ml-2">
                  <button
                    className="hover:scale-[1.2] duration-300 hover:text-rose-500"
                    onClick={(e) => {
                      e.preventDefault();
                      delItem(item._id);
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    className="hover:scale-[1.2] duration-300 hover:text-emerald-500"
                    onClick={(e) => {
                      e.preventDefault();
                      checkItem(item?._id);
                    }}
                  >
                    <AiOutlineCheck />
                  </button>
                  <span
                    className={`${
                      item?.done && "line-through"
                    } decoration-orange-600 decoration-2`}
                  >
                    {item?.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No items in the list</div>
      )}
      <div
        className={`rounded bg-slate-300 flex  gap-2 justify-between items-center duration-300 ${
          toggle ? "h-12" : "h-0"
        } px-2 mb-2 overflow-hidden`}
      >
        <button
          className="rounded shadow py-1 px-2 bg-slate-200 hover:bg-rose-200 duration-300"
          onClick={(e) => {
            e.preventDefault();
            setToggle(false);
            delItem("ALL");
          }}
        >
          delete all
        </button>
        <button
          className="rounded shadow py-1 px-2 bg-slate-200 hover:bg-emerald-200 duration-300"
          onClick={(e) => {
            e.preventDefault();
            setToggle(false);
            checkItem("ALL");
          }}
        >
          unmark all
        </button>
      </div>
      <form
        onSubmit={addItem}
        className="flex gap-2 relative"
      >
        <input
          className="px-2 rounded w-32"
          placeholder="New Item"
          type="text"
          name="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-200 rounded-full p-1 duration-300 hover:bg-teal-200"
        >
          <AiOutlinePlus />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setToggle(!toggle);
          }}
          className="bg-slate-200 rounded-full p-1 duration-300 hover:bg-teal-200"
        >
          <AiOutlineBars />
        </button>
      </form>
    </section>
  );
};

export default List;
