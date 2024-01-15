import { useEffect, useState } from "react";
import uploadStory from "../../services/Story3/Story3";
import GenerateStory from "../../services/OpenAI/OpenAI";
//import { json } from "react-router-dom";

const Dashboard = () => {
  let [jsonData, setJsonData] = useState<string>("");
  let [genere, setGenere] = useState<string>("Science Fiction");
  let [extraInfo, setExtraInfo] = useState<string>("");
  let [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("dashboard screen");
  }, []);

  let handleJsonInput = (e: any): void => {
    setJsonData(e.target.value);
  };

  let handleInput = (e: any) => {
    if (e.target.value == "genere") {
      setGenere(e.target.value);
    } else if (e.target.value == "extrainfo") {
      setExtraInfo(e.target.value);
    }
  };

  let handleGPTCall = async () => {
    let storyResponse = await GenerateStory(genere, extraInfo);
    console.log(storyResponse);

    console.log("data fetched");
    setJsonData(storyResponse.choices[0].message.content);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(jsonData);
  }, [jsonData]);

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="p-4 bg-custom-green w-full text-center border-b-2">
        Welcome to Story World
      </h1>

      <div className="flex w-full overflow-hidden min-h-screen border-primary border-2 border-t-0 border-b-0  rounded ">
        <div className="w-1/2 border-r-2 border-primary p-12 flex flex-col gap-6">
          <div>
            <p className="font-normal text-2xl mb-4">
              Generate Story from GPT-3
            </p>
            <input
              name="genere"
              className="border rounded p-4 w-full"
              placeholder="Enter the genere"
              onChange={(e) => {
                handleInput(e);
              }}
            />
          </div>

          <input
            name="extrainfo"
            className="border rounded p-4 w-full"
            placeholder="Enter additional information"
            onChange={(e) => {
              handleInput(e);
            }}
          />

          <button
            className="self-end rounded bg-primary w-fit p-4 text-custom-white flex justify-center items-center"
            disabled={isLoading && true}
            onClick={() => {
              setIsLoading(true);
              handleGPTCall();
            }}
          >
            {isLoading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Generate Story
          </button>
          <div className="relative w-full overflow-scroll bg-custom-green h-96 rounded">
            <button
              className="absolute right-0 p-4 bg-primary text-custom-white"
              onClick={() => {
                navigator.clipboard.writeText(jsonData);
              }}
            >
              Copy JSON
            </button>
            <div className="p-4 overflow-scroll">
              <pre>
                {jsonData && JSON.parse(JSON.stringify(jsonData, null, 2))}
              </pre>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className="w-full font-normal text-2xl m-0 p-12 pb-0">
            <p className="mb-4">
              <label htmlFor="story-json">
                Paste the JSON of the generated story
              </label>
            </p>
            <input
              id="story-json"
              name="story-json"
              className="border rounded w-full p-4"
              placeholder="Paste Here"
              value={jsonData}
              onChange={(e) => {
                console.log(e)
                handleJsonInput(e);
              }}
            />
          </div>

          <button
            className="p-4 rounded-sm bg-primary m-12 mt-6 text-custom-white"
            onClick={() => {
              uploadStory(jsonData);
            }}
          >
            Submit to Story3
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
