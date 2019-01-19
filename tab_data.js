const saveWindowData = (event) => {
    const clickedBtnId = parseInt(event.toElement.id);
    const windowData = currentWindowsData[clickedBtnId - 1];
    let isAlreadySaved = false;

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem("saved_window" + (i + 1)) == JSON.stringify(windowData)) {
            alert('Already saved! Please check the Saved Windows!');
            isAlreadySaved = true;
            break;
        }
    }

    if (!isAlreadySaved) {
        localStorage.setItem("saved_window" + (localStorage.length + 1), JSON.stringify(windowData));
        savedSectionData();
    }
}

const removeWindowData = (event) => {
    const clickedBtnId = parseInt(event.toElement.id);
    localStorage.removeItem("saved_window" + clickedBtnId);
    savedSectionData();
}


const loadWindow = (event) => {
    const clickedBtnId = parseInt(event.toElement.id);
    const clickedWindowTabs = JSON.parse(localStorage.getItem("saved_window" + clickedBtnId));
    let urls = [];
    for (let tabIdx = 0; tabIdx < clickedWindowTabs.length; tabIdx++) {
        const tab = clickedWindowTabs[tabIdx];
        urls.push(tab.url);
    }
    chrome.windows.create({ url: urls });
}
