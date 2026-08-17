/* ==================================================================
   RAFAEL'S WSU ME TRACKER — ALL YOUR DATA LIVES HERE
   ------------------------------------------------------------------
   HOW THE PERCENTAGE WORKS NOW (this is the big change):

   Progress is NOT "every credit I ever earned / 128".
   Progress is "credits that actually FILL A DEGREE REQUIREMENT / 128".

   That's how WSU's transfer portal gets 38%. Credits you earned that
   don't slot into a required bucket (Intro to Business, Fitness for
   Life, the CATIA courses, WSU Tech electives) are real credits — WSU
   accepts them — but they do NOT move the degree-completion number.
   They're listed at the bottom under `extras` so you can see them.

   TO ADD A CLASS: just use the "+ Add a class" button on the site.
   It saves on your phone/laptop. No need to edit this file or ask
   Claude. Edit this file only if you want a change baked into the
   repo permanently.
   ================================================================== */
const DATA = {
  program: "BS Mechanical Engineering · Wichita State University",
  catalogYear: "2026–27",
  totalCredits: 128,

  /* ---- REQUIREMENT BUCKETS ----
     req    = credits the degree requires in this bucket
     The five buckets add up to exactly 128. No double-counting. */
  buckets: [
    {id:"englcomm", name:"English & Communication",        req:9,  blurb:"ENGL 101, ENGL 102, COMM 111"},
    {id:"gened",    name:"General Education Electives",     req:23, blurb:"WSU gen-ed buckets 3–7: math/stats, natural science, social & behavioral, arts & humanities, institutionally designated — your transcript shows KS Systemwide Gen Ed COMPLETE"},
    {id:"mathsci",  name:"Engineering Math & Natural Sciences", req:30, blurb:"Calc I–III, Diff Eq, College Chemistry I, Physics 1 & 2"},
    {id:"engcore",  name:"Engineering Core (ME)",           req:51, blurb:"Graphics and Statics through senior capstone — the actual ME degree"},
    {id:"techelec", name:"Technical Electives",             req:15, blurb:"Mechanical design, manufacturing, thermal & energy systems"},
  ],

  /* ---- ENGINEERING+ / APPLIED LEARNING (0 credits, still required) ---- */
  nonCredit: [
    {id:"eplus",   name:"Engineering+ Requirements", detail:"3 of 7 activities · chair approval", done:false},
    {id:"applied", name:"Applied Learning Experience", detail:"Satisfied by ME 662 Senior Capstone Design", done:false},
  ],

  /* ==================================================================
     COURSES
     bucket : which requirement it fills ("" = fills nothing, see extras)
     status : "completed" | "progress" | "needed"
     applies: true  = WSU has confirmed this fills a requirement
              false = earned, but fills no requirement (doesn't count)
     ================================================================== */
  courses: [
    // ---------- ENGLISH & COMMUNICATION (9/9 — DONE) ----------
    {id:"eg101",  bucket:"englcomm", status:"completed", applies:true, code:"EG 101", title:"English Composition 1", wsu:"ENGL 101", credits:3, grade:"B", term:"Sp 2015"},
    {id:"eg102",  bucket:"englcomm", status:"completed", applies:true, code:"EG 102", title:"English Composition 2", wsu:"ENGL 102", credits:3, grade:"C", term:"Fa 2015"},
    {id:"sp100",  bucket:"englcomm", status:"completed", applies:true, code:"SP 100", title:"Public Speaking", wsu:"COMM 111", credits:3, grade:"A", term:"Fa 2025"},

    // ---------- GENERAL EDUCATION ELECTIVES (18/20) ----------
    {id:"ma140",  bucket:"gened", status:"completed", applies:true, code:"MA 140", title:"Trigonometry", wsu:"Gen Ed: Math & Statistics", credits:3, grade:"A", term:"Su 2025 (retaken)"},
    {id:"ec201",  bucket:"gened", status:"completed", applies:true, code:"EC 201", title:"Prin. of Macroeconomics", wsu:"Gen Ed: Social & Behavioral", credits:3, grade:"A", term:"Sp 2026"},
    {id:"bs160",  bucket:"gened", status:"completed", applies:true, code:"BS 160", title:"General Psychology", wsu:"Gen Ed: Social & Behavioral", credits:3, grade:"C", term:"Sp 2015"},
    {id:"ar100",  bucket:"gened", status:"completed", applies:true, code:"AR 100", title:"Art Appreciation", wsu:"Gen Ed: Arts & Humanities", credits:3, grade:"B", term:"Sp 2015"},
    {id:"hs131",  bucket:"gened", status:"completed", applies:true, code:"HS 131", title:"US History 1", wsu:"Gen Ed: Arts & Humanities", credits:3, grade:"B", term:"Fa 2015"},
    {id:"ba104",  bucket:"gened", status:"completed", applies:true, code:"BA 104", title:"Info Processing Systems", wsu:"CED 115 Computer Applications", credits:3, grade:"A", term:"Su 2017 · WSU Tech"},
    {id:"ch106",  bucket:"gened", status:"completed", applies:true, code:"CH 106", title:"Intro Chem: Gen, Org, Biochem", wsu:"Gen Ed Bucket #4: Natural & Physical Sciences", credits:5, grade:"A", term:"Fa 2018 · WSU Tech",
     notes:"IMPORTANT: WSU's portal applied this to the GENERAL EDUCATION science bucket — not to the engineering chemistry requirement. The official Butler→WSU engineering guide requires CH 110 College Chemistry I for Mechanical Engineering, so CH 110 is still on your list below."},
    // ---------- ENGINEERING MATH & NATURAL SCIENCES (18/30) ----------
    {id:"ma151",  bucket:"mathsci", status:"completed", applies:true, code:"MA 151", title:"Calc I w/ Analytic Geometry", wsu:"MATH 242 Calculus I", credits:5, grade:"B", term:"Fa 2025 (retaken)"},
    {id:"ma152",  bucket:"mathsci", status:"completed", applies:true, code:"MA 152", title:"Calc II w/ Analytic Geometry", wsu:"MATH 243 Calculus II", credits:5, grade:"B", term:"Sp 2026"},
    {id:"ch110",  bucket:"mathsci", status:"needed", applies:true, code:"CH 110", title:"College Chemistry I + Lab", wsu:"CHEM 211 General Chemistry I + lab", credits:5, prio:"high", verify:true,
     notes:"The official 2026–27 Butler→WSU engineering guide names CH 110 for Mechanical Engineering. Your CH 106 went to the gen-ed science bucket instead. Ask an advisor whether CH 106 can substitute — if it can, this drops off and you save a 5-credit class."},
    {id:"ma253",  bucket:"mathsci", status:"progress", applies:true, code:"MA 253", title:"Calc III w/ Analytic Geometry", wsu:"MATH 344 Calculus III", credits:3, term:"Fall 2026",
     notes:"In progress right now. WSU's portal is already counting it."},
    {id:"ma260",  bucket:"mathsci", status:"needed", applies:true, code:"MA 260", title:"Differential Equations", wsu:"MATH 555 Differential Equations I", credits:3, prio:"med",
     notes:"Butler equivalent. Prereq Calc II (done)."},
    {id:"ph251",  bucket:"mathsci", status:"needed", applies:true, code:"PH 251", title:"Physics 1", wsu:"PHYS 313 Physics for Scientists I + PHYS 315 lab", credits:5, prio:"high",
     notes:"Butler's PH 251 is a 5-credit course WITH the lab built in — it covers both WSU courses. Biggest unlock you have: gates Statics, Physics II, and most of the ME core."},
    {id:"ph252",  bucket:"mathsci", status:"needed", applies:true, code:"PH 252", title:"Physics 2", wsu:"PHYS 314 Physics for Scientists II", credits:5, prio:"med",
     notes:"Also 5 credits at Butler. WSU's PHYS 314 is only 4, so 1 credit comes over as extra. Prereq Physics 1."},

    // ---------- ENGINEERING CORE (4/54) ----------
    {id:"en101",  bucket:"engcore", status:"completed", applies:true, code:"EN 101", title:"Engineering Graphics I", wsu:"IME 222 + 222L Engineering Graphics", credits:3, grade:"A", term:"Sp 2026",
     notes:"WSU's portal shows 4 credits here because it also picks up EN 102 from your WSU Tech record — your Butler transcript only has the 3."},
    {id:"en102",  bucket:"engcore", status:"completed", applies:true, code:"EN 102", title:"Engineering Graphics II", wsu:"IME 222 + 222L Engineering Graphics", credits:1, grade:"—", term:"WSU Tech", verify:true,
     notes:"WSU's portal reports EN 101 + EN 102 as 4 credits transferred. Your Butler transcript shows EN 101 at 3, so EN 102 is the remaining 1 credit and came from your WSU Tech record. Worth confirming with an advisor."},
    {id:"ae223",  bucket:"engcore", status:"needed", applies:true, code:"EN 260", title:"Statics", wsu:"AE 223 Statics", credits:3, prio:"high",
     notes:"Take it AT BUTLER — confirmed on the official 2026–27 WSU engineering transfer guide. Much cheaper than AE 223 at WSU. Take with or after Physics 1."},
    {id:"ae333",  bucket:"engcore", status:"needed", applies:true, code:"AE 333", title:"Mechanics of Materials", credits:3, prio:"med", notes:"WSU · prereq Statics."},
    {id:"ece282", bucket:"engcore", status:"needed", applies:true, code:"ECE 282", title:"Circuits I + Lab", credits:4, prio:"med", notes:"WSU · prereq Physics II."},
    {id:"me250",  bucket:"engcore", status:"needed", applies:true, code:"ME 250", title:"Materials Engineering", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me251",  bucket:"engcore", status:"needed", applies:true, code:"ME 251", title:"Materials Engineering Lab", credits:1, prio:"low", notes:"WSU · pairs with ME 250."},
    {id:"me325",  bucket:"engcore", status:"needed", applies:true, code:"ME 325", title:"Numerical Methods for Engineers", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me335",  bucket:"engcore", status:"needed", applies:true, code:"ME 335", title:"Dynamics for Mechanical Engineers", credits:3, prio:"low", notes:"WSU · prereq Statics."},
    {id:"me339",  bucket:"engcore", status:"needed", applies:true, code:"ME 339", title:"Design of Machinery", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me398",  bucket:"engcore", status:"needed", applies:true, code:"ME 398", title:"Thermodynamics I", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me439",  bucket:"engcore", status:"needed", applies:true, code:"ME 439", title:"Mechanical Engineering Design I", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me475",  bucket:"engcore", status:"needed", applies:true, code:"ME 475", title:"Integrated Design & Manufacturing", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me521",  bucket:"engcore", status:"needed", applies:true, code:"ME 521", title:"Fluid Mechanics", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me522",  bucket:"engcore", status:"needed", applies:true, code:"ME 522", title:"Heat Transfer", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me533",  bucket:"engcore", status:"needed", applies:true, code:"ME 533", title:"Mechanical Engineering Laboratory", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me633",  bucket:"engcore", status:"needed", applies:true, code:"ME 633", title:"ME Systems Laboratory", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me659",  bucket:"engcore", status:"needed", applies:true, code:"ME 659", title:"Mechanical Control Systems", credits:3, prio:"low", notes:"WSU upper division."},
    {id:"me662",  bucket:"engcore", status:"needed", applies:true, code:"ME 662", title:"Senior Capstone Design", credits:3, prio:"low",
     notes:"Also satisfies the Applied Learning Experience requirement."},
    {id:"phil385",bucket:"engcore", status:"needed", applies:true, code:"PL 292", title:"Engineering Ethics", wsu:"PHIL 385 Engineering Ethics", credits:3, prio:"med",
     notes:"Take it AT BUTLER — confirmed on the official 2026–27 WSU engineering transfer guide. No prereqs, so it's the easiest credit on your list to bank early."},

    // ---------- TECHNICAL ELECTIVES (0/15) ----------
    {id:"te_mdes", bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Mechanical Design Elective", credits:3, prio:"low",
     notes:"Pick 1: ME 541 / ME 637 / ME 729 / ME 749."},
    {id:"te_mfg",  bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Design & Manufacturing Elective", credits:3, prio:"low",
     notes:"Pick 1: ME 672 / ME 680 / ME 737 Robotics / ME 761 Autonomous Vehicles / ME 762 Composites."},
    {id:"te_th1",  bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Thermal Systems Elective #1", credits:3, prio:"low",
     notes:"Pick from ME 502 / 602 / 625 / 690 / 702 / 740 / 770 / 782."},
    {id:"te_th2",  bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Thermal Systems Elective #2", credits:3, prio:"low",
     notes:"Same list as above — ME 782 CFD is the aerospace-friendly pick."},
    {id:"te_energy",bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Energy Systems Design Elective", credits:3, prio:"low",
     notes:"Pick 1: ME 644 HVAC / ME 671 Fluid Machinery / ME 731 Heat Exchangers / ME 745 Thermal Systems."},
  ],

  /* ==================================================================
     EARNED BUT DOESN'T COUNT TOWARD THE DEGREE
     These are real credits WSU accepts (they're on your transcript and
     they help your GPA and full-time status) — but they don't fill any
     BSME requirement, so they don't move the percentage.
     THIS IS THE 55% vs 38% GAP.
     ================================================================== */
  extras: [
    {code:"IT 100.1 ×3",  title:"Integrated Technology Electives (WSU Tech)", credits:12,
     why:"This is where your CATIA and Blueprint Reading work landed — Butler recorded it as generic technology elective credit. WSU accepts it, but it fills no BSME requirement."},
    {code:"GN 100.1 ×2",  title:"General Electives (WSU Tech)", credits:5,
     why:"Generic transfer credit — no requirement match. Shown as 5 rather than 6 because 1 of those credits is EN 102 Engineering Graphics II, itemized above where it actually counts."},
    {code:"BA 110",       title:"Intro to Business", credits:3,
     why:"Business elective. Counted toward your Business Administration AS, not the BSME."},
    {code:"FW 190",       title:"Fitness for Life", credits:2,
     why:"There's no PE requirement in the BSME."},
    {code:"EG 060 · EC 200", title:"Fund. of English (developmental) · Micro Econ (F, then WD)", credits:0,
     why:"Zero degree credit — developmental and a failed/withdrawn attempt."},
  ],

  /* ==================================================================
     SEMESTER PLAN — the starting plan, every remaining credit assigned.
     You can edit all of this ON THE SITE (drag-free: arrows and menus).
     Your edits are saved on your device and override this seed.
     "Reset plan" on the site brings you back to exactly this.
     Paced at ~6–8 credits/semester — part-time, sustainable, working.
     ================================================================== */
  planSeed: [
    {id:"fa26", name:"Fall 2026",    note:"Butler · right now",            courses:["ma253"]},
    {id:"sp27", name:"Spring 2027",  note:"Butler · the big unlock",       courses:["ph251","phil385"]},
    {id:"su27", name:"Summer 2027",  note:"Butler · light",                courses:["ma260"]},
    {id:"fa27", name:"Fall 2027",    note:"Butler",                        courses:["ph252","ae223"]},
    {id:"sp28", name:"Spring 2028",  note:"Butler · last term · apply to transfer", courses:["ch110"]},
    {id:"fa28", name:"Fall 2028",    note:"→ WSU · junior standing",       courses:["ae333","me250","me251"]},
    {id:"sp29", name:"Spring 2029",  note:"WSU",                           courses:["ece282","me335"]},
    {id:"fa29", name:"Fall 2029",    note:"WSU",                           courses:["me398","me325"]},
    {id:"sp30", name:"Spring 2030",  note:"WSU",                           courses:["me339","me521"]},
    {id:"fa30", name:"Fall 2030",    note:"WSU",                           courses:["me522","me439"]},
    {id:"sp31", name:"Spring 2031",  note:"WSU",                           courses:["me533","me659"]},
    {id:"fa31", name:"Fall 2031",    note:"WSU",                           courses:["me475","me633"]},
    {id:"sp32", name:"Spring 2032",  note:"WSU · electives begin",         courses:["te_th1","te_mdes"]},
    {id:"fa32", name:"Fall 2032",    note:"WSU",                           courses:["te_th2","te_mfg"]},
    {id:"sp33", name:"Spring 2033",  note:"WSU · capstone 🎓",             courses:["te_energy","me662"]},
  ],

  /* ---- SEMESTER CHECKLIST ---- */
  checklist: [
    {term:"Right Now · Fall 2026", note:"Current semester", items:[
      {id:"ck_fafsa2627", text:"FAFSA 2026–27 — filed ✓", done:true, tag:"done"},
      {id:"ck_advisor", text:"Email WSU Engineering advisor: part-time ME plan, CH 106→CHEM 211 substitution, which scholarships allow part-time", tag:"school"},
      {id:"ck_geneed", text:"Ask advisor: KS Systemwide Gen Ed is complete — does that clear the last 2 gen-ed elective credits?", tag:"school"},
      {id:"ck_en102", text:"Ask advisor: does EN 101 alone satisfy IME 222 + 222L, or do you still need EN 102?", tag:"school"},
      {id:"ck_butler", text:"Meet Butler advisor — confirm courses match the 2026–27 WSU transfer guide", tag:"school"},
      {id:"ck_fafsa2728", text:"October: renew FAFSA for 2027–28 (opens Oct 1)", tag:"aid"},
      {id:"ck_wsusch_open", text:"Nov 1: WSU Engineering scholarship application opens — start it (90+ funds)", tag:"aid"},
      {id:"ck_reg_sp27", text:"Register for Spring 2027 — Physics I is the priority", tag:"school"},
    ]},
    {term:"Spring 2027", note:"Physics I + Ethics", items:[
      {id:"ck_wsusch_due", text:"Mar 1: submit WSU Engineering scholarship application (deadline)", tag:"deadline"},
      {id:"ck_ksgrant2728", text:"Before Apr 1: apply for 2027–28 KS Comprehensive Grant (first-come, first-served)", tag:"deadline"},
      {id:"ck_reg_su27", text:"Register for Summer & Fall 2027", tag:"school"},
    ]},
    {term:"Summer 2027", note:"Light load", items:[
      {id:"ck_take_su27", text:"Take MA 260 Differential Equations", tag:"school"},
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
      {id:"ck_wsu_advisor", text:"Meet WSU advisor — plan the upper-division ME sequence", tag:"school"},
      {id:"ck_eplus", text:"Start the Engineering+ requirement — 3 of 7 activities, needs chair approval", tag:"school"},
      {id:"ck_orgs", text:"Join AIAA and/or Shocker Racing (Formula SAE) for the aerospace résumé", tag:"school"},
    ]},
    {term:"Every year — don't forget", note:"Recurring deadlines", recurring:true, items:[
      {id:"ck_r_fafsa", text:"Renew FAFSA every October for the next school year", tag:"aid"},
      {id:"ck_r_ksgrant", text:"Apply for the KS Comprehensive Grant every year before April 1", tag:"aid"},
      {id:"ck_r_wsusch", text:"Apply for WSU Engineering scholarships every year (Nov 1 – Mar 1)", tag:"aid"},
    ]},
  ],

  /* ---- STATS shown in the KPI row ---- */
  stats: {
    gpaOverall: "3.07",
    gpaRecent: "3.54",
    gpaRecentLabel: "Spring 2026 GPA",
    totalEarnedAllCredits: 68,
  },

  /* ---- CONTACTS ---- */
  contacts: [
    {who:"WSU Engineering Advising", email:"engineering.advising@wichita.edu", phone:"316-978-3400"},
    {who:"WSU Financial Aid", phone:"316-978-3430"},
    {who:"Butler Financial Aid", phone:"316-322-3143"},
    {who:"KS Board of Regents Scholarships", email:"scholars@ksbor.org", phone:"785-430-4300"},
  ],
};
