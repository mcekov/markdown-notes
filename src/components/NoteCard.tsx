import { Link } from "react-router-dom";
import { SimplifiedNote } from "./NoteList";

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link
      to={`/${id}`}
      className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-gray-800 text-3xl font-semibold">{title}</h2>
      {/*   <p className="mt-2 text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
        deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
        commodi hic, suscipit in a veritatis pariatur minus consequuntur!
      </p> */}

      <div className="flex justify-start mt-4">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 mr-2 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
          >
            {tag.label}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default NoteCard;
