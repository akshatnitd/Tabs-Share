var save_btns = [];
var remove_btns = [];
var load_btns = [];

const initWindowsData = () => {
    let allWindowsData = [];
    chrome.windows.getAll((windowData) => {
        windowData.map((eachWindow) => {
            chrome.tabs.getAllInWindow(eachWindow.id, (tabs) => {
                allWindowsData.push(tabs);
            })
        });
    });
    return allWindowsData;
}

const createTabItemHTML = (title, linkUrl, favicon) => {
    return (`
        <a class="tab-item" href = "${linkUrl}">
            <div class="circle"><img src="${favicon}" /></div>
            <span id="tab_name_text">${title}</span>
        </a>
    `);
}

const createActionButtonsHTML = (sectionType, key) => {
    if (sectionType == 'current') {
        return `<button type="button" id="${key}" class="btn btn-primary btn-xs save_btn">Save</button>`;

    } else if (sectionType === 'saved') {
        return `<button type="button" id="${key}" class="btn btn-primary btn-xs load_btn">Load</button> <button type="button" id="${key}" class="btn btn-danger btn-xs remove_btn">Remove</button>`;
    }
}

const createWindowItemHTML = (key, sectionType, tabItemsHTML) => {
    return (`
        <div class="card" >
            <div class="card-header" id="window_${sectionType}_Heading_${key}">
                <div class="tab-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#window_${sectionType}_${key}" aria-expanded="false" aria-controls="window_${sectionType}_${key}">
                            ${sectionType === 'current' ? 'CURRENT' : 'SAVED'} WINDOW ${key}
                        </button>
                    </h5>
                    <div>
                        ${createActionButtonsHTML(sectionType, key)}
                    </div>
                </div>
            </div>
            <div id="window_${sectionType}_${key}" class="collapse" aria-labelledby="window_${sectionType}_Heading_${key}" data-parent="#accordion">
                <div class="card-body">
                    ${tabItemsHTML}
                </div>
            </div>
        </div>
    `);
}


const createSectionHTML = (allWindowsData, sectionType) => {
    const noOfWindows = allWindowsData.length;
    let sectionHTML = '';
    for (let winIdx = 0; winIdx < noOfWindows; winIdx++) {
        const windowData = allWindowsData[winIdx];
        const noOfTabs = windowData.length;
        let tabItemsHTML = '';
        for (let tabIdx = 0; tabIdx < noOfTabs; tabIdx++) {
            const tabData = windowData[tabIdx];
            const favicon = tabData.favIconUrl;
            let title = tabData.title, linkUrl = tabData.url;
            if (!linkUrl) linkUrl = '';
            if (!title) title = linkUrl;
            tabItemsHTML += createTabItemHTML(title, linkUrl, favicon);
        }
        sectionHTML += createWindowItemHTML(winIdx + 1, sectionType, tabItemsHTML);
    }
    return sectionHTML;
}


const currentActiveSectionData = () => {
    const sectionHTML = createSectionHTML(currentWindowsData, 'current');
    $('#current #accordion').html(sectionHTML);
};

const savedSectionData = () => {
    const totalSavedWindows = localStorage.length;
    let savedWindows = [];
    for (let idx = 0; idx < totalSavedWindows; idx++) {
        savedWindows.push(JSON.parse(localStorage.getItem("saved_window" + (idx + 1))));
    }
    const sectionHTML = createSectionHTML(savedWindows, 'saved');
    $('#saved #accordion').html(sectionHTML);
};


//Function calls
let currentWindowsData = initWindowsData();

setTimeout(() => {
    currentActiveSectionData();
    savedSectionData();

    $('.save_btn').on("click", (event) => {
        saveWindowData(event);
    });

    $('.remove_btn').on("click", (event) => {
        removeWindowData(event);
    });

    $('.load_btn').on("click", (event) => {
        loadWindow(event);
    });

}, 500);
