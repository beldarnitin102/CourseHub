import { Menu, X } from "lucide-react";
import { useState } from "react";

import VideoSidebar from "./VideoSidebar";

export default function MobileSidebar({
  sections,
  selectedLecture,
  setSelectedLecture,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}

      <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-white p-4 lg:hidden">

        <h2 className="text-lg font-bold">
          Course Content
        </h2>

        <button
          onClick={() => setOpen(true)}
        >
          <Menu size={28} />
        </button>

      </div>

      {/* Overlay */}

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}

      <div
        className={`fixed left-0 top-0 z-50 h-full w-[320px] bg-white shadow-xl transition-all duration-300

        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:hidden`}
      >
        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            Course Content
          </h2>

          <button
            onClick={() => setOpen(false)}
          >
            <X size={28} />
          </button>

        </div>

        <VideoSidebar
          sections={sections}
          selectedLecture={selectedLecture}
          setSelectedLecture={(lecture) => {
            setSelectedLecture(lecture);
            setOpen(false);
          }}
        />

      </div>
    </>
  );
}