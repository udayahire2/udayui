import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import PreviewPage from "./preview/page";

export default function Home() {
  return (
    <div className="flex justify-center align-center h-full p-10">
      <PreviewPage/>
    </div>
  );
}