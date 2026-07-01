export default function MentorAnswer({
  answer,
}) {

  if (!answer) return null;

  return (

    <div className="rounded-2xl bg-white shadow-md p-6 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Mentor Response
      </h2>

      <div className="space-y-8">

        <div>

          <h3 className="font-semibold text-lg mb-2">
            Title
          </h3>

          <p>{answer.title}</p>

        </div>

        <div>

          <h3 className="font-semibold text-lg mb-2">
            Explanation
          </h3>

          <p className="whitespace-pre-wrap">
            {answer.explanation}
          </p>

        </div>

        <div>

          <h3 className="font-semibold text-lg mb-2">
            Step By Step
          </h3>

          <ul className="list-disc pl-6 space-y-2">

            {
              answer.stepByStep?.map((step,index)=>(
                <li key={index}>
                  {step}
                </li>
              ))
            }

          </ul>

        </div>

        <div>

          <h3 className="font-semibold text-lg mb-2">
            Code Examples
          </h3>

          <div className="space-y-5">

            {
              answer.codeExamples?.map((item,index)=>(
                <div
                  key={index}
                  className="rounded-lg bg-gray-100 p-4"
                >

                  <h4 className="font-semibold mb-3">
                    {item.title}
                  </h4>

                  <pre className="overflow-auto text-sm whitespace-pre-wrap">
                    <code>
                      {item.code}
                    </code>
                  </pre>

                </div>
              ))
            }

          </div>

        </div>

        <div>

          <h3 className="font-semibold text-lg mb-2">
            Interview Questions
          </h3>

          <ul className="list-disc pl-6 space-y-2">

            {
              answer.interviewQuestions?.map((item,index)=>(
                <li key={index}>
                  {item}
                </li>
              ))
            }

          </ul>

        </div>

      </div>

    </div>

  );

}