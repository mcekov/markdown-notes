import { useState, useMemo } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
import NoteCard from "./NoteCard";

export type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
  setShowModal: (show: boolean) => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

const NoteList = ({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      {/* HEADER */}
      <header className="bg-white">
        <nav
          className="flex mx-auto max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span>Notes</span>
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12 mr-10">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Features
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Marketplace
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Company
            </a>
          </Popover.Group>

          <Popover.Group>
            <Link
              to="/new"
              className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-md text-sm mr-3"
            >
              Create
            </Link>
            <Link
              onClick={() => setShowModal(true)}
              to="#"
              className="px-5 py-2.5 font-medium hover:text-blue-600 text-blue-500 rounded-md text-sm border border-gray-200 hover:bg-blue-50"
            >
              Edit Tags
            </Link>
          </Popover.Group>
        </nav>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span>Notes</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      {/* END HEADER */}

      {/* FORM */}
      <form className="max-w-7xl mx-auto lg:px-8 my-[50px]">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="search-notes"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight outline-blue-500"
              id="search-notes"
              type="text"
              placeholder="Type here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="tags"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Tags
            </label>
            <ReactSelect
              inputId="tags"
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
                  minHeight: "2.7rem",
                  borderColor: "#e5e7eb",
                }),
              }}
            />
          </div>
        </div>
      </form>
      {/* END FORM */}

      {/* CARDS */}
      <div className="grid grid-cols-4 xl:grid-cols-4 md:grid-cols-2 gap-3 max-w-7xl mx-auto lg:px-8">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
          />
        ))}
      </div>

      {/* END CARDS */}

      {/* Edit Modal */}

      <EditTagsModal
        show={showModal}
        setShowModal={() => setShowModal(false)}
        availableTags={availableTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />

      {/* END EDIT MODAL */}
    </>
  );
};

function EditTagsModal({
  show,
  setShowModal,
  availableTags, onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps
) {

  return (
    <>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Tags</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-gray-400 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      &times;
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">

                  {availableTags.map(tag => (
                    <div key={tag.id} className="flex">
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 mr-3 leading-tight outline-blue-500"
                        type="text"
                        placeholder="Type here"
                        value={tag.label}
                        onChange={(e) => onUpdateTag(tag.id, e.target.value)
                        }
                      />
                      <button
                        className="hover:text-white text-red-500 border border-red-500 rounded active:bg-red-600 font-bold uppercase px-4 text-sm outline-none focus:outline-none mr-1 mb-3 shadow hover:shadow-lg hover:bg-red-500 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => onDeleteTag(tag.id)}
                      >
                        <span>&times;</span>
                      </button>
                    </div>
                  ))}

                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase px-6 py-2 text-sm rounded outline-none focus:outline-none mr-1 mb-1 shadow hover:shadow-lg ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default NoteList;
