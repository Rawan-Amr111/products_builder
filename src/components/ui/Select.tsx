"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { categories } from "../../data";
import { ICategory } from "../../interfaces";

interface IProps {
  selected: {
    name: string;
    imageURL: string;
  };
  setSelected: (category: ICategory) => void;
}
export const Select = ({ selected, setSelected }: IProps) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div>
        <Listbox.Label className="block text-sm font-medium text-gray-700">
          Category
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
            <span className="flex items-center">
              <img
                src={selected.imageURL}
                alt=""
                className="h-6 w-6 flex-shrink-0 rounded-full"
              />
              <span className="ml-3 block truncate">{selected.name}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categories.map((Category) => (
                <Listbox.Option
                  key={Category.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={Category}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <img
                          src={Category.imageURL}
                          alt=""
                          className="h-6 w-6 flex-shrink-0 rounded-full"
                        />
                        <span
                          className={`ml-3 block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {Category.name}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                            active ? "text-white" : "text-indigo-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
};
