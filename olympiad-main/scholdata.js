const schooldata = [
  {
    wrong: "APARNA CHARAN CITY CORPORATION GIRLS  SCHOOL AND COLLEGE",
    right: "APARNA CHARAN CITYCORPORATION GIRLS SCHOOL AND COLLEGE",
  },
  {
    wrong: "APARNA CHARAN CITYCORPORATION GIRLS  SCHOOL AND COLLEGE",
    right: "APARNA CHARAN CITYCORPORATION GIRLS SCHOOL AND COLLEGE",
  },
  {
    wrong: "ARMED POLICE BATTALION PUBLIC SCHOOL",
    right: "ARMED POLICE BATTLION PUBLIC SCHOOL",
  },
  {
    wrong: "B A F  SHAHEEN COLLEGE  CHITTAGONG",
    right: "B A F SHAHEEN COLLEGE CHITTAGONG",
  },
  {
    wrong: "B A F  Shaheen College  Chittagong",
    right: "B A F SHAHEEN COLLEGE CHITTAGONG",
  },
  {
    wrong: "B A F SHAHEEN  COLLEGE CHITTAGONG",
    right: "B A F SHAHEEN COLLEGE CHITTAGONG",
  },
  {
    wrong: "BAKALI GOVT.  HIGH SCHOOL",
    right: "BAKOLIA GOVT. HIGH SCHOOL",
  },
  {
    wrong: "BANGLADESH RAILWAY GOVERNMENT HIGH SCHOOL,PAHARTALI",
    right: "BANGLADESH RAILWAY GOVT. HIGH SCHOOL",
  },
  {
    wrong: "BEPZA  PUBLIC   SCHOOL AND COLLEGE",
    right: "BEPZA PUBLIC SCHOOL AND COLLEGE",
  },
  {
    wrong: "BEPZA PUBLIC SCHOOL AND COLLEGE",
    right: "BEPZA PUBLIC SCHOOL AND COLLEGE",
  },
  {
    wrong: "Bangladesh Mohila Samiti Girls  High School And College",
    right: "BANGLADESH MOHILA SAMITI GIRLS HIGH SCHOOL AND COLLEGE",
  },
  {
    wrong: "Biam Laboratory (English Medium) School And College  Coxs Bazar",
    right: "B I A M LABORATORY SCHOOL AND COLLEGE COX'S BAZAR",
  },
  {
    wrong: "BANGLADESH MOHILA SAMITI GIRLS  HIGH SCHOOL AND COLLEGE",
    right: "BANGLADESH MOHILA SAMITI GIRLS HIGH SCHOOL AND COLLEGE",
  },
  {
    wrong: "CHITTAGONG GOVT. GIRL'S HIGH SCHOOL",
    right: "CHITTAGONG GOVT. GIRLS' HIGH SCHOOL",
  },
  {
    wrong: "CMP-school-and-collage",
    right: "CMP SCHOOL AND COLLEGE",
  },
  {
    wrong: "COX'S BAZAR HARVARD INTERNATIONAL COLLEGE",
    right: "COXS BAZAR HARVARD INTERNATIONAL COLLEGE",
  },
  {
    wrong: "COXS BAZAR  HARVARD INTERNATIONAL COLLEGE",
    right: "COXS BAZAR HARVARD INTERNATIONAL COLLEGE",
  },
  {
    wrong: "COX'S BAZAR GOVT. MOHILA COLLEGE",
    right: "COXS BAZAR GOVT. MAHILA COLLEGE",
  },
  {
    wrong: "Chattogram-Collegiate-School",
    right: "CHITTAGONG COLLEGIATE SCHOOL",
  },
  {
    wrong: "Chittagong Govt. Girls  College",
    right: "CHITTAGONG GOVT. GIRLS COLLEGE",
  },
  {
    wrong: "College Of Science  Business And Humanities",
    right: "COLLEGE OF SCIENCE BUSINESS AND HUMANITIES",
  },
  {
    wrong: "Coxs Bazar  Harvard International College",
    right: "COXS BAZAR HARVARD INTERNATIONAL COLLEGE",
  },
  {
    wrong: "Dulahazara  College",
    right: "DULAHAZARA COLLEGE",
  },
  {
    wrong: "FATICKCHARI DEGREE COLLEGE",
    right: "FATIKCHARI DEGREE COLLEGE",
  },
  {
    wrong: "GOVT.  CITY  COLLEGE,CTG (DAY  AND  NIGHT)",
    right: "CHITTAGONG GOVT. CITY COLLEGE",
  },
  {
    wrong: "GOVT. HAZI MOHAMMAD MOHSIN COLLEGE",
    right: "GOVT. HAZI MUHAMMAD MOHSIN COLLEGE",
  },
  {
    wrong: "GULTAZ  MEMORIAL  SCHOOL   &   COLLEGE",
    right: "GULTAJ MEMORIAL SCHOOL AND COLLEGE",
  },
  {
    wrong: "Government-Muslim-High-School",
    right: "GOVT. MUSLIM HIGH SCHOOL",
  },
  {
    wrong: "HAID CHAKIA MULTILATERAL HIGH SCHOOL AND COLLEGE",
    right: "HAIDCHAKIA MULTILATERAL HIGH SCHOOL AND COLLEGE",
  },
  {
    wrong: "HOSSEN AHMMAD CHY. CITY CORPORATION SCHOOL AND COLLEGE",
    right: "HOSSEN AHAMMED CHY. CITY CORPORATION SCHOOL AND COLLEGE",
  },
  {
    wrong: "Hatey Khari City Corporation  School And College",
    right: "HATEY KHARI CITY CORPORATION SCHOOL AND COLLEGE",
  },
  {
    wrong: "ISLAMIA DEGREE GOLLEGE",
    right: "ISLAMIA DEGREE COLLEGE",
  },
  {
    wrong: "JAFAR NAGAR A.C. HIGH SCHOOL",
    right: "JAFAR NAGAR A. C. HIGH SCHOOL",
  },
  {
    wrong: "JOBRA P. P. HIGH SCHOOL & COLLEGE",
    right: "JOBRA P. P. SCHOOL AND COLLEGE",
  },
  {
    wrong: "KADAL PUR HIGH SCHOOL",
    right: "KADALPUR SCHOOL AND COLLEGE",
  },
  {
    wrong: "KARNAPHULY  A J CHOWDHURY COLLEGE",
    right: "KARNAPHULY A J CHOWDHURY COLLEGE",
  },
  {
    wrong: "KATTALI CITY CORP. GIRLS  HIGH SCHOOL AND COLLEGE",
    right: "KATTALI CITY CORP. GIRLS HIGH SCHOOL AND COLLEGE",
  },
  {
    wrong: "KAZEM ALI  SCHOOL AND COLLEGE",
    right: "KAZEM ALI HIGH SCHOOL AND COLLEGE",
  },
  {
    wrong: "KULGAON CITY CORPORATION  SCHOOL",
    right: "KULGAON CITY CORP. HIGH SCHOOL",
  },
  {
    wrong: "Khagrachari Govt. College",
    right: "KHAGRACHARI GOVT. COLLEGE",
  },
  {
    wrong: "Khagrachari Govt. Mohila College",
    right: "KHAGRACHARI GOVT. MOHILA COLLEGE",
  },
  {
    wrong: "MOHILA COLLEGE  CHITTAGONG",
    right: "MOHILA COLLEGE CHITTAGONG",
  },
  {
    wrong: "MAHILA COLLEGE CHATTAGRAM",
    right: "MOHILA COLLEGE CHITTAGONG",
  },
  {
    wrong: "Mohila College  Chittagong",
    right: "MOHILA COLLEGE CHITTAGONG",
  },
  {
    wrong: "NAVY ANCHORAGE SCHOOL AND COLLEGE",
    right: "NAVY ANCHORAGE SCHOOL & COLLEGE",
  },
  {
    wrong: "PAHATALI COLLEGE",
    right: "PAHARTALI COLLEGE",
  },
  {
    wrong: "PRABARTAK SCHOOL AND COLLEGE",
    right: "PROBARTAK SCHOOL AND COLLEGE",
  },
  {
    wrong: "PROBORTOK SCHOOL AND COLLEGE",
    right: "PROBARTAK SCHOOL AND COLLEGE",
  },
  {
    wrong: "PATIYA GOVT COLLEGE",
    right: "PATIYA GOVT. COLLEGE",
  },
  {
    wrong: "PATIA GOVT. COLLEGE",
    right: "PATIYA GOVT. COLLEGE",
  },
  {
    wrong: "RAOJAN COLLEGE",
    right: "RAOZAN COLLEGE",
  },
  {
    wrong: "RAOZAN R.R.A.C MODEL HIGH SCHOOL",
    right: "RAOZAN R.R.A.C. MODEL GOVT. HIGH SCHOOL",
  },
  {
    wrong: "Raojan  College",
    right: "RAOZAN COLLEGE",
  },
  {
    wrong: "RAJA NAGAR R. A. B. M. HIGH SCHOO",
    right: "RAJA NAGAR R. A. B. M. HIGH SCHOOL",
  },
  {
    wrong: "ST. SCHOLASTICA GIRLS' HIGH SCHOOL",
    right: "ST. SCHOLASTICAS GIRLS HIGH SCHOOL & COLLEGE",
  },
  {
    wrong: "SUKBILAS HIGH SCHOOL",
    right: "SUKH BILAS HIGH SCHOOL",
  },
  {
    wrong: "Satkania Govt. College",
    right: "SATKANIA GOVT. COLLEGE",
  },
  {
    wrong: "UKHIYA COLLEGE",
    right: "UKHIA COLLEGE",
  },
  {
    wrong: "WEST KADHUR KHIL HIGH SCHOOL",
    right: "WEST KADHURKHIL SCHOOL AND COLLEGE",
  },
  {
    wrong: "WEST KADHURKHIL  SCHOOL AND COLLEGE",
    right: "WEST KADHURKHIL SCHOOL AND COLLEGE",
  },
  {
    wrong: "Wahidunnesa-Secondary-school",
    right: "WAHIDUNNESA SECONDARY SCHOOL",
  },
  {
    wrong: "BANDARBAN GOVT. WOMEN COLLEGE",
    right: "BANDARBAN GOVT. MOHILA COLLEGE",
  },
];

module.exports = {
  schooldata,
};
