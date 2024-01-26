import { useEffect, useState } from "react";
import uploadStory from "../../services/Story3/Story3";
import GenerateStory from "../../services/OpenAI/OpenAI";
//import { json } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = () => {
  let [jsonData, setJsonData] = useState<string>(``);
  let [keyData, setKeyData] = useState<string>("");
  let [genere, setGenere] = useState<string>("Science Fiction");
  let [extraInfo, setExtraInfo] = useState<string>("");
  let [isLoading, setIsLoading] = useState<boolean>(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("dashboard screen");
  }, []);

  let handleJsonInput = (e: any): void => {
    setJsonData(e.target.value);
  };  
  
  let handleKeyInput = (e: any): void => {
    setKeyData(e.target.value);
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
    <div className="flex flex-col min-h-screen w-full items-center content-center  bg-[url(https://raw.githubusercontent.com/cenentury0941/Pictures/main/autumn.jpg)] bg-no-repeat bg-cover">
    <div className="flex w-1/2 min-h-screen align-center items-center flex-col flex-col">
      <h1 className="p-4 w-full text-center flex items-center flex-col" style={{marginTop:"39px"}}>
        Story World
      </h1>

      <div className="bg-transparent flex w-full overflow-hidden rounded ">
        <div className="w-1/2 p-12 flex flex-col gap-6">
          
            <p className="font-normal text-2xl mb-4">
              Generate Story from GPT-3
            </p>
            <input
              name="API Key"
              className="border rounded p-4 w-full"
              placeholder="Enter openAI API key"
              type="password"
              onChange={(e) => {
                handleInput(e);
              }}
            />
            <input
              name="genre"
              className="border rounded p-4 w-full"
              placeholder="Enter the genere"
              onChange={(e) => {
                handleInput(e);
              }}
            />
          

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
          <div className="relative w-[900px] border-2 no-scrollbar overflow-scroll h-40 rounded" style={{background:"#fff"}}>
              <pre>
                {jsonData && JSON.parse(JSON.stringify(jsonData, null, 2))}
              </pre>
          </div>
        </div>

        <div className="w-1/2">
          <div className="w-full font-normal text-2xl m-0 p-12 pb-0 flex flex-col items-center">
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
            <p className="mb-4 flex items-end" style={{height:"50px"}}>
              <label htmlFor="story-json">
                Story3 API Key
              </label>
            </p>
            <input
              id="story-json"
              name="story-json"
              className="border rounded w-full p-4"
              placeholder="API Key Here"
              type="password"
              value={keyData}
              onChange={(e) => {
                console.log(e)
                handleKeyInput(e)
              }}
            />
          </div>

          <button
            className="p-4 rounded-sm bg-primary m-12 mt-6 text-custom-white"
            onClick={() => {
              uploadStory(jsonData);
              setOpen(true)
              setTimeout( () => {
                setOpen(false)
              } , 3900 )
            }}
          >
            Submit to Story3
          </button>
        </div>
      </div>
    </div>
    { open && <CustomizedDialogs open={open} setOpen={setOpen}/> }
    </div>
    
  );
};


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function CustomizedDialogs(open:any, setOpen:any) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        Error : Please run in chrome with web-security disabled.
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
        }
export default Dashboard;
