
import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEYS = {
  done: "healthyAddaChecklistDone",
  hidden: "healthyAddaChecklistHidden",
  customNames: "healthyAddaChecklistCustomNames",
  removedHistory: "healthyAddaChecklistRemovedHistory",
};

const NEW_LINE = String.fromCharCode(10);
const TAB = String.fromCharCode(9);

const checklist = [
  {
    section: "1. Brand & Positioning",
    items: [
      "Finalize brand logo",
      "Finalize brand colors",
      "Finalize tagline",
      "Finalize cart visual theme",
      "Finalize menu design style",
      "Finalize packaging aesthetic",
      "Finalize brand fonts",
      "Create QR code branding",
    ],
  },
  {
    section: "2. Menu Finalization",
    groups: [
      {
        title: "Salads / Bowls",
        items: [
          "Finalize morning salads",
          "Finalize evening bowls",
          "Finalize plant-based protein bowl",
          "Finalize paneer-based protein bowl",
          "Finalize standardized serving size",
          "Finalize nutrition values",
          "Finalize pricing",
          "Finalize Gurgaon-based COGS",
          "Finalize ingredient quantities",
        ],
      },
      {
        title: "Juices",
        items: [
          "Finalize juice menu",
          "Finalize seasonal fruit combinations",
          "Finalize garnish strategy",
          "Finalize serving quantity",
          "Finalize pricing",
          "Finalize juice presentation style",
        ],
      },
      {
        title: "Shakes",
        items: [
          "Finalize shake menu",
          "Finalize protein shake recipes",
          "Finalize shake consistency",
          "Finalize pricing",
        ],
      },
      {
        title: "Dips",
        items: [
          "Finalize universal green dip",
          "Finalize yogurt-based dips",
          "Finalize dairy-free dips",
          "Finalize standardized recipes",
          "Finalize dip squeeze bottle system",
        ],
      },
    ],
  },
  {
    section: "3. Recipe Standardization",
    items: [
      "Standardize all recipes",
      "Standardize preparation steps",
      "Standardize ingredient measurements",
      "Standardize serving process",
      "Standardize garnish placement",
      "Standardize dip quantity",
      "Create prep SOPs",
      "Create worker training process",
    ],
  },
  {
    section: "4. Ingredient Procurement",
    items: [
      "Identify Gurgaon local mandi suppliers",
      "Identify Azadpur sourcing possibility",
      "Finalize paneer vendor",
      "Finalize fruit vendors",
      "Finalize dry-fruit/seed wholesaler",
      "Finalize packaging supplier",
      "Finalize ice supplier",
      "Finalize daily procurement schedule",
      "Create ingredient inventory sheet",
    ],
  },
  {
    section: "5. Cart Infrastructure",
    groups: [
      {
        title: "Cart Setup",
        items: [
          "Finalize cart structure",
          "Finalize counter layout",
          "Finalize storage layout",
          "Finalize lighting setup",
          "Finalize menu board placement",
          "Finalize branding board",
        ],
      },
      {
        title: "Internal Workflow",
        items: [
          "Finalize prep flow",
          "Finalize worker standing positions",
          "Finalize customer pickup point",
          "Finalize waste collection setup",
          "Finalize water setup",
        ],
      },
    ],
  },
  {
    section: "6. Equipment Purchase",
    groups: [
      {
        title: "Mandatory",
        items: [
          "Slow juicer",
          "Commercial blender",
          "Commercial knives",
          "Chopping boards",
          "Stainless steel GN pans",
          "Squeeze bottles",
          "Ice box",
          "Kitchen weighing scale",
          "Airtight containers",
          "Ice scoop",
          "Hand sanitizer setup",
          "Tissue dispenser",
          "Cleaning cloths",
        ],
      },
      {
        title: "Optional Later",
        items: ["Salad spinner", "Vegetable chopper", "Mini refrigeration", "Vacuum storage"],
      },
    ],
  },
  {
    section: "7. Packaging",
    items: [
      "Finalize bowl packaging",
      "Finalize juice cups",
      "Finalize shake bottles",
      "Finalize eco-friendly options",
      "Finalize spoon/fork",
      "Finalize branding stickers",
      "Finalize takeaway presentation",
    ],
  },
  {
    section: "8. Hygiene & Operations",
    items: [
      "Hand sanitizer placement",
      "Gloves strategy",
      "Hair cap/apron setup",
      "Cleaning SOP",
      "Ingredient washing SOP",
      "Waste disposal SOP",
      "Daily freshness checklist",
    ],
  },
  {
    section: "9. QR Ordering System",
    groups: [
      {
        title: "Customer Side",
        items: [
          "Finalize menu UI",
          "Finalize ordering flow",
          "Finalize queue system",
          "Finalize payment flow",
          "Finalize customization flow",
        ],
      },
      {
        title: "Worker Side",
        items: ["Finalize worker dashboard", "Finalize quick counter order flow", "Finalize order status flow"],
      },
      {
        title: "Admin Side",
        items: ["Finalize analytics dashboard", "Finalize export/download system", "Finalize Google Sheets backup"],
      },
    ],
  },
  {
    section: "10. Marketing & Launch",
    items: [
      "Instagram page",
      "Google Maps listing",
      "Launch offer",
      "Referral strategy",
      "Gym partnership strategy",
      "Morning sampling strategy",
      "Local influencer strategy",
      "Before/after branding photos",
      "Customer feedback process",
    ],
  },
  {
    section: "Future Functionality",
    groups: [
      {
        title: "Legal & Finance",
        items: [
          "Decide business name registration",
          "GST decision",
          "FSSAI registration",
          "UPI business setup",
          "Business bank account",
          "Daily expense tracking sheet",
          "Margin tracking sheet",
        ],
      },
      {
        title: "Data & Optimization",
        items: [
          "Track best sellers",
          "Track worst sellers",
          "Track peak timings",
          "Track repeat customers",
          "Track wastage",
          "Track ingredient spoilage",
          "Track average wait time",
          "Track customer preferences",
        ],
      },
      {
        title: "Future Scaling",
        items: [
          "Centralized dip prep",
          "Centralized protein prep",
          "Multi-cart strategy",
          "Worker training manual",
          "Franchise-style SOP",
          "Bulk procurement optimization",
        ],
      },
    ],
  },
  {
    section: "Immediate Priority Order",
    groups: [
      {
        title: "Phase 1 — Most Important",
        items: [
          "Finalize menu",
          "Finalize recipes",
          "Finalize COGS",
          "Finalize cart design",
          "Finalize equipment",
          "Physically test taste",
        ],
      },
      {
        title: "Phase 2",
        items: ["Build QR ordering system", "Finalize branding", "Finalize packaging", "Finalize vendor sourcing"],
      },
      {
        title: "Phase 3",
        items: ["Launch first cart", "Collect customer feedback", "Improve operations using data"],
      },
    ],
  },
];

function flattenTasks(source = checklist) {
  const rows = [];
  source.forEach((section, sectionIndex) => {
    if (section.items) {
      section.items.forEach((item, itemIndex) => {
        rows.push({ id: sectionIndex + "-main-" + itemIndex, section: section.section, group: "", item });
      });
    }
    if (section.groups) {
      section.groups.forEach((group, groupIndex) => {
        group.items.forEach((item, itemIndex) => {
          rows.push({ id: sectionIndex + "-" + groupIndex + "-" + itemIndex, section: section.section, group: group.title, item });
        });
      });
    }
  });
  return rows;
}

const allTasks = flattenTasks();

function storageGet(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Could not save checklist data", error);
  }
}

function groupKey(section, group) {
  return section + "|||" + group;
}

function isVisible(task, hidden) {
  return !hidden.sections[task.section] && !hidden.groups[groupKey(task.section, task.group)] && !hidden.tasks[task.id];
}

function escapeCsvValue(value) {
  const raw = String(value ?? "");
  return '"' + raw.replace(/"/g, '""') + '"';
}

function makeCsv(rows) {
  return rows.map((row) => row.map(escapeCsvValue).join(",")).join(NEW_LINE);
}

export default function App() {
  const [done, setDone] = useState({});
  const [hidden, setHidden] = useState({ sections: {}, groups: {}, tasks: {} });
  const [customNames, setCustomNames] = useState({});
  const [removedHistory, setRemovedHistory] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [query, setQuery] = useState("");
  const [showHidden, setShowHidden] = useState(false);
  const [csvPreview, setCsvPreview] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [sheetMessage, setSheetMessage] = useState("");
  const [sheetPreview, setSheetPreview] = useState("");
  const [open, setOpen] = useState(() => Object.fromEntries(checklist.map((section) => [section.section, true])));

  useEffect(() => {
    setDone(storageGet(STORAGE_KEYS.done, {}));
    setHidden(storageGet(STORAGE_KEYS.hidden, { sections: {}, groups: {}, tasks: {} }));
    setCustomNames(storageGet(STORAGE_KEYS.customNames, {}));
    setRemovedHistory(storageGet(STORAGE_KEYS.removedHistory, []));
  }, []);

  useEffect(() => storageSet(STORAGE_KEYS.done, done), [done]);
  useEffect(() => storageSet(STORAGE_KEYS.hidden, hidden), [hidden]);
  useEffect(() => storageSet(STORAGE_KEYS.customNames, customNames), [customNames]);
  useEffect(() => storageSet(STORAGE_KEYS.removedHistory, removedHistory), [removedHistory]);

  const getTaskLabel = (taskId, fallback) => customNames[taskId] || fallback;
  const visibleTaskCount = allTasks.filter((task) => isVisible(task, hidden)).length;
  const completed = allTasks.filter((task) => done[task.id] && isVisible(task, hidden)).length;
  const progress = visibleTaskCount ? Math.round((completed / visibleTaskCount) * 100) : 0;
  const hiddenCount =
    Object.values(hidden.sections).filter(Boolean).length +
    Object.values(hidden.groups).filter(Boolean).length +
    Object.values(hidden.tasks).filter(Boolean).length;

  const startEditTask = (taskId, label) => {
    setEditingTaskId(taskId);
    setEditValue(label);
  };

  const saveEditTask = (taskId) => {
    const cleaned = editValue.trim();
    if (!cleaned) return;
    setCustomNames((prev) => ({ ...prev, [taskId]: cleaned }));
    setEditingTaskId(null);
    setEditValue("");
  };

  const hideSection = (sectionName) => {
    if (hidden.sections[sectionName]) return;
    setRemovedHistory((prev) => [...prev, { type: "section", key: sectionName, label: sectionName }]);
    setHidden((prev) => ({ ...prev, sections: { ...prev.sections, [sectionName]: true } }));
  };

  const hideGroup = (sectionName, groupName) => {
    const key = groupKey(sectionName, groupName);
    if (hidden.groups[key]) return;
    setRemovedHistory((prev) => [...prev, { type: "group", key, label: sectionName + " > " + groupName }]);
    setHidden((prev) => ({ ...prev, groups: { ...prev.groups, [key]: true } }));
  };

  const hideTask = (taskId) => {
    if (hidden.tasks[taskId]) return;
    const task = allTasks.find((row) => row.id === taskId);
    setRemovedHistory((prev) => [...prev, { type: "task", key: taskId, label: task ? getTaskLabel(taskId, task.item) : taskId }]);
    setHidden((prev) => ({ ...prev, tasks: { ...prev.tasks, [taskId]: true } }));
  };

  const restoreLastHidden = () => {
    setRemovedHistory((prevHistory) => {
      const last = prevHistory[prevHistory.length - 1];
      if (!last) return prevHistory;

      setHidden((prevHidden) => {
        if (last.type === "section") {
          const nextSections = { ...prevHidden.sections };
          delete nextSections[last.key];
          return { ...prevHidden, sections: nextSections };
        }
        if (last.type === "group") {
          const nextGroups = { ...prevHidden.groups };
          delete nextGroups[last.key];
          return { ...prevHidden, groups: nextGroups };
        }
        const nextTasks = { ...prevHidden.tasks };
        delete nextTasks[last.key];
        return { ...prevHidden, tasks: nextTasks };
      });
      return prevHistory.slice(0, -1);
    });
  };

  const restoreAllHidden = () => {
    setHidden({ sections: {}, groups: {}, tasks: {} });
    setRemovedHistory([]);
  };

  const removeHiddenFromSection = (section) => {
    if (showHidden) return section;
    if (hidden.sections[section.section]) return null;

    const directItems = section.items
      ? section.items.filter((item) => {
          const task = allTasks.find((row) => row.section === section.section && row.item === item && !row.group);
          return task && !hidden.tasks[task.id];
        })
      : undefined;

    const groups = section.groups
      ? section.groups
          .filter((group) => !hidden.groups[groupKey(section.section, group.title)])
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => {
              const task = allTasks.find((row) => row.section === section.section && row.group === group.title && row.item === item);
              return task && !hidden.tasks[task.id];
            }),
          }))
          .filter((group) => group.items.length > 0)
      : undefined;

    if ((!directItems || directItems.length === 0) && (!groups || groups.length === 0)) return null;
    return { ...section, items: directItems, groups };
  };

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const base = checklist.map(removeHiddenFromSection).filter(Boolean);
    if (!normalizedQuery) return base;

    return base
      .map((section) => {
        const directItems = (section.items || []).filter((item) => {
          const task = allTasks.find((row) => row.section === section.section && row.item === item && !row.group);
          const label = getTaskLabel(task ? task.id : "", item);
          return label.toLowerCase().includes(normalizedQuery) || section.section.toLowerCase().includes(normalizedQuery);
        });

        const groups = (section.groups || [])
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => {
              const task = allTasks.find((row) => row.section === section.section && row.group === group.title && row.item === item);
              const label = getTaskLabel(task ? task.id : "", item);
              return (
                label.toLowerCase().includes(normalizedQuery) ||
                group.title.toLowerCase().includes(normalizedQuery) ||
                section.section.toLowerCase().includes(normalizedQuery)
              );
            }),
          }))
          .filter((group) => group.items.length > 0);

        return { ...section, items: directItems.length ? directItems : undefined, groups: groups.length ? groups : undefined };
      })
      .filter((section) => section.items || section.groups);
  }, [query, hidden, showHidden, customNames]);

  const buildCSV = () => {
    const rows = [["Section", "Group", "Task", "Status", "Visibility"]];
    allTasks.forEach((task) => {
      rows.push([
        task.section,
        task.group,
        getTaskLabel(task.id, task.item),
        done[task.id] ? "Done" : "Pending",
        isVisible(task, hidden) ? "Visible" : "Hidden",
      ]);
    });
    return makeCsv(rows);
  };

  const buildGoogleSheetsTable = () => {
    const rows = [["Section", "Subsection", "Task", "Done", "Visibility", "Owner", "Notes"]];
    allTasks.forEach((task) => {
      rows.push([
        task.section,
        task.group,
        getTaskLabel(task.id, task.item),
        done[task.id] ? "TRUE" : "FALSE",
        isVisible(task, hidden) ? "Visible" : "Hidden",
        "",
        "",
      ]);
    });
    return rows
      .map((row) => row.map((value) => String(value ?? "").replace(new RegExp(TAB, "g"), " ")).join(TAB))
      .join(NEW_LINE);
  };

  const copyGoogleSheetsTable = async () => {
    const table = buildGoogleSheetsTable();
    setSheetPreview(table);
    try {
      await window.navigator.clipboard.writeText(table);
      setSheetMessage("Copied. Open Google Sheets, click cell A1, and paste. Your completed tasks will appear as TRUE/FALSE.");
    } catch {
      setSheetMessage("Browser blocked auto-copy. Click inside the table box below, press Cmd/Ctrl + A, then copy and paste into Google Sheets cell A1.");
    }
  };

  const exportCSV = () => {
    const csv = buildCSV();
    setCsvPreview(csv);
    setCopyMessage("CSV generated. Copy it from the box below and paste into Google Sheets or Excel.");
  };

  const copyCSV = async () => {
    const csv = csvPreview || buildCSV();
    setCsvPreview(csv);
    try {
      await window.navigator.clipboard.writeText(csv);
      setCopyMessage("Copied CSV to clipboard.");
    } catch {
      setCopyMessage("Copy failed. Select the text and copy manually.");
    }
  };

  const renderTask = (taskId, item) => {
    const taskHidden = hidden.tasks[taskId];
    const label = getTaskLabel(taskId, item);

    return (
      <div key={taskId} className={"task " + (taskHidden ? "hidden" : done[taskId] ? "done" : "")}>
        {editingTaskId === taskId ? (
          <div className="edit-row">
            <input
              value={editValue}
              onChange={(event) => setEditValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveEditTask(taskId);
                if (event.key === "Escape") {
                  setEditingTaskId(null);
                  setEditValue("");
                }
              }}
              autoFocus
            />
            <button onClick={() => saveEditTask(taskId)} className="btn green">Save</button>
            <button
              onClick={() => {
                setEditingTaskId(null);
                setEditValue("");
              }}
              className="btn"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setDone((prev) => ({ ...prev, [taskId]: !prev[taskId] }))} className="task-main">
            <span className="check">{done[taskId] ? "✓" : ""}</span>
            <span className="task-label">{label}</span>
          </button>
        )}

        {editingTaskId !== taskId && (
          <button onClick={() => startEditTask(taskId, label)} className="small-btn" title="Edit this option name">
            Edit
          </button>
        )}

        <button onClick={() => hideTask(taskId)} disabled={taskHidden} className="small-btn red" title="Remove this option">
          {taskHidden ? "Hidden" : "Remove"}
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="wrap">
        <div className="hero">
          <div className="hero-top">
            <div>
              <div className="badge">📋 Healthy Adda Execution Tracker</div>
              <h1>Cart Business Checklist</h1>
              <p>Click tasks when done. Edit names, remove tasks or sections you do not need. Your progress is saved in this browser automatically.</p>
            </div>

            <div className="progress-card">
              <div className="label">Overall Progress</div>
              <div className="num">{progress}%</div>
              <div className="bar"><div className="bar-fill" style={{ width: progress + "%" }} /></div>
              <div>{completed} of {visibleTaskCount} visible tasks done</div>
              {hiddenCount > 0 && <div className="label">{hiddenCount} removed/hidden</div>}
            </div>
          </div>

          <div className="controls">
            <div className="search">
              <span>🔍</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks..." />
            </div>
            <button onClick={() => setShowHidden((value) => !value)} className="btn orange">
              {showHidden ? "Hide Removed" : "Show Removed (" + hiddenCount + ")"}
            </button>
            <button onClick={restoreLastHidden} disabled={removedHistory.length === 0} className="btn light-green">
              Undo Last Removed
            </button>
            <button onClick={restoreAllHidden} className="btn">Restore All</button>
            <button onClick={copyGoogleSheetsTable} className="btn green">📋 Copy for Google Sheets</button>
            <button onClick={exportCSV} className="btn dark">⬇️ Export CSV</button>
            <button onClick={() => setDone({})} className="btn">↺ Reset Done</button>
          </div>

          {sheetMessage && (
            <div className="message">
              {sheetMessage}
              {sheetPreview && (
                <div>
                  <textarea readOnly value={sheetPreview} onFocus={(event) => event.target.select()} />
                  <div>Manual method: click box above → Cmd/Ctrl + A → Cmd/Ctrl + C → Google Sheets → click A1 → paste.</div>
                </div>
              )}
            </div>
          )}

          {csvPreview && (
            <div className="csv-box">
              <div className="csv-head">
                <div>
                  <strong>CSV ready</strong>
                  <p>{copyMessage}</p>
                </div>
                <div>
                  <button onClick={copyCSV} className="btn green">Copy CSV</button>
                  <button onClick={() => { setCsvPreview(""); setCopyMessage(""); }} className="btn">Close</button>
                </div>
              </div>
              <textarea readOnly value={csvPreview} onFocus={(event) => event.target.select()} />
            </div>
          )}
        </div>

        <div className="sections">
          {filteredSections.map((section, sectionIndex) => {
            const sectionHidden = hidden.sections[section.section];
            return (
              <div key={section.section} className={"section " + (sectionHidden ? "hidden" : "")}>
                <div className="section-head">
                  <button onClick={() => setOpen((prev) => ({ ...prev, [section.section]: !prev[section.section] }))} className="title">
                    <h2>{section.section}</h2>
                    <span>{open[section.section] ? "⌄" : "›"}</span>
                  </button>
                  <button onClick={() => hideSection(section.section)} disabled={sectionHidden} className="btn light-green">
                    {sectionHidden ? "Hidden" : "Remove Section"}
                  </button>
                </div>

                {open[section.section] && (
                  <div className="section-body">
                    {section.items && (
                      <div className="grid">
                        {section.items.map((item) => {
                          const original = allTasks.find((row) => row.section === section.section && row.item === item && !row.group);
                          return renderTask(original ? original.id : sectionIndex + "-x-" + item, item);
                        })}
                      </div>
                    )}

                    {section.groups && (
                      <div>
                        {section.groups.map((group) => {
                          const gKey = groupKey(section.section, group.title);
                          const groupHidden = hidden.groups[gKey];
                          return (
                            <div key={group.title} className={"group " + (groupHidden ? "hidden" : "")}>
                              <div className="group-head">
                                <h3>{group.title}</h3>
                                <button onClick={() => hideGroup(section.section, group.title)} disabled={groupHidden} className="small-btn red">
                                  {groupHidden ? "Hidden" : "Remove Subsection"}
                                </button>
                              </div>
                              <div className="grid">
                                {group.items.map((item) => {
                                  const original = allTasks.find((row) => row.section === section.section && row.group === group.title && row.item === item);
                                  return renderTask(original ? original.id : section.section + "-" + group.title + "-" + item, item);
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
