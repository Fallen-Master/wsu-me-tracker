/* ==================================================================
   RAFAEL'S WSU ME TRACKER — ALL YOUR DATA LIVES HERE
   ------------------------------------------------------------------
   To mark a "Still Needed" course as done permanently, change its
   "status" from "needed" to "completed", add a "grade" and "term".
   (Or just tap it on the site — that saves on your phone/laptop.)
   Save the file, commit, push. The site updates in ~1 minute.
   ================================================================== */
const DATA = {
  totalCredits: 129,       // WSU BS Mechanical Engineering total
  creditsEarnedBase: 68,   // credits already earned & banked

  // ---- KPI cards ----
  kpis: [
    {label:"Credits earned",           value:"68", unit:"/ 129", cls:"gold"},
    {label:"Overall GPA",              value:"3.07"},
    {label:"Spring 2026 GPA",          value:"3.54", cls:"ok"},   // Dean's Honor Roll
    {label:"Transfers to WSU",         value:"~64", unit:"cr"},   // junior standing
    {label:"Remaining at WSU",         value:"~62–64", unit:"cr"},
    {label:"KS Gen-Ed",                value:"Complete", cls:"ok"},
  ],

  // ---- COURSES ----
  // status: "completed" | "progress" | "needed"
  // prio (needed only): "high" | "med" | "low"
  courses: [
    // ===== IN PROGRESS (Fall 2026) =====
    {id:"ma253", status:"progress", code:"MA 253", title:"Calc III w/ Analytic Geometry", credits:3,
     notes:"Current semester — Fall 2026."},

    // ===== STILL NEEDED (for WSU Mechanical Engineering) =====
    {id:"ph251", status:"needed", code:"PH 251", title:"Physics I + Lab", credits:5, prio:"high",
     notes:"Prereq Calc I (done). Foundation for Statics & Physics II."},
    {id:"ch110", status:"needed", code:"CH 110", title:"College Chemistry I + Lab", credits:4, prio:"high", verify:true,
     notes:"Ask advisor if CH 106 (grade A, done) already substitutes."},
    {id:"ma260", status:"needed", code:"MA 260", title:"Differential Equations", credits:3, prio:"med",
     notes:"Prereq Calc II (done)."},
    {id:"en102", status:"needed", code:"EN 102", title:"Engineering Graphics II", credits:3, prio:"med",
     notes:"Prereq EN 101 (done, grade A)."},
    {id:"ph252", status:"needed", code:"PH 252", title:"Physics II + Lab", credits:5, prio:"med",
     notes:"Prereq Physics I."},
    {id:"en260", status:"needed", code:"EN 260", title:"Statics", credits:3, prio:"med",
     notes:"Take with or after Physics I."},
    {id:"pl292", status:"needed", code:"PL 292", title:"Engineering Ethics", credits:3, prio:"low",
     notes:"Can take at Butler or WSU."},

    // ===== COMPLETED — Butler CC =====
    {id:"ec201", status:"completed", code:"EC 201", title:"Prin. of Macroeconomics", credits:3, grade:"A", term:"Sp 2026"},
    {id:"en101", status:"completed", code:"EN 101", title:"Engineering Graphics I", credits:3, grade:"A", term:"Sp 2026"},
    {id:"ma152", status:"completed", code:"MA 152", title:"Calc II w/ Analytic Geometry", credits:5, grade:"B", term:"Sp 2026"},
    {id:"sp100", status:"completed", code:"SP 100", title:"Public Speaking", credits:3, grade:"A", term:"Fa 2025"},
    {id:"ma151", status:"completed", code:"MA 151", title:"Calc I w/ Analytic Geometry", credits:5, grade:"B", term:"Fa 2025 (retaken)"},
    {id:"ma140", status:"completed", code:"MA 140", title:"Trigonometry", credits:3, grade:"A", term:"Su 2025 (retaken)"},
    {id:"eg101", status:"completed", code:"EG 101", title:"English Composition 1", credits:3, grade:"B", term:"Sp 2015"},
    {id:"eg102", status:"completed", code:"EG 102", title:"English Composition 2", credits:3, grade:"C", term:"Fa 2015"},
    {id:"sp100b", status:"completed", code:"BS 160", title:"General Psychology", credits:3, grade:"C", term:"Sp 2015"},
    {id:"ar100", status:"completed", code:"AR 100", title:"Art Appreciation", credits:3, grade:"B", term:"Sp 2015"},
    {id:"ba110", status:"completed", code:"BA 110", title:"Intro to Business", credits:3, grade:"B", term:"Fa 2015"},
    {id:"hs131", status:"completed", code:"HS 131", title:"US History 1", credits:3, grade:"B", term:"Fa 2015"},
    {id:"fw190", status:"completed", code:"FW 190", title:"Fitness for Life", credits:2, grade:"B", term:"Sp 2016"},
    {id:"eg060", status:"completed", code:"EG 060", title:"Fund. of English (dev)", credits:3, grade:"B", term:"Fa 2014"},

    // ===== COMPLETED — WSU Tech (transfer credit) =====
    {id:"ch106", status:"completed", code:"CH 106", title:"Intro Chem: Gen, Org, Biochem", credits:5, grade:"A", term:"Fa 2018 · WSU Tech"},
    {id:"ba104", status:"completed", code:"BA 104", title:"Info Processing Systems", credits:3, grade:"A", term:"Su 2017 · WSU Tech"},
    {id:"it100a", status:"completed", code:"IT 100.1", title:"Integrated Technology Elective", credits:4, grade:"A", term:"Sp 2017 · WSU Tech"},
    {id:"it100b", status:"completed", code:"IT 100.1", title:"Integrated Technology Elective", credits:4, grade:"A", term:"Sp 2017 · WSU Tech"},
    {id:"gn100b", status:"completed", code:"GN 100.1", title:"General Elective", credits:2, grade:"B", term:"Sp 2017 · WSU Tech"},
    {id:"it100c", status:"completed", code:"IT 100.1", title:"Integrated Technology Elective", credits:4, grade:"A", term:"Fa 2016 · WSU Tech"},
    {id:"gn100a", status:"completed", code:"GN 100.1", title:"General Elective", credits:4, grade:"A", term:"Fa 2016 · WSU Tech"},
  ],

  // ---- ROADMAP ----
  roadmap: [
    {term:"Spring 2027", note:"Butler · part-time", load:"8–9 cr",
     courses:[{name:"PH 251 Physics I + Lab",cr:"5 cr"},{name:"CH 110 College Chemistry I (if needed)",cr:"4 cr"}]},
    {term:"Summer 2027", note:"Butler · light load", load:"3–5 cr",
     courses:[{name:"MA 260 Differential Equations",cr:"3–5 cr"},{name:"— or — EN 102 Engineering Graphics II",cr:"3 cr"}]},
    {term:"Fall 2027", note:"Butler · part-time", load:"8 cr",
     courses:[{name:"PH 252 Physics II + Lab",cr:"5 cr"},{name:"EN 260 Statics",cr:"3 cr"}]},
    {term:"Spring 2028", note:"Butler · finish prereqs", load:"varies",
     courses:[{name:"Remaining Butler prereqs (EN 102 / PL 292)",cr:"3–6 cr"},{name:"Submit WSU transfer app for Fall 2028",cr:"—"}]},
    {term:"Fall 2028", note:"Transfer to WSU · junior standing", load:"part-time",
     courses:[{name:"Begin WSU ME upper-division coursework",cr:"6–9 cr"},{name:"Join AIAA / Shocker Racing",cr:"—"}]},
    {term:"2028 → ~2031–32", note:"WSU · part-time to finish", load:"~62–64 cr",
     courses:[{name:"Complete BS Mechanical Engineering",cr:"~62–64 cr"},{name:"Aerospace technical electives + senior design",cr:"—"}]},
    {term:"🎓 Graduation", note:"BS Mechanical Engineering", load:"129 cr", grad:true,
     courses:[{name:"Target aerospace internships: Spirit, Textron, Bombardier",cr:"→ SpaceX"}]},
  ],

  // ---- SEMESTER CHECKLIST ----
  // Everything to DO — aid, scholarships, registration, advising — by term.
  // Tap an item to check it off (saves on your device). Add items freely.
  // tag (optional): "deadline" | "aid" | "school" | "done"
  checklist: [
    {term:"Right Now · Fall 2026", note:"Current semester", items:[
      {id:"ck_fafsa2627", text:"FAFSA 2026–27 — filed ✓", done:true, tag:"done"},
      {id:"ck_advisor", text:"Email WSU Engineering advisor: part-time ME plan, CH 106→CH 110 substitution, which scholarships allow part-time, ME vs AE for a SpaceX goal", tag:"school"},
      {id:"ck_chsub", text:"Confirm with advisor: does CH 106 substitute for CH 110?", tag:"school"},
      {id:"ck_butler", text:"Meet Butler advisor — confirm courses match the 2026–27 WSU transfer guide", tag:"school"},
      {id:"ck_fafsa2728", text:"October: renew FAFSA for 2027–28 (opens Oct 1)", tag:"aid"},
      {id:"ck_wsusch_open", text:"Nov 1: WSU Engineering scholarship application opens — start it (90+ funds)", tag:"aid"},
      {id:"ck_reg_sp27", text:"Register for Spring 2027 — Physics I (+ CH 110 if needed)", tag:"school"},
    ]},
    {term:"Spring 2027", note:"Physics I + Chemistry", items:[
      {id:"ck_wsusch_due", text:"Mar 1: submit WSU Engineering scholarship application (deadline)", tag:"deadline"},
      {id:"ck_ksgrant2728", text:"Before Apr 1: apply for 2027–28 KS Comprehensive Grant (first-come, first-served)", tag:"deadline"},
      {id:"ck_reg_su27", text:"Register for Summer & Fall 2027", tag:"school"},
    ]},
    {term:"Summer 2027", note:"Light load", items:[
      {id:"ck_take_su27", text:"Take MA 260 Differential Equations or EN 102 Engineering Graphics II", tag:"school"},
    ]},
    {term:"Fall 2027", note:"Physics II + Statics", items:[
      {id:"ck_fafsa2829", text:"October: renew FAFSA for 2028–29", tag:"aid"},
      {id:"ck_wsusch_27", text:"Nov 1: WSU Engineering scholarships open again — apply", tag:"aid"},
      {id:"ck_reg_sp28", text:"Register for Spring 2028", tag:"school"},
    ]},
    {term:"Spring 2028", note:"Finish Butler prereqs + apply to transfer", items:[
      {id:"ck_wsusch_28", text:"Mar 1: WSU Engineering scholarship deadline", tag:"deadline"},
      {id:"ck_ksgrant2829", text:"Before Apr 1: apply for 2028–29 KS Comprehensive Grant", tag:"deadline"},
      {id:"ck_transfer_app", text:"Submit WSU transfer application for Fall 2028", tag:"deadline"},
      {id:"ck_reg_fa28", text:"Register for Fall 2028", tag:"school"},
    ]},
    {term:"Fall 2028 · Transfer to WSU", note:"Junior standing", items:[
      {id:"ck_wsu_advisor", text:"Meet WSU advisor — plan the upper-division ME course sequence", tag:"school"},
      {id:"ck_orgs", text:"Join AIAA and/or Shocker Racing (Formula SAE) for the aerospace résumé", tag:"school"},
    ]},
    {term:"Every year — don't forget", note:"Recurring deadlines", recurring:true, items:[
      {id:"ck_r_fafsa", text:"Renew FAFSA every October for the next school year", tag:"aid"},
      {id:"ck_r_ksgrant", text:"Apply for the KS Comprehensive Grant every year before April 1", tag:"aid"},
      {id:"ck_r_wsusch", text:"Apply for WSU Engineering scholarships every year (Nov 1 – Mar 1)", tag:"aid"},
    ]},
  ],

  // ---- CONTACTS ----
  contacts: [
    {who:"WSU Engineering Advising", email:"engineering.advising@wichita.edu", phone:"316-978-3400"},
    {who:"WSU Financial Aid", phone:"316-978-3430"},
    {who:"Butler Financial Aid", phone:"316-322-3143"},
    {who:"KS Board of Regents Scholarships", email:"scholars@ksbor.org", phone:"785-430-4300"},
  ],
};
