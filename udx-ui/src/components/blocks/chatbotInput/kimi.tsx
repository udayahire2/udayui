"use client";

import React, { useState } from "react";
import { ArrowUp, Mic, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Kimi = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex min-h-50 w-full items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="flex w-full max-w-3xl flex-col gap-2 rounded-3xl border border-zinc-200 bg-white p-2 shadow-sm transition-colors focus-within:border-zinc-300 focus-within:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-zinc-700">
        <div className="relative flex min-h-15 w-full flex-col px-4 pt-4">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Throw me a hard one. I’m ready."
            className="flex min-h-10 w-full resize-none border-none bg-transparent text-lg font-medium tracking-tight text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100 dark:placeholder:text-zinc-500"
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
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-white/10 dark:hover:text-zinc-200"
                >
                  <Plus className="h-6 w-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach file</TooltipContent>
            </Tooltip>
            <button
              type="button"
              className="flex h-fit w-fit items-center justify-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-zinc-400 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-white/10 dark:hover:text-zinc-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="17"
                viewBox="0 0 13 12"
                fill="none"
              >
                <path
                  d="M10.4 0.400024H2.4C1.29543 0.400024 0.400002 1.29546 0.400002 2.40002V7.40005C0.400002 8.50462 1.29543 9.40005 2.4 9.40005H10.4C11.5046 9.40005 12.4 8.50462 12.4 7.40005V2.40002C12.4 1.29545 11.5046 0.400024 10.4 0.400024Z"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                <path
                  d="M2.40001 9.40002V10.4C2.40001 10.9523 2.84772 11.4 3.40001 11.4H9.40003C9.95231 11.4 10.4 10.9523 10.4 10.4V9.40002"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                <line
                  x1="9.00002"
                  y1="2.80002"
                  x2="8.80002"
                  y2="2.80002"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <line
                  x1="4.00001"
                  y1="2.80002"
                  x2="3.80001"
                  y2="2.80002"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <path
                  d="M5.90001 3.40002L6.90002 5.40003H5.90001H5.40001"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                <path
                  d="M3.40001 6.40002L4.40001 7.40003H8.40002L9.40002 6.40002"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>
              <span>Agent</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-fit w-fit items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-zinc-400 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-white/10 dark:hover:text-zinc-200"
            >
              <span>K2.5 Thinking</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M11.3333 6.66667L7.99999 10L4.66666 6.66667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={!value.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
                >
                  <ArrowUp className="h-5 w-5" strokeWidth={2} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Send message</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Kimi };
export default Kimi;
