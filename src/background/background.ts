import {
  getStoredPaths,
  getStoredOptions,
} from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  main()
})
chrome.contextMenus.onClicked.addListener((event,tab) =>{
  if(event.menuItemId === 'parent'){
    return
  }
  chrome.storage.session.set({ prompt: event.menuItemId +" (->) "+ event.selectionText });
  chrome.sidePanel.open({ tabId: tab.id });
 })




function main() {
  getStoredPaths().then((items)=>{
    let newItems = items
    if(items.length == 0){
      // newItems = ["Add task on from the popup"]
    }
    chrome.contextMenus.removeAll(()=>{})
    chrome.contextMenus.create({
      title: 'Ask AI',
      id: 'parent',
      contexts: ["page", "selection"]
  })
    for(let i=0;i<newItems.length;i++){
      chrome.contextMenus.create({
        title: newItems[i]+ ' (->) The chosen text will be substituted here.`',
        id: newItems[i],
        parentId:'parent',
        contexts: ["page", "selection"]
    })
  }

  })
}


chrome.runtime.onMessage.addListener( async (message, sender, sendResponse)=>{
  main()
})