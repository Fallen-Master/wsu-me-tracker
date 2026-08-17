/* ==================================================================
   RAFAEL'S WSU ME TRACKER — ALL YOUR DATA LIVES HERE
   ------------------------------------------------------------------
   Every credit hour below was verified against official sources:
     · WSU 2026-27 catalog course lists (catalog.wichita.edu)
     · WSU ME advising check sheet + 2026 degree map
     · Butler official course outlines (documents.butlercc.edu)
     · WSU 2026-27 Butler CC engineering transfer guide

   HOW THE PERCENTAGE WORKS:
   Progress is NOT "every credit I ever earned / 128". It is
   "credits that actually FILL A DEGREE REQUIREMENT / 128" — the
   same way WSU's transfer portal computes it.
   ================================================================== */
const DATA = {
  program: "BS Mechanical Engineering · Wichita State University",
  catalogYear: "2026–27",
  totalCredits: 128,

  /* ---- REQUIREMENT BUCKETS (sum to exactly 128) ---- */
  buckets: [
    {id:"englcomm", name:"English & Communication",             req:9,  blurb:"ENGL 101, ENGL 102, COMM 111"},
    {id:"gened",    name:"General Education Electives",         req:23, blurb:"Math/stats, natural science, social & behavioral, arts & humanities, institutionally designated"},
    {id:"mathsci",  name:"Engineering Math & Natural Sciences", req:30, blurb:"Calc I–III, Differential Equations, General Chemistry I, Physics I & II"},
    {id:"engcore",  name:"Engineering Core (ME)",               req:48, blurb:"Graphics and Statics through senior capstone — the actual ME degree"},
    {id:"techelec", name:"Technical Electives",                 req:18, blurb:"Mechanical design, manufacturing, thermal systems, energy systems, plus one open technical elective"},
  ],

  nonCredit: [
    {id:"eplus",   name:"Engineering+ Requirements", detail:"3 of 7 activities · chair approval", done:false},
    {id:"applied", name:"Applied Learning Experience", detail:"Satisfied by ME 662 Senior Capstone Design", done:false},
  ],

  /* ==================================================================
     COURSES
     bucket : which requirement it fills ("" = fills nothing)
     status : "completed" | "progress" | "needed"
     applies: true = fills a requirement; false = earned but counts for nothing
     ================================================================== */
  courses: [
    // ---------- ENGLISH & COMMUNICATION (9/9 — DONE) ----------
    {id:"eg101",  bucket:"englcomm", status:"completed", applies:true, code:"EG 101", title:"English Composition 1", wsu:"ENGL 101", credits:3, grade:"B", term:"Sp 2015"},
    {id:"eg102",  bucket:"englcomm", status:"completed", applies:true, code:"EG 102", title:"English Composition 2", wsu:"ENGL 102", credits:3, grade:"C", term:"Fa 2015"},
    {id:"sp100",  bucket:"englcomm", status:"completed", applies:true, code:"SP 100", title:"Public Speaking", wsu:"COMM 111", credits:3, grade:"A", term:"Fa 2025"},

    // ---------- GENERAL EDUCATION ELECTIVES (23/23 — DONE) ----------
    {id:"ma140",  bucket:"gened", status:"completed", applies:true, code:"MA 140", title:"Trigonometry", wsu:"Gen Ed Bucket #3: Math & Statistics", credits:3, grade:"A", term:"Su 2025 (retaken)"},
    {id:"ch106",  bucket:"gened", status:"completed", applies:true, code:"CH 106", title:"Intro Chem: Gen, Org, Biochem", wsu:"Gen Ed Bucket #4: Natural & Physical Sciences", credits:5, grade:"A", term:"Fa 2018 · WSU Tech",
     notes:"WSU applied this to the GENERAL EDUCATION science bucket — NOT to the engineering chemistry requirement. You still need CH 110 (below) unless an advisor substitutes this."},
    {id:"ec201",  bucket:"gened", status:"completed", applies:true, code:"EC 201", title:"Prin. of Macroeconomics", wsu:"Gen Ed Bucket #5: Social & Behavioral", credits:3, grade:"A", term:"Sp 2026"},
    {id:"bs160",  bucket:"gened", status:"completed", applies:true, code:"BS 160", title:"General Psychology", wsu:"Gen Ed Bucket #5: Social & Behavioral", credits:3, grade:"C", term:"Sp 2015",
     notes:"Butler has renumbered this to PY 160 — same course, same 3 credits."},
    {id:"ar100",  bucket:"gened", status:"completed", applies:true, code:"AR 100", title:"Art Appreciation", wsu:"Gen Ed Bucket #6: Arts & Humanities", credits:3, grade:"B", term:"Sp 2015"},
    {id:"hs131",  bucket:"gened", status:"completed", applies:true, code:"HS 131", title:"US History 1", wsu:"Gen Ed Bucket #6: Arts & Humanities", credits:3, grade:"B", term:"Fa 2015"},
    {id:"ba104",  bucket:"gened", status:"completed", applies:true, code:"BA 104", title:"Info Processing Systems", wsu:"CED 115 Computer Applications (Bucket #7)", credits:3, grade:"A", term:"Su 2017 · WSU Tech"},

    // ---------- ENGINEERING MATH & NATURAL SCIENCES (13/30) ----------
    {id:"ma151",  bucket:"mathsci", status:"completed", applies:true, code:"MA 151", title:"Calc I w/ Analytic Geometry", wsu:"MATH 242 Calculus I (5 cr)", credits:5, grade:"B", term:"Fa 2025 (retaken)"},
    {id:"ma152",  bucket:"mathsci", status:"completed", applies:true, code:"MA 152", title:"Calc II w/ Analytic Geometry", wsu:"MATH 243 Calculus II (5 cr)", credits:5, grade:"B", term:"Sp 2026"},
    {id:"ma253",  bucket:"mathsci", status:"progress",  applies:true, code:"MA 253", title:"Calc III w/ Analytic Geometry", wsu:"MATH 344 Calculus III (3 cr)", credits:3, term:"Fall 2026",
     notes:"In progress right now. WSU's portal is already counting it."},
    {id:"ma260",  bucket:"mathsci", status:"needed", applies:true, code:"MA 260", title:"Differential Equations", wsu:"MATH 555 Differential Equations I (3 cr)", credits:3, prio:"med",
     notes:"Take at Butler. Prereq Calc II (done)."},
    {id:"ch110",  bucket:"mathsci", status:"needed", applies:true, code:"CH 110", title:"College Chemistry I (lab included)", wsu:"CHEM 211 General Chemistry I (5 cr, lab bundled)", credits:5, prio:"high", verify:true,
     notes:"Named on the official Butler→WSU engineering guide for Mechanical Engineering. Single 5-credit course with the lab built in. ASK YOUR ADVISOR whether your CH 106 can substitute — if it can, this whole class disappears."},
    {id:"ph251",  bucket:"mathsci", status:"needed", applies:true, code:"PH 251", title:"Physics 1 (lab included)", wsu:"PHYS 313 Physics for Scientists I + PHYS 315 lab (5 cr)", credits:5, prio:"high",
     notes:"Single 5-credit course at Butler — 3 hrs lecture + 3 hrs lab per week, no separate lab to register for. Biggest unlock you have: gates Statics, Physics 2, and most of the ME core."},
    {id:"ph252",  bucket:"mathsci", status:"needed", applies:true, code:"PH 252", title:"Physics 2 (lab included)", wsu:"PHYS 314 Physics for Scientists II (4 cr)", credits:5, prio:"med",
     notes:"Also a single 5-credit course with lab. WSU's PHYS 314 is only 4 credits, so 1 credit comes over as surplus. WSU does not require a Physics II lab. Prereq Physics 1."},

    // ---------- ENGINEERING CORE (3/48) ----------
    {id:"en101",  bucket:"engcore", status:"completed", applies:true, code:"EN 101", title:"Engineering Graphics 1", wsu:"IME 222 Engineering Graphics (2 cr) + IME 222L lab (1 cr)", credits:3, grade:"A", term:"Sp 2026"},
    {id:"en102",  bucket:"engcore", status:"needed", applies:true, code:"EN 102", title:"Engineering Graphics 2", wsu:"Completes IME 222 + 222L", credits:3, prio:"med", verify:true,
     notes:"3 credits at Butler — verified from Butler's official course outline. It is NOT on your Butler transcript, so you almost certainly still need it. WSU's portal reports the EN 101 / EN 102 pair as 4 credits transferred, which doesn't match either course cleanly — worth one question to an advisor."},
    {id:"ae223",  bucket:"engcore", status:"needed", applies:true, code:"EN 260", title:"Statics", wsu:"AE 223 Statics (3 cr)", credits:3, prio:"high",
     notes:"Take it AT BUTLER — on the official WSU engineering transfer guide, and far cheaper than AE 223. Take with or after Physics 1."},
    {id:"phil385",bucket:"engcore", status:"needed", applies:true, code:"PL 292", title:"Engineering Ethics", wsu:"PHIL 385 Engineering Ethics (3 cr)", credits:3, prio:"med",
     notes:"Take it AT BUTLER — on the official transfer guide. No prereqs, so it's the easiest 3 credits on your entire list. Bank it early."},
    {id:"ae333",  bucket:"engcore", status:"needed", applies:true, code:"AE 333", title:"Mechanics of Materials", credits:3, prio:"med", notes:"WSU · prereq Statics."},
    {id:"ece282", bucket:"engcore", status:"needed", applies:true, code:"ECE 282", title:"Circuits I (lab bundled)", credits:4, prio:"med", notes:"WSU · 4 credits including the corequisite lab. Prereq Physics 2."},
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
     notes:"The finish line. Also satisfies the Applied Learning Experience requirement."},

    // ---------- TECHNICAL ELECTIVES (0/18) ----------
    {id:"te_mdes",  bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Mechanical Design Elective", credits:3, prio:"low",
     notes:"Pick 1: ME 541 / ME 637 Computer-Aided Engineering / ME 729 / ME 749 Finite Element Methods."},
    {id:"te_mfg",   bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Design & Manufacturing Elective", credits:3, prio:"low",
     notes:"Pick 1: ME 672 Composites / ME 680 Laser Processing / ME 737 Robotics / ME 761 Autonomous Vehicles / ME 762 Polymeric Composites."},
    {id:"te_th1",   bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Thermal Systems Elective #1", credits:3, prio:"low",
     notes:"Pick from ME 502 / 602 / 625 / 690 / 702 / 740 / 770 / 782."},
    {id:"te_th2",   bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Thermal Systems Elective #2", credits:3, prio:"low",
     notes:"Same list. ME 782 (Computational Fluid Dynamics) is the aerospace-friendly pick."},
    {id:"te_energy",bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Energy Systems Design Elective", credits:3, prio:"low",
     notes:"Pick 1: ME 644 HVAC / ME 671 Fluid Machinery / ME 731 Heat Exchangers / ME 745 Thermal Systems."},
    {id:"te_open",  bucket:"techelec", status:"needed", applies:true, code:"TECH ELEC", title:"Open Technical Elective", credits:3, prio:"low",
     notes:"Requires advisor consent. Good place to aim something aerospace."},
  ],

  /* ==================================================================
     EARNED BUT DOESN'T COUNT TOWARD THE DEGREE — 23 credits
     ================================================================== */
  extras: [
    {code:"IT 100.1 ×3",  title:"Integrated Technology Electives (WSU Tech)", credits:12,
     why:"This is where your CATIA and Blueprint Reading work landed — Butler recorded it as generic technology elective credit. WSU accepts it, but it fills no BSME requirement."},
    {code:"GN 100.1 ×2",  title:"General Electives (WSU Tech)", credits:6,
     why:"Generic transfer credit — no requirement match in the ME plan."},
    {code:"BA 110",       title:"Intro to Business", credits:3,
     why:"Business elective. Counted toward your Business Administration AS, not the BSME."},
    {code:"HP 190",       title:"Fitness for Life", credits:2,
     why:"No PE requirement in the BSME. (Butler now codes this HP 190; older transcripts show FW 190.)"},
    {code:"EG 060 · EC 200", title:"Fund. of English (developmental) · Micro Econ (F, then WD)", credits:0,
     why:"Zero degree credit — developmental, and a failed then withdrawn attempt."},
  ],

  /* ==================================================================
     SEMESTER PLAN — every remaining class placed, ~6–8 cr/term.
     Fully editable on the Planner page.
     ================================================================== */
  planSeed: [
    {id:"fa26", name:"Fall 2026",   note:"Butler · right now",                  courses:["ma253"]},
    {id:"sp27", name:"Spring 2027", note:"Butler · the big unlock",             courses:["ph251","phil385"]},
    {id:"su27", name:"Summer 2027", note:"Butler · light",                      courses:["ma260"]},
    {id:"fa27", name:"Fall 2027",   note:"Butler",                              courses:["ph252","ae223"]},
    {id:"sp28", name:"Spring 2028", note:"Butler · last term · apply to WSU",   courses:["ch110","en102"]},
    {id:"fa28", name:"Fall 2028",   note:"→ WSU · junior standing",             courses:["ae333","me250","me251"]},
    {id:"sp29", name:"Spring 2029", note:"WSU",                                 courses:["ece282","me335"]},
    {id:"fa29", name:"Fall 2029",   note:"WSU",                                 courses:["me398","me325"]},
    {id:"sp30", name:"Spring 2030", note:"WSU",                                 courses:["me339","me521"]},
    {id:"fa30", name:"Fall 2030",   note:"WSU",                                 courses:["me522","me439"]},
    {id:"sp31", name:"Spring 2031", note:"WSU",                                 courses:["me533","me659"]},
    {id:"fa31", name:"Fall 2031",   note:"WSU",                                 courses:["me475","me633"]},
    {id:"sp32", name:"Spring 2032", note:"WSU · electives begin",               courses:["te_th1","te_mdes"]},
    {id:"su32", name:"Summer 2032", note:"WSU · light",                         courses:["te_open"]},
    {id:"fa32", name:"Fall 2032",   note:"WSU",                                 courses:["te_th2","te_mfg"]},
    {id:"sp33", name:"Spring 2033", note:"WSU · capstone 🎓",                   courses:["te_energy","me662"]},
  ],

  /* ---- SEMESTER CHECKLIST ---- */
  checklist: [
    {term:"Right Now · Fall 2026", note:"Current semester", items:[
      {id:"ck_fafsa2627", text:"FAFSA 2026–27 — filed ✓", done:true, tag:"done"},
      {id:"ck_chsub", text:"TOP PRIORITY — email advisor: can CH 106 substitute for CH 110 College Chemistry I? Worth 5 credits and a whole semester slot.", tag:"school"},
      {id:"ck_en102", text:"Ask advisor: WSU reports EN 101 + EN 102 as 4 credits but both are 3 at Butler. Do you still need EN 102 to close IME 222 + 222L?", tag:"school"},
      {id:"ck_advisor", text:"Email WSU Engineering advisor: part-time ME plan, and which scholarships allow part-time enrollment", tag:"school"},
      {id:"ck_geneed", text:"Ask advisor: KS Systemwide Gen Ed shows COMPLETE — does that fully close gen-ed buckets 3–7?", tag:"school"},
      {id:"ck_butler", text:"Meet Butler advisor — confirm EN 260 Statics and PL 292 Ethics are offered when you need them", tag:"school"},
      {id:"ck_fafsa2728", text:"October: renew FAFSA for 2027–28 (opens Oct 1)", tag:"aid"},
      {id:"ck_wsusch_open", text:"Nov 1: WSU Engineering scholarship application opens — start it (90+ funds)", tag:"aid"},
      {id:"ck_reg_sp27", text:"Register for Spring 2027 — PH 251 Physics 1 is the priority", tag:"school"},
    ]},
    {term:"Spring 2027", note:"Physics 1 + Ethics", items:[
      {id:"ck_wsusch_due", text:"Mar 1: submit WSU Engineering scholarship application (deadline)", tag:"deadline"},
      {id:"ck_ksgrant2728", text:"Before Apr 1: apply for 2027–28 KS Comprehensive Grant (first-come, first-served)", tag:"deadline"},
      {id:"ck_reg_su27", text:"Register for Summer & Fall 2027", tag:"school"},
    ]},
    {term:"Summer 2027", note:"Light load", items:[
      {id:"ck_take_su27", text:"Take MA 260 Differential Equations", tag:"school"},
    ]},
    {term:"Fall 2027", note:"Physics 2 + Statics", items:[
      {id:"ck_fafsa2829", text:"October: renew FAFSA for 2028–29", tag:"aid"},
      {id:"ck_wsusch_27", text:"Nov 1: WSU Engineering scholarships open again — apply", tag:"aid"},
      {id:"ck_reg_sp28", text:"Register for Spring 2028", tag:"school"},
    ]},
    {term:"Spring 2028", note:"Last Butler term + transfer application", items:[
      {id:"ck_wsusch_28", text:"Mar 1: WSU Engineering scholarship deadline", tag:"deadline"},
      {id:"ck_ksgrant2829", text:"Before Apr 1: apply for 2028–29 KS Comprehensive Grant", tag:"deadline"},
      {id:"ck_transfer_app", text:"Submit WSU transfer application for Fall 2028", tag:"deadline"},
      {id:"ck_reg_fa28", text:"Register for Fall 2028 at WSU", tag:"school"},
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

  stats: {
    gpaOverall: "3.07",
    gpaRecent: "3.54",
    gpaRecentLabel: "Spring 2026 GPA",
  },

  contacts: [
    {who:"WSU Engineering Advising", email:"engineering.advising@wichita.edu", phone:"316-978-3400"},
    {who:"WSU Financial Aid", phone:"316-978-3430"},
    {who:"Butler Financial Aid", phone:"316-322-3143"},
    {who:"KS Board of Regents Scholarships", email:"scholars@ksbor.org", phone:"785-430-4300"},
  ],
};
