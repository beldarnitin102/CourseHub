import { MessageCircleQuestion } from "lucide-react";

export default function InterviewQuestion({
  question,
}) {

  return (

    <div className="rounded-xl bg-indigo-50 p-6">

      <div className="mb-4 flex items-center gap-2">

        <MessageCircleQuestion
          size={22}
          className="text-indigo-600"
        />

        <h3 className="text-xl font-bold">

          Interview Question

        </h3>

      </div>

      <p className="text-lg leading-8">

        {question}

      </p>

    </div>

  );

}