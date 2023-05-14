import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";

type NoteListProps = {
  availableTags: Tag[];
};

const NoteList = ({ availableTags }: NoteListProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  return (
    <>
      {/* HEADER */}
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
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
              className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-md text-sm mr-5"
            >
              Create
            </Link>
            <Link
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
      <form className="w-full my-[50px]">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Type here"
              value={title}
              onChange={(e) => setTimeout(e.target.value)}
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
              className="border border-gray-200 "
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
                }),
              }}
            />
          </div>
        </div>
      </form>
      {/* END FORM */}

      {/* CARDS */}
      <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg">
        <div className="mt-5">
          <h2 className="text-gray-800 text-3xl font-semibold">Design Tools</h2>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            dolores deserunt ea doloremque natus error, rerum quas odio quaerat
            nam ex commodi hic, suscipit in a veritatis pariatur minus
            consequuntur!
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <a href="#" className="text-xl font-medium text-indigo-500">
            John Doe
          </a>
        </div>
      </div>
      {/* END CARDS */}
    </>
  );
};

export default NoteList;
