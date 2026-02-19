"use client";

import React, { useState } from "react";
import { ArrowUp, Mic, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Kimi = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex min-h-50 w-full items-center justify-center bg-zinc-50/50 p-4 dark:bg-zinc-950/50">
      <div className="group relative flex w-full max-w-3xl flex-col gap-2 rounded-[32px] border border-zinc-200 bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:ring-zinc-100/5">
        <div className="relative flex min-h-15 w-full flex-col px-4 pt-4">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Throw me a hard one. I’m ready."
            className="flex min-h-10 w-full resize-none border-none bg-transparent text-lg placeholder:text-zinc-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-600"
            style={{ height: "auto" }}
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
        </div>

        <div className="flex items-center justify-between px-2 pb-2">
          {/* Left Actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-neutral-300 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <Plus className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="flex h-fit w-fit px-2 py-1.5 gap-1.5 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-neutral-300 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <span><svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="17"
                viewBox="0 0 13 12"
                fill="none"
              >
                <path
                  d="M10.4 0.400024H2.4C1.29543 0.400024 0.400002 1.29546 0.400002 2.40002V7.40005C0.400002 8.50462 1.29543 9.40005 2.4 9.40005H10.4C11.5046 9.40005 12.4 8.50462 12.4 7.40005V2.40002C12.4 1.29545 11.5046 0.400024 10.4 0.400024Z"
                  stroke="#DBDBDB"
                  stroke-width="0.8"
                />
                <path
                  d="M2.40001 9.40002V10.4C2.40001 10.9523 2.84772 11.4 3.40001 11.4H9.40003C9.95231 11.4 10.4 10.9523 10.4 10.4V9.40002"
                  stroke="#DBDBDB"
                  stroke-width="0.8"
                />
                <line
                  x1="9.00002"
                  y1="2.80002"
                  x2="8.80002"
                  y2="2.80002"
                  stroke="#DBDBDB"
                  stroke-width="0.8"
                  stroke-linecap="round"
                />
                <line
                  x1="4.00001"
                  y1="2.80002"
                  x2="3.80001"
                  y2="2.80002"
                  stroke="#DBDBDB"
                  stroke-width="0.8"
                  stroke-linecap="round"
                />
                <path
                  d="M5.90001 3.40002L6.90002 5.40003H5.90001H5.40001"
                  stroke="#DBDBDB"
                  stroke-width="0.8"
                />
                <path
                  d="M3.40001 6.40002L4.40001 7.40003H8.40002L9.40002 6.40002"
                  stroke="#DBDBDB"
                  stroke-width="0.8"
                  stroke-linecap="round"
                />
              </svg>
              </span>
              <span className="text-1xl">Agent</span>
              
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-fit w-fit pt-1 pb-1 pl-1.5 pr-1.5 items-center  justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <span>K2.5 Thinking</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M11.3333 6.66667L7.99999 10L4.66666 6.66667"
                  stroke="#DBDBDB"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <button
              disabled={!value.trim()}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
                value.trim()
                  ? "bg-zinc-900 text-white shadow-md hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  : "bg-zinc-100 text-zinc-300 dark:bg-zinc-800 dark:text-zinc-600",
              )}
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Kimi };
export default Kimi;
