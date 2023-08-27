import { useState } from "react"

import "@/style.css"

import { Button } from "./components/ui/button"

function IndexPopup() {
  const [windows, setWindows] = useState<chrome.windows.Window[]>([])
  chrome.windows.getAll({ populate: true }, (returnValue) => {
    setWindows(returnValue)
  })

  return (
    <div className="flex items-center justify-center w-40">
      {chrome.windows.WINDOW_ID_CURRENT}
      <ol className="">
        {windows.map((window) => (
          <li>
            <span className="text-lg">
              {window.id}{" "}
              <Button
                onClick={async (e) => {
                  const id = await chrome.tabs.group({
                    tabIds: window.tabs?.map((tab) => tab.id)
                  })

                  const idd = await chrome.tabGroups.update(id, {
                    title: "Hi",
                    collapsed: false,
                    color: "yellow"
                  })
                }}>
                Promote
              </Button>
            </span>
            <ol>
              {window.tabs?.map((tab) => (
                <li
                  className="text"
                  onClick={(e) => {
                    tab.active = true
                  }}>
                  {tab.title} {tab.active && "**"}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default IndexPopup
