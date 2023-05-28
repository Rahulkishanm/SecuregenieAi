import {
  getStoredPaths,
  getStoredOptions,
} from '../utils/storage'
// import { fetchOpenWeatherData } from '../utils/api'
chrome.runtime.onInstalled.addListener(() => {
  main()
})
chrome.contextMenus.onClicked.addListener((event) =>{
  if(event.menuItemId === 'parent'){
    return
  }
  chrome.tabs.create({
   url:`https://www.google.com/maps/dir/${event.menuItemId}/${event.selectionText}/`
  })
 })
 chrome.runtime.onMessage.addListener( (msg)=>{
  console.log("we got triggered")
  main()
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
  getStoredPaths().then((items)=>{
    let newItems = items
    if(items.length == 0){
      // newItems = ["Add starting place on the extension"]
    }
    chrome.contextMenus.removeAll(()=>{})
    chrome.contextMenus.create({
      title: 'Get directions',
      id: 'parent',
      contexts: ["page", "selection"]
  })
    for(let i=0;i<newItems.length;i++){
      chrome.contextMenus.create({
        title: 'From:  '+ newItems[i]+ '. To: the selected address.',
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
