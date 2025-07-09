import React from 'react'
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const JournalEntryPoint = () => {
  return (
    <div>
      journel entry JournalEntryPoint
    </div>
  )
}

export default JournalEntryPoint
