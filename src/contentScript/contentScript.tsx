import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import WeatherCard from '../components/WeatherCard'
import { getStoredPaths } from '../utils/storage'
import {
  OpenInNew,
  CreateNewFolder
} from '@material-ui/icons';

import './contentScript.css'



// document.addEventListener("mouseover", function (event) {
//   // Get the text content of the hovered element
//   const hoveredText = event.target.innerText.trim();


//   // Check if the hovered text contains an address
//   if (hoveredText.match(/\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./g)) {
//     // Send a message to the background script with the detected address
//     chrome.runtime.sendMessage({ address: hoveredText });
//   }
// });


// const App: React.FC<{}> = () => {
//   const [options, setOptions] = useState<LocalStorageOptions | null>(null)
//   const [isActive, setIsActive] = useState<boolean>(true)

//   useEffect(() => {
//     getStoredOptions().then((options) => {
//       setOptions(options)
//       setIsActive(options.hasAutoOverlay)
//     })
//   }, [])

//   const handleMessages = (msg: Messages) => {
//     if (msg === Messages.TOGGLE_OVERLAY) {
//       setIsActive(!isActive)
//     }
//   }

//   useEffect(() => {
//     chrome.runtime.onMessage.addListener(handleMessages)
//     return () => {
//       // clean up event listener, bug fix from: https://www.udemy.com/course/chrome-extension/learn/#questions/14694484/
//       chrome.runtime.onMessage.removeListener(handleMessages)
//     }
//   }, [isActive])

//   if (!options) {
//     return null
//   }

//   return (
//     <>
//       {(
//         <Card className="overlayCard">
//          <div>Rahul</div>
//         </Card>
//       )}
//     </>
//   )
// }

// const root = document.createElement('div')
// document.body.appendChild(root)
// ReactDOM.render(<App />, root)

// chrome.runtime.onMessage.addListener( (msg)=>{
//   myMain()
// })
// window.addEventListener ("load",myMain, false);


// function myMain () {
//   setTimeout(async()=>{
//     const openInNewTab = (url) => {
//       const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
//       if (newWindow) newWindow.opener = null
//     }
//     let options = await getStoredOptions();
//     let documentsList;
//     if(document.querySelectorAll<HTMLDivElement>(".file-header").length >0){
//       documentsList = document.querySelectorAll<HTMLDivElement>(".file-header")
//       for(let node of document.querySelectorAll(".file-header .git_version_ctrl_headers")){
//         node.remove()
//       }
//     }else{
//       documentsList = document.querySelectorAll<HTMLDivElement>('.diff-header')
//       for(let node of document.querySelectorAll(".diff-header .git_version_ctrl_headers")){
//         node.remove()
//       }
//     }
//     for (const node of documentsList) {
//       const filenamePattern = /\b\w+\.\w+\b/; // pattern to match file names  
//         const reactButtonVsCode = document.createElement("div");
//         const reactButtonCreateNewCommand = document.createElement("div");
        
//         reactButtonVsCode.className ="git_version_ctrl_headers"
//         reactButtonCreateNewCommand.className = "git_version_ctrl_headers"
//         node.appendChild(reactButtonVsCode);
//         node.appendChild(reactButtonCreateNewCommand);
//         const prefix = options && options.homePath || '';
//         let sufix 
//         if(node.getElementsByTagName('clipboard-copy').length >0){
//           sufix = node.getElementsByTagName('clipboard-copy')[0].getAttribute('value')
//         }else{
//           //perforce
//           sufix = node.innerText.replace("  ","");
//         }
        
//         ReactDOM.render(<WeatherCard onClickAction={() => { 
//           let vsCodeURL = "vscode://file//" + prefix + sufix;
//           openInNewTab(vsCodeURL)}} ><OpenInNew/></WeatherCard>, reactButtonVsCode);
//         ReactDOM.render(<WeatherCard onClickAction={()=>{ 
      
//           let cmd = `mkdir -p ${prefix}${sufix}`
//           navigator.clipboard.writeText(cmd)
//         }}>< CreateNewFolder/> </WeatherCard>,reactButtonCreateNewCommand)
//       }
    
//   },2000)
// }



// async function myMain1() {
//   const paths = await getStoredPaths();
//   const openInNewTab = (url) => {
//           const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
//           if (newWindow) newWindow.opener = null
//         }
//     document.addEventListener("mouseover", function (event) {
//       // Get the text content of the hovered element
//       const hoveredText = event.target.innerText.trim();

//       const villageName = ""
//       const cityname = ""
//       for(let i=0;i<paths.length;i++){
//        let mapContainer = document.getElementById('map-container'+i);

       
//       }
//     })

// }
