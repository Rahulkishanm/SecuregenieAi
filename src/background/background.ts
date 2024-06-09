import {
  getStoredPaths,
  getStoredOptions,
} from '../utils/storage'
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// console.log("appeee",app)
// import { fetchOpenWeatherData } from '../utils/api'
chrome.runtime.onInstalled.addListener(() => {
  main()
})
chrome.contextMenus.onClicked.addListener((event,tab) =>{
  if(event.menuItemId === 'parent'){
    return
  }
  chrome.storage.session.set({ prompt: event.menuItemId +"(->) "+ event.selectionText });
  chrome.sidePanel.open({ tabId: tab.id });
  // chrome.tabs.create({
  //  url:`https://www.google.com/maps/dir/${event.menuItemId}/${event.selectionText}/`
  // })
 })



//   // chrome.contextMenus.create({
//   //   contexts: ['selection'],
//   //   title: 'Add city to weather extension',
//   //   id: 'weatherExtension',
//   // })

//   // chrome.alarms.create({
//   //   periodInMinutes: 60,
//   // })
// })

// // chrome.contextMenus.onClicked.addListener((event) => {
// //   getStoredCities().then((cities) => {
// //     setStoredCities([...cities, event.selectionText])
// //   })
// // })

// // chrome.alarms.onAlarm.addListener(() => {
// //   getStoredOptions().then((options) => {
// //     if (options.homeCity === '') {
// //       return
// //     }
// //     fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
// //       const temp = Math.round(data.main.temp)
// //       const symbol = options.tempScale === 'metric' ? '\u2103' : '\u2109'
// //       chrome.action.setBadgeText({
// //         text: `${temp}${symbol}`,
// //       })
// //     })
// //   })
// // })


function main() {
  console.log("main is called")
// Call this function when Firebase is needed

  getStoredPaths().then((items)=>{
    let newItems = items
    if(items.length == 0){
      // newItems = ["Add starting place on the extension"]
    }
    chrome.contextMenus.removeAll(()=>{})
    chrome.contextMenus.create({
      title: 'Ask AI',
      id: 'parent',
      contexts: ["page", "selection"]
  })
    for(let i=0;i<newItems.length;i++){
      chrome.contextMenus.create({
        title: newItems[i]+ ' `-> the selected text will be replaced here`',
        id: newItems[i],
        parentId:'parent',
        contexts: ["page", "selection"]
    })
  }

  })
}

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   main()
// });




// chrome.runtime.onInstalled.addListener((details) => {

//   chrome.contextMenus.create({
//       title: "Search TV Show",
//       id: "contextMenu1",
//       contexts: ["page", "selection"]
//   })
//   chrome.contextMenus.create({
//       title: "Read This Text",
//       id: "contextMenu2",
//       contexts: ["page", "selection"]
//   })
//   chrome.contextMenus.onClicked.addListener((event) => {
//       if (event.menuItemId === "contextMenu1") {
//           fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
//               .then(res => res.json())
//               .then(data => {
//                   console.log(data)
//                   chrome.storage.local.set({
//                       shows: data,
//                   })
//               })
//       } else if (event.menuItemId === "contextMenu2") {
//           chrome.tts.speak(event.selectionText, {
//               lang: "zh-CN",
//               rate: 1,
//           })
//       }
//   })
// })
const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';

// A global promise to avoid concurrency issues
let creatingOffscreenDocument: Promise<void> | null = null;

// Chrome only allows for a single offscreenDocument. This is a helper function
// that returns a boolean indicating if a document is already active.
async function hasDocument(): Promise<boolean> {
  // Check all windows controlled by the service worker to see if one
  // of them is the offscreen document with the given path
  const matchedClients = await clients.matchAll();
  return matchedClients.some(
    (c) => c.url === chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)
  );
}

async function setupOffscreenDocument(path: string): Promise<void> {
  // If we do not have a document, we are already setup and can skip
  if (!(await hasDocument())) {
    // create offscreen document
    if (creatingOffscreenDocument) {
      await creatingOffscreenDocument;
    } else {
      creatingOffscreenDocument = chrome.offscreen.createDocument({
        url: path,
        reasons: [
          chrome.offscreen.Reason.DOM_SCRAPING
        ],
        justification: 'authentication'
      }).then(() => {
        creatingOffscreenDocument = null;
      });
      await creatingOffscreenDocument;
    }
  }
}

async function closeOffscreenDocument(): Promise<void> {
  if (!(await hasDocument())) {
    return;
  }
  await chrome.offscreen.closeDocument();
}

function getAuth(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const auth = await chrome.runtime.sendMessage({
      type: 'firebase-auth',
      target: 'offscreen'
    });
    auth?.name !== 'FirebaseError' ? resolve(auth) : reject(auth);
  });
}

async function firebaseAuth(): Promise<any> {
  await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);

  const auth = await getAuth()
    .then((auth) => {
      console.log('User Authenticated', auth);
      return auth;
    })
    .catch((err) => {
      if (err.code === 'auth/operation-not-allowed') {
        console.error('You must enable an OAuth provider in the Firebase' +
                      ' console in order to use signInWithPopup. This sample' +
                      ' uses Google by default.');
      } else {
        console.error(err);
        return err;
      }
    })
    .finally(closeOffscreenDocument);

  return auth;
}

// setTimeout(()=>{
//   firebaseAuth();
// },5000)
let auth = null;
chrome.runtime.onMessage.addListener( async (message, sender, sendResponse)=>{
  console.log("we got triggered")
  main()
  if (message.type === 'FROM_SIDEPANEL') {
    console.log('Message received from side panel:', message.payload);
    if( message.payload === 'login'){
      auth = await firebaseAuth();
      chrome.runtime.sendMessage({ type: 'FROM_BACKGROUND_AUTH', payload: auth })
    }
  }
})