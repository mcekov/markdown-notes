import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tag } from "../App";
import CreatableReactSelect from "react-select/creatable";

import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="-mx-3 flex flex-wrap mt-10">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 font-medium block text-base text-[#07074D]"
            >
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              className="w-full rounded-md border bg-white py-3 px-6 text-base text-[#6B7280] outline-blue-500"
              defaultValue={title}
              required
            />
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="tags"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Tags
            </label>
            <CreatableReactSelect
              inputId="tags"
              placeholder="Select or create tag..."
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              isMulti
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  minHeight: "3.1rem",
                  borderColor: "#e5e7eb",
                }),
              }}
            />
          </div>
        </div>
        <div className="w-full px-3">
          <div className="mb-5">
            <label
              htmlFor="body"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Body
            </label>
            <textarea
              ref={markdownRef}
              rows={15}
              name="body"
              id="body"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-blue-500"
              defaultValue={markdown}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="mr-2 hover:shadow-lg rounded-md bg-indigo-500 hover:bg-indigo-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Save
        </button>
        <Link to="..">
          <button className="hover:shadow-lg rounded-md bg-red-400 hover:bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};

export default NoteForm;
