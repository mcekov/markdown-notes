import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NoteProps) => {
  const navigate = useNavigate();
  const note = useNote();

  useEffect(() => {
    console.log(note);
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <div className="text-5xl mb-5">{note.title}</div>
          {note.tags.length
            ? note.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 mr-2 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
              >
                {tag.label}
              </span>
            ))
            : null}
        </div>
        <div className="ml-auto">
          <Link to={`/${note.id}/edit`}>
            <button
              type="submit"
              className="mr-2 hover:shadow-lg rounded-md bg-indigo-500 hover:bg-indigo-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Edit
            </button>
          </Link>
          <button
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
            className="mr-2 hover:shadow-lg rounded-md bg-red-400 hover:bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            Delete
          </button>

          <Link to="/">
            <button className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none">
              Back
            </button>
          </Link>
        </div>
      </div>

      <div className="flex container justify-center ">
        <ReactMarkdown className="my-10 prose">{note.markdown}</ReactMarkdown>
      </div>
    </>
  );
};

export default Note;
