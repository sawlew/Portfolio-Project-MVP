import React, { useState, useEffect } from 'react'

import JSZip from 'jszip';

const Mainpage = () => {

    const [fileDetails, setFileDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState([]);
    const [error, setError] = useState([]);
    const [placeHolder, setPlaceHolder] = useState(true);
    const [errorColor, setErrorColor] = useState(true);

// Handles file input
  const handleFiles = () => {
    const fileInput = document.getElementById('zipFileInput');
    const file = fileInput.files[0];
    setError(`File selected: ${file.name}, Size: ${file.size} bytes, Type: ${file.type}`);
    setErrorColor(true); 
  };
 
// Handles the loading state
 
  const loadState = () => {
    setPlaceHolder(false);
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  // Clear or reset the app
  const tableHeader = document.getElementById("tableHeader");
  const displayFrame = document.getElementById("displayFrame");

  const clearOutput = () => {
    displayFrame.classList.add("lg:w-[60%]");
    tableHeader.classList.add("hidden");
    setOutput([]);
  }

  // Zip extraction
  const extractZip = () => {
    const fileInput = document.getElementById('zipFileInput');
    const file = fileInput.files[0];
    

  // Check if no file is uploaded
  if (!file) {
    setError(`No file selected!!! Please upload a ZIP file!!!.`);
    setErrorColor(false);
    clearOutput();
    setPlaceHolder(true);
    
    return;  
  }

// Output for unsupported file type
  const fileNameExt = file.name.split('.').pop();
  const handleUnsupportedFile = () => {
    setError(`Unsupported file selected`)
    setErrorColor(false);
    setPlaceHolder(true);
    clearOutput();
  };

  // Check if the uploaded file is a zip file
    if (file && fileNameExt === 'zip') {
      clearOutput();

      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const jszip = new JSZip();

        jszip.loadAsync(arrayBuffer).then((zip) => {
          const files = Object.values(zip.files).filter(
            (zipEntry) => !zipEntry.dir
          );

          const numberOfFiles = files.length;
          setFileDetails(`${file.name} contains ${numberOfFiles} files`);

          zip.forEach((relativePath, zipEntry) => {
            zipEntry.async('arraybuffer').then((data) => {
              const blob = new Blob([data]);
              const fileSize = data.byteLength;
              loadState();
              setTimeout(() => {
                tableHeader.classList.remove('hidden');
                setOutput(
                  (prevOutput) => [
                  ...prevOutput,
                  {
                    relativePath,
                    fileExtension: relativePath.split('.').pop(),
                    fileSize,
                    downloadLink: URL.createObjectURL(blob),
                  },
                  ]);
              }, 3000);
            });
          });

          fileInput.value = '';
        });
      };

      reader.readAsArrayBuffer(file);
    } else {
      handleUnsupportedFile();
    }
  };

    
    
  return (
    <div>
        <main id="main">
        <header className="flex justify-center py-5">
            <div className="relative inline-block">
            <p className="absolute z-1 right-[6.5%] bg-[#98b5b2] top-[64%] text-[#060916] text-[8px] writing-mode-vertical-rl whitespace-nowrap transform -rotate-90">Sawlew</p>
            <svg version={1.0} xmlns="http://www.w3.org/2000/svg" width={129} height={68} viewBox="0 0 139.000000 78.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#98b5b2" stroke="none">
                <path d="M641 759 c-21 -8 -22 -11 -10 -28 83 -113 81 -109 63 -136 -18 -27
                -16 -41 15 -125 15 -40 19 -46 15 -20 -4 19 -13 48 -21 63 -20 41 -13 68 26
                94 54 36 153 30 194 -12 21 -20 22 -65 2 -91 -8 -10 -15 -29 -15 -41 0 -31
                -11 -54 -21 -47 -5 3 -9 23 -9 45 0 26 -5 42 -15 45 -10 4 -15 20 -15 45 0 37
                -2 39 -30 39 -28 0 -30 -2 -30 -40 0 -29 -4 -40 -15 -40 -11 0 -15 -10 -14
                -32 1 -24 3 -27 6 -10 4 22 23 32 23 12 0 -5 14 -10 30 -10 17 0 30 5 30 10 0
                6 5 10 10 10 6 0 10 -15 10 -32 0 -18 5 -40 10 -48 9 -13 12 -12 25 4 8 11 15
                29 15 40 1 12 7 32 15 46 17 29 20 86 5 95 -19 12 -10 40 31 94 39 52 40 55
                23 68 -29 22 -45 12 -88 -54 -40 -60 -42 -62 -87 -62 -44 -1 -48 1 -74 42 -31
                47 -65 87 -74 86 -3 0 -17 -5 -30 -10z m42 -24 c-4 -15 -36 -12 -41 3 -3 9 3
                13 19 10 13 -1 23 -7 22 -13z m307 6 c0 -6 -4 -12 -9 -15 -13 -8 -42 4 -35 15
                7 12 44 12 44 0z m-275 -30 c3 -5 -4 -13 -16 -16 -23 -8 -34 -1 -24 14 8 13
                32 14 40 2z m244 0 c9 -6 10 -10 2 -16 -16 -9 -44 2 -36 15 8 12 16 12 34 1z
                m-228 -36 c0 -13 -41 -19 -41 -7 0 11 20 22 33 18 5 -1 8 -6 8 -11z m207 -3
                c3 -9 -2 -13 -14 -10 -9 1 -19 9 -22 16 -3 9 2 13 14 10 9 -1 19 -9 22 -16z
                m-181 -29 c5 -14 -35 -24 -43 -11 -7 11 15 29 30 25 6 -2 11 -8 13 -14z m163
                -4 c0 -5 -9 -9 -20 -9 -19 0 -26 11 -14 23 8 8 34 -3 34 -14z m-82 -106 c-2
                -36 -7 -49 -20 -51 -15 -3 -18 4 -18 47 0 45 3 51 21 51 18 0 20 -5 17 -47z" />
                <path d="M751 428 c0 -10 -5 -18 -11 -18 -5 0 -7 -7 -3 -16 5 -15 7 -15 15 0
                5 9 7 24 5 34 -4 16 -5 16 -6 0z" />
                <path d="M833 375 c15 -8 27 -19 27 -24 0 -16 -29 -33 -52 -29 -26 3 -37 36
                -16 50 10 8 10 9 -2 5 -20 -5 -26 -47 -8 -58 21 -14 64 -10 78 6 12 15 5 55
                -10 55 -5 0 -17 3 -27 6 -10 3 -6 -2 10 -11z" />
                <path d="M890 354 c-1 -86 -147 -91 -151 -5 -2 24 -2 25 -6 3 -3 -13 3 -34 11
                -47 12 -19 16 -52 16 -145 l0 -121 58 3 57 3 3 120 c2 82 7 130 18 153 11 23
                12 37 5 50 -9 14 -10 12 -11 -14z m-96 -80 c21 -8 20 -24 -1 -24 -16 -1 -16
                -2 2 -16 17 -13 18 -16 5 -24 -10 -7 -11 -10 -2 -10 19 0 14 -30 -5 -31 -17
                -1 -17 -2 0 -6 22 -6 22 -33 0 -34 -17 -1 -17 -2 0 -6 19 -5 23 -33 5 -34 -10
                0 -10 -2 0 -6 20 -8 14 -33 -8 -33 -19 0 -20 7 -20 115 0 63 2 115 4 115 2 0
                11 -3 20 -6z m73 -112 l2 -112 -27 1 c-24 0 -25 1 -7 9 18 7 19 8 3 15 -10 4
                -18 11 -18 16 0 5 8 9 18 9 16 1 16 1 0 11 -10 5 -18 14 -18 19 0 6 8 11 18
                11 16 1 16 2 0 6 -10 2 -18 8 -18 13 0 5 8 14 18 19 16 10 16 10 0 11 -10 0
                -18 5 -18 10 0 6 7 10 15 10 8 0 15 5 15 10 0 6 -7 10 -15 10 -18 0 -20 36 -2
                43 27 12 32 -3 34 -111z" />
                <path d="M20 244 c0 -58 5 -114 10 -125 26 -47 112 -63 167 -29 41 24 55 74
                51 178 -3 76 -3 77 -30 80 l-28 3 0 -98 c0 -115 -10 -136 -60 -136 -50 0 -60
                22 -60 135 0 98 0 98 -25 98 l-25 0 0 -106z" />
                <path d="M510 330 c0 -18 7 -20 65 -20 36 0 65 -3 65 -6 0 -4 -21 -36 -47 -72
                -64 -89 -92 -134 -93 -149 0 -10 28 -13 105 -13 98 0 105 1 105 20 0 18 -7 20
                -65 20 -36 0 -65 4 -65 9 0 5 21 37 48 71 55 74 81 118 82 143 0 15 -11 17
                -100 17 -93 0 -100 -1 -100 -20z" />
                <path d="M1160 210 l0 -140 25 0 25 0 0 140 0 140 -25 0 -25 0 0 -140z" />
                <path d="M1304 322 c-6 -4 -14 -19 -18 -34 -3 -16 -13 -28 -21 -28 -8 0 -15
                -7 -15 -15 0 -8 7 -15 15 -15 12 0 15 -14 15 -63 0 -79 13 -100 60 -95 40 3
                49 31 13 36 -21 3 -23 9 -23 63 0 56 1 59 25 59 16 0 25 6 25 15 0 9 -9 15
                -25 15 -21 0 -25 5 -25 29 0 32 -10 44 -26 33z" />
                <path d="M300 170 c0 -100 0 -100 25 -100 23 0 24 3 27 78 l3 77 30 0 30 0 3
                -77 c3 -75 4 -78 27 -78 24 0 25 2 25 80 0 67 -3 83 -20 100 -22 22 -51 25
                -82 9 -14 -8 -23 -8 -31 0 -30 30 -37 12 -37 -89z" />
                <path d="M930 140 l0 -130 25 0 c22 0 25 4 25 35 0 33 2 35 25 29 62 -15 105
                27 105 104 0 74 -56 113 -108 76 -20 -14 -23 -14 -28 0 -3 9 -15 16 -25 16
                -18 0 -19 -9 -19 -130z m124 74 c14 -35 6 -83 -16 -98 -34 -24 -58 -5 -58 47
                0 24 5 48 12 55 17 17 55 15 62 -4z" />
                </g>
            </svg>
            </div>
        </header>
        {/* <FileUploader onChange={handleFiles} /> */}
        <div className="col-span-full">
            <label htmlFor="zipFileInput" className="cursor-pointer mt- flex justify-center rounded-lg w-[90%] lg:w-[60%] mx-auto border-2 border-dashed border-[#98b5b2] px-6 py-5">
            <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
                <div className="mt-4 text-sm leading-6 text-white">
                <span className="text-gray-500">Upload a file</span>
                <input id="zipFileInput" accept=".zip" name="zipFileInput" type="file" className="sr-only" onChange={handleFiles} />
                <p className="text-gray-500">(Click anywhere within the dotted perimeter to upload a zip file)</p>
                </div>
                <p className="text-xs leading-5 text-gray-500">.zip extension only</p>
                {/* <p id="boxContent" className="text-[#98b5b2]" /> */}
                <p className={errorColor ? 'text-[#98b5b2]' : 'text-red-500'}>
                  {error}
                </p>
            </div>
            </label>
        </div>

        <section className="w-full mx-auto mb-5 flex flex-col items-center">
            <button 
              onClick={extractZip}
              className="b-[#98b5b2] bg-[#98b5b2] hover:bg-white active:bg-[#98b5b2] my-5 w-40 p-4 text-[#060916] rounded-md">Extract Zip
            </button>
            <div id="displayFrame" className="flex flex-col bg-[#98b5b2] justify-center items-center border w-[90%] lg:w-[60%] min-h-[100px] p-6 rounded-lg">
            <p id="outputPlaceholder" className={placeHolder ? "text-[#0E1426]" : "hidden"}>Your extracted files will appear here...</p>
           
            <div id="loadingState" className={loading ? "block" : "hidden"}>
    
                
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-[#0E1426]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="sr-only">Loading...</span>
            </div>
            </div>

            <div className="shadow-lg rounded-lg overflow-hidden hidden" id="tableHeader">
                <p className="text-bold text-[#060916] font-bold text-center mb-3">
                    {fileDetails}
                </p>
                <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-[#0E1426]">
                    <th className="py-4 px-6 text-center text-white font-bold uppercase">Path/Name</th>
                    <th className="hidden sm:table-cell py-4 px-6 text-center text-white font-bold uppercase truncate">Type</th>
                    <th className="hidden sm:table-cell py-4 px-6 text-center text-white font-bold uppercase truncate">Size</th>
                    <th className=" py-4 px-6 text-center text-white font-bold uppercase">Download</th>
                    </tr>
                </thead>
                <tbody className="bg-white" id="output">
                  {output.map((item, index) => (
                    <tr key={index}>
                      <td className="py-4 px-6 border-b border-[#0E1426] text-center truncate">{item.relativePath}</td>
                      <td className="hidden sm:table-cell py-4 px-6 border-b border-[#0E1426] text-center truncate">{item.fileExtension}</td>
                      <td className="hidden sm:table-cell py-4 px-6 border-b border-[#0E1426] text-center truncate">{item.fileSize} bytes</td>
                      <td className="border-b border-[#0E1426] text-center">
                        <a href={item.downloadLink} download={item.relativePath} className="inline-flex justify-center items-center p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
            </div>
            </div>
        </section>
        </main>
        
        <div id="backDrop" className="close fixed top-0 z-1 w-full min-h-screen bg-[#1c0361a4] backdrop-filter backdrop-blur-lg hidden"></div>

    </div>
  )
}

export default Mainpage