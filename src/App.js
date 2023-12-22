// let quiz = {
//   quizName:"W"
//   listOfQuestions: [
//     { question: "what is ur name", Option1: "Rahul", Option2: "Kalyan" },
//     { question: "what is ur name", Option1: "Rahul", Option2: "Kalyan" },
//     { question: "what is ur name", Option1: "Rahul", Option2: "Kalyan" },
//     { question: "what is ur name", Option1: "Rahul", Option2: "Kalyan" },
//   ],
// };

import { useEffect, useState } from "react";

let l = [
  {
    question: "What is your name ?",
    option1: "Kalyan",
    option2: "kiran",
    option3: "kolanpaka2000",
    option4: "None of the above",
  },
  {
    question: "What is your AGE ?",
    option1: 20,
    option2: 21,
    option3: 22,
    option4: 23,
  },
  {
    question: "What is your SCHOOL ?",
    option1: "Govnt School",
    option2: "Prvt School",
    option3: "No School",
    option4: "None of the above",
  },
  {
    question: "WHERE is your HOME ?",
    option1: "Jangaon",
    option2: "Hyd",
    option3: "Warangal",
    option4: "None of the above",
  },
  {
    question: "What is Your Goal ?",
    option1: "IAS",
    option2: "Software",
    option3: "Bussiness",
    option4: "None of the above",
  },
];
const dataHandler = { quizName: null, answers: null };
export default function App() {
  const [listOfQuestions, setListOfQuestions] = useState([]);
  dataHandler.answers = Array(listOfQuestions.length).fill(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("your-api-url", {
          method: "GET",
        });
        const data = await response.json();
        dataHandler.quizName = data.quizName;
        setListOfQuestions(data.listOfQuestions);
      } catch (error) {
        console.log("An Error Occurred ", error);
      }
    }
    fetchData();
  }, []);
  return (
    <QuizBox
      listOfQuestions={listOfQuestions}
      answers={dataHandler.answers}
      quizName={dataHandler.quizName}
    />
  );
}

function QuizBox({ listOfQuestions, answers, quizName }) {
  const [index, setIndex] = useState(0);
  function submitData() {
    async function postData() {
      try {
        const response = await fetch("your-api-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: answers, // Your list of data
          }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        // Handle the error
        console.error("An error occurred:", error);
      }
    }

    postData();
  }
  return listOfQuestions.length !== 0 ? (
    <div className="quizbox">
      <h1>{quizName}</h1>
      <ListOfQuestions
        eachQuestion={listOfQuestions[index]}
        index={index}
        key={index}
        answers={answers}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() =>
            setIndex(index > 0 ? (currentValue) => currentValue - 1 : index)
          }
        >
          Prev
        </button>
        <p>
          {index + 1}/{listOfQuestions.length}
        </p>
        <button
          onClick={() =>
            setIndex(
              index < listOfQuestions.length - 1
                ? (currentValue) => currentValue + 1
                : index
            )
          }
        >
          Next
        </button>
      </div>
      <button
        style={{
          backgroundColor: "green",
          width: "100%",
          padding: "14px 3px",
        }}
        onClick={() => submitData()}
      >
        Submit
      </button>
    </div>
  ) : (
    <p style={{ fontSize: "24px", color: "white" }}>
      We are trying to fetch data please wait ...
    </p>
  );
}
function ListOfQuestions({ eachQuestion, index, answers }) {
  const [ticked, setTicked] = useState(null);
  const options = Array(4)
    .fill(1)
    .map((eachVal, indexNo) => eachQuestion[`option${indexNo + 1}`]);

  if (ticked === null) {
    if (answers[index] !== null) {
      let returnVal =
        options.findIndex((eachOpt) => eachOpt === answers[index]) + 1;
      setTicked(returnVal);
    }
  } else {
    answers[index] = eachQuestion[`option${ticked}`];
  }
  console.log(answers);

  return (
    <div>
      <h1>{eachQuestion.question}</h1>
      <ul>
        {options.map((eachOption, index) => (
          <li key={index + 1}>
            <input
              type="radio"
              name={eachQuestion.question}
              checked={ticked === index + 1}
              onChange={() => setTicked(index + 1)}
            />
            {eachOption}
          </li>
        ))}
      </ul>
    </div>
  );
}
