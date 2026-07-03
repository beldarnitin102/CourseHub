import {
  Star,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function InterviewFeedback({
  feedback,
}) {

  return (

    <div className="mt-8 rounded-xl border bg-gray-50 p-6">

      <h3 className="mb-6 text-2xl font-bold">

        AI Feedback

      </h3>

      <div className="space-y-6">

        <div className="flex items-center gap-3">

          <Star
            className="text-yellow-500"
            size={22}
          />

          <span className="font-semibold">

            Score :

          </span>

          <span>

            {feedback.score}/10

          </span>

        </div>

        <div>

          <div className="mb-2 flex items-center gap-2">

            <CheckCircle2
              size={20}
              className="text-green-600"
            />

            <h4 className="font-semibold">

              Strengths

            </h4>

          </div>

          <ul className="list-disc space-y-1 pl-6">

            {feedback.strengths?.map((item, index) => (

              <li key={index}>
                {item}
              </li>

            ))}

          </ul>

        </div>

        <div>

          <div className="mb-2 flex items-center gap-2">

            <AlertCircle
              size={20}
              className="text-red-600"
            />

            <h4 className="font-semibold">

              Improvements

            </h4>

          </div>

          <ul className="list-disc space-y-1 pl-6">

            {feedback.improvements?.map((item, index) => (

              <li key={index}>
                {item}
              </li>

            ))}

          </ul>

        </div>

        <div>

          <div className="mb-2 flex items-center gap-2">

            <ArrowRight
              size={20}
              className="text-blue-600"
            />

            <h4 className="font-semibold">

              Suggested Answer

            </h4>

          </div>

          <p className="leading-8 text-gray-700">

            {feedback.suggestedAnswer}

          </p>

        </div>

      </div>

    </div>

  );

}