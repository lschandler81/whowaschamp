import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Comprehensive wrestler data with all major champions
const ALL_WWE_CHAMPIONS = [
  // WWWF/WWE Champions (1963-present)
  {
    name: "Buddy Rogers",
    realName: "Herman Gustav Rohde Jr.",
    nickname: "Nature Boy",
    hometown: "Camden, New Jersey",
    height: "6'0\"",
    weight: "235 lbs",
    debut: "1939-07-04",
    retirement: "1992-01-01",
    finisher: "Figure Four Leglock",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWWF Championship", reigns: 1, days: 22, year: 1963 }
    ],
    bio: "The original 'Nature Boy' and first WWWF Champion, setting the template for wrestling superstars."
  },
  {
    name: "Bruno Sammartino",
    realName: "Bruno Leopoldo Francesco Sammartino",
    nickname: "The Living Legend",
    hometown: "Pizzoferrato, Italy",
    height: "5'10\"",
    weight: "265 lbs",
    debut: "1959-12-10",
    retirement: "1987-08-29",
    finisher: "Bear Hug",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWWF Championship", reigns: 2, days: 4040, year: 1963 }
    ],
    bio: "The longest-reigning WWE Champion in history, holding the title for over 11 years combined across two reigns."
  },
  {
    name: "Ivan Koloff",
    realName: "Oreal Donald Perras",
    nickname: "The Russian Bear",
    hometown: "Moscow, Russia",
    height: "5'8\"",
    weight: "298 lbs",
    debut: "1961-01-01",
    retirement: "2006-01-01",
    finisher: "Bear Hug",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWWF Championship", reigns: 1, days: 21, year: 1971 }
    ],
    bio: "The man who ended Bruno Sammartino's first legendary title reign at Madison Square Garden."
  },
  {
    name: "Pedro Morales",
    realName: "Pedro Antonio Morales",
    nickname: "The Puerto Rican Champion",
    hometown: "Culebra, Puerto Rico",
    height: "5'10\"",
    weight: "224 lbs",
    debut: "1959-01-01",
    retirement: "1987-01-01",
    finisher: "Boston Crab",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWWF Championship", reigns: 1, days: 1027, year: 1971 },
      { title: "WWWF Intercontinental Championship", reigns: 1, days: 425, year: 1980 }
    ],
    bio: "First Triple Crown Champion in WWE history, beloved by fans worldwide."
  },
  {
    name: "Stan Stasiak",
    realName: "George Emile Stipich",
    nickname: "The Crusher",
    hometown: "Portland, Oregon",
    height: "6'1\"",
    weight: "270 lbs",
    debut: "1958-01-01",
    retirement: "1984-01-01",
    finisher: "Heart Punch",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWWF Championship", reigns: 1, days: 9, year: 1973 }
    ],
    bio: "Transitional champion who briefly held the WWWF Championship between Pedro Morales and Bruno Sammartino."
  },
  {
    name: "Superstar Billy Graham",
    realName: "Eldridge Wayne Coleman",
    nickname: "Superstar",
    hometown: "Paradise Valley, Arizona",
    height: "6'4\"",
    weight: "275 lbs",
    debut: "1970-01-01",
    retirement: "1987-01-01",
    finisher: "Bear Hug",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWWF Championship", reigns: 1, days: 296, year: 1977 }
    ],
    bio: "Charismatic champion who inspired future superstars like Hulk Hogan with his physique and personality."
  },
  {
    name: "Bob Backlund",
    realName: "Robert Lee Backlund",
    nickname: "All-American",
    hometown: "Princeton, Minnesota",
    height: "6'1\"",
    weight: "234 lbs",
    debut: "1973-08-14",
    retirement: "2007-01-01",
    finisher: "Crossface Chickenwing",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWWF Championship", reigns: 2, days: 2138, year: 1978 }
    ],
    bio: "Clean-cut All-American hero who held the WWWF Championship for nearly 6 years."
  },
  {
    name: "The Iron Sheik",
    realName: "Hossein Khosrow Ali Vaziri",
    nickname: "The Iron Sheik",
    hometown: "Tehran, Iran",
    height: "6'0\"",
    weight: "258 lbs",
    debut: "1972-01-01",
    retirement: "2019-01-01",
    finisher: "Camel Clutch",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWF Championship", reigns: 1, days: 28, year: 1983 }
    ],
    bio: "The man who ended Bob Backlund's long reign and put the title on Hulk Hogan to start the golden era."
  },
  {
    name: "Andre the Giant",
    realName: "André René Roussimoff",
    nickname: "The Eighth Wonder of the World",
    hometown: "Grenoble, France",
    height: "7'4\"",
    weight: "520 lbs",
    debut: "1964-01-01",
    retirement: "1992-12-01",
    finisher: "Bear Hug",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWF Championship", reigns: 1, days: 1, year: 1988 }
    ],
    bio: "The most famous giant in wrestling history and one of the first global wrestling superstars."
  },
  {
    name: "Randy Savage",
    realName: "Randy Mario Poffo",
    nickname: "Macho Man",
    hometown: "Columbus, Ohio",
    height: "6'2\"",
    weight: "237 lbs",
    debut: "1973-01-01",
    retirement: "2004-01-01",
    finisher: "Flying Elbow",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWF Championship", reigns: 2, days: 371, year: 1988 },
      { title: "WCW World Heavyweight Championship", reigns: 4, days: 188, year: 1995 }
    ],
    bio: "Colorful superstar known for his flamboyant personality, 'Oh yeah!' catchphrase, and relationship with Miss Elizabeth."
  },
  {
    name: "Ultimate Warrior",
    realName: "James Brian Hellwig",
    nickname: "The Ultimate Warrior",
    hometown: "Parts Unknown",
    height: "6'2\"",
    weight: "275 lbs",
    debut: "1985-06-25",
    retirement: "1998-01-01",
    finisher: "Gorilla Press Slam",
    era: "Golden",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWF Championship", reigns: 1, days: 293, year: 1990 }
    ],
    bio: "High-energy superstar who defeated Hulk Hogan at WrestleMania VI in a title vs title match."
  },
  {
    name: "Sgt. Slaughter",
    realName: "Robert Rudolph Remus",
    nickname: "America's Drill Instructor",
    hometown: "South Carolina",
    height: "6'6\"",
    weight: "310 lbs",
    debut: "1972-01-01",
    retirement: "2004-01-01",
    finisher: "Cobra Clutch",
    era: "Golden",
    promotions: ["WWE"],
    championships: [
      { title: "WWF Championship", reigns: 1, days: 64, year: 1991 }
    ],
    bio: "Military-themed character who captured the WWE Championship during the Gulf War storyline."
  },
  {
    name: "Yokozuna",
    realName: "Rodney Agatupu Anoaʻi",
    nickname: "The Yokozuna",
    hometown: "Polynesia",
    height: "6'4\"",
    weight: "641 lbs",
    debut: "1984-01-01",
    retirement: "1998-10-01",
    finisher: "Banzai Drop",
    era: "New Generation",
    promotions: ["WWE"],
    championships: [
      { title: "WWF Championship", reigns: 2, days: 280, year: 1993 }
    ],
    bio: "Sumo wrestling champion who dominated WWE in the early 1990s with his incredible size and athleticism."
  },
  {
    name: "Bret Hart",
    realName: "Bret Sergeant Hart",
    nickname: "The Hitman",
    hometown: "Calgary, Alberta, Canada",
    height: "6'0\"",
    weight: "234 lbs",
    debut: "1976-01-01",
    retirement: "2010-01-01",
    finisher: "Sharpshooter",
    era: "New Generation",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWF Championship", reigns: 5, days: 654, year: 1992 },
      { title: "WCW World Heavyweight Championship", reigns: 2, days: 118, year: 1999 }
    ],
    bio: "Excellence of execution and technical wrestling master from the legendary Hart wrestling family."
  },
  {
    name: "Diesel",
    realName: "Kevin Scott Nash",
    nickname: "Big Daddy Cool",
    hometown: "Detroit, Michigan",
    height: "6'10\"",
    weight: "356 lbs",
    debut: "1990-01-01",
    retirement: "2020-01-26",
    finisher: "Jackknife Powerbomb",
    era: "New Generation",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWF Championship", reigns: 1, days: 358, year: 1994 }
    ],
    bio: "Big Daddy Cool who held the WWE Championship for nearly a full year during the New Generation Era."
  },
  {
    name: "Sycho Sid",
    realName: "Sidney Raymond Eudy",
    nickname: "The Master and Ruler of the World",
    hometown: "West Memphis, Arkansas",
    height: "6'9\"",
    weight: "317 lbs",
    debut: "1987-01-01",
    retirement: "2017-01-01",
    finisher: "Powerbomb",
    era: "New Generation",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWF Championship", reigns: 2, days: 63, year: 1996 },
      { title: "WCW World Heavyweight Championship", reigns: 2, days: 77, year: 1999 }
    ],
    bio: "Psychotic powerhouse who ruled the wrestling world with an iron fist and devastating powerbomb."
  },
  {
    name: "Kane",
    realName: "Glenn Thomas Jacobs",
    nickname: "The Big Red Machine",
    hometown: "Knoxville, Tennessee",
    height: "7'0\"",
    weight: "323 lbs",
    debut: "1995-04-24",
    retirement: "2023-01-01",
    finisher: "Tombstone Piledriver",
    era: "Attitude",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 1, year: 1998 },
      { title: "World Heavyweight Championship", reigns: 1, days: 22, year: 2010 }
    ],
    bio: "The Undertaker's demonic half-brother who terrorized WWE for over two decades."
  },
  {
    name: "Big Show",
    realName: "Paul Donald Wight II",
    nickname: "The World's Largest Athlete",
    hometown: "Tampa, Florida",
    height: "7'0\"",
    weight: "383 lbs",
    debut: "1995-02-20",
    retirement: "2021-03-07",
    finisher: "WMD",
    era: "Attitude",
    promotions: ["WWE", "WCW", "AEW"],
    championships: [
      { title: "WWE Championship", reigns: 2, days: 42, year: 1999 },
      { title: "World Heavyweight Championship", reigns: 2, days: 45, year: 2006 },
      { title: "WCW World Heavyweight Championship", reigns: 2, days: 8, year: 1999 }
    ],
    bio: "The World's Largest Athlete who has been a giant presence in wrestling for nearly three decades."
  },
  {
    name: "Kurt Angle",
    realName: "Kurt Steven Angle",
    nickname: "The Olympic Hero",
    hometown: "Pittsburgh, Pennsylvania",
    height: "6'0\"",
    weight: "225 lbs",
    debut: "1999-11-14",
    retirement: "2019-04-07",
    finisher: "Angle Slam",
    era: "Ruthless Aggression",
    promotions: ["WWE", "TNA"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 126, year: 2000 },
      { title: "World Heavyweight Championship", reigns: 1, days: 91, year: 2003 }
    ],
    bio: "Olympic gold medalist who became one of the greatest technical wrestlers in WWE history."
  },
  {
    name: "Chris Jericho",
    realName: "Christopher Keith Irvine",
    nickname: "Y2J",
    hometown: "Winnipeg, Manitoba, Canada",
    height: "6'0\"",
    weight: "227 lbs",
    debut: "1990-10-02",
    retirement: null,
    finisher: "Walls of Jericho",
    era: "Attitude",
    promotions: ["WWE", "WCW", "AEW"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 98, year: 2001 },
      { title: "World Heavyweight Championship", reigns: 1, days: 28, year: 2008 }
    ],
    bio: "First Undisputed Champion, King of the World, and Ayatollah of Rock and Rolla."
  },
  {
    name: "Eddie Guerrero",
    realName: "Eduardo Gory Guerrero Llanes",
    nickname: "Latino Heat",
    hometown: "El Paso, Texas",
    height: "5'8\"",
    weight: "228 lbs",
    debut: "1987-01-01",
    retirement: "2005-11-13",
    finisher: "Frog Splash",
    era: "Ruthless Aggression",
    promotions: ["WWE", "WCW", "ECW"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 133, year: 2004 }
    ],
    bio: "Latino Heat who lied, cheated, and stole his way into the hearts of fans worldwide."
  },
  {
    name: "JBL",
    realName: "John Charles Layfield",
    nickname: "Wrestling God",
    hometown: "New York, New York",
    height: "6'6\"",
    weight: "290 lbs",
    debut: "1992-05-26",
    retirement: "2017-04-03",
    finisher: "Clothesline From Hell",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 280, year: 2004 }
    ],
    bio: "Self-proclaimed Wrestling God who held the WWE Championship for 280 days as a despised heel."
  },
  {
    name: "Batista",
    realName: "David Michael Bautista Jr.",
    nickname: "The Animal",
    hometown: "Washington, D.C.",
    height: "6'6\"",
    weight: "290 lbs",
    debut: "1999-10-30",
    retirement: "2019-04-07",
    finisher: "Batista Bomb",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "World Heavyweight Championship", reigns: 2, days: 282, year: 2005 }
    ],
    bio: "The Animal who became a main event star as part of Evolution before going Hollywood."
  },
  {
    name: "Edge",
    realName: "Adam Joseph Copeland",
    nickname: "The Rated-R Superstar",
    hometown: "Toronto, Ontario, Canada",
    height: "6'5\"",
    weight: "241 lbs",
    debut: "1992-06-01",
    retirement: "2022-07-30",
    finisher: "Spear",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 4, days: 139, year: 2006 },
      { title: "World Heavyweight Championship", reigns: 7, days: 307, year: 2007 }
    ],
    bio: "The Ultimate Opportunist who cashed in Money in the Bank contracts and won 11 world championships."
  },
  {
    name: "Rob Van Dam",
    realName: "Robert Alexander Szatkowski",
    nickname: "Mr. Monday Night",
    hometown: "Battle Creek, Michigan",
    height: "6'0\"",
    weight: "235 lbs",
    debut: "1990-01-01",
    retirement: null,
    finisher: "Five-Star Frog Splash",
    era: "Ruthless Aggression",
    promotions: ["WWE", "ECW", "TNA"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 22, year: 2006 }
    ],
    bio: "The Whole F'N Show who brought ECW-style innovation to WWE as Mr. Monday Night."
  },
  {
    name: "Rey Mysterio",
    realName: "Óscar Gutiérrez Rubio",
    nickname: "The Ultimate Underdog",
    hometown: "San Diego, California",
    height: "5'6\"",
    weight: "175 lbs",
    debut: "1989-04-30",
    retirement: null,
    finisher: "619",
    era: "Ruthless Aggression",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "World Heavyweight Championship", reigns: 2, days: 112, year: 2006 },
      { title: "WWE Championship", reigns: 1, days: 1, year: 2011 }
    ],
    bio: "The biggest little man in wrestling history, inspiring underdogs everywhere."
  },
  {
    name: "The Miz",
    realName: "Michael Gregory Mizanin",
    nickname: "The A-Lister",
    hometown: "Cleveland, Ohio",
    height: "6'2\"",
    weight: "221 lbs",
    debut: "2004-07-20",
    retirement: null,
    finisher: "Skull-Crushing Finale",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 2, days: 160, year: 2010 }
    ],
    bio: "Reality TV star turned WWE Champion who proved that anyone can make it to the top with determination."
  },
  {
    name: "Alberto Del Rio",
    realName: "Alberto Rodríguez",
    nickname: "The Mexican Aristocrat",
    hometown: "San Luis Potosí, Mexico",
    height: "6'5\"",
    weight: "263 lbs",
    debut: "2000-01-01",
    retirement: "2022-01-01",
    finisher: "Cross Armbreaker",
    era: "PG",
    promotions: ["WWE", "Impact Wrestling"],
    championships: [
      { title: "WWE Championship", reigns: 2, days: 35, year: 2011 },
      { title: "World Heavyweight Championship", reigns: 2, days: 70, year: 2013 }
    ],
    bio: "Mexican aristocrat who captured multiple world championships with his technical wrestling skills."
  },
  {
    name: "CM Punk",
    realName: "Phillip Jack Brooks",
    nickname: "The Best in the World",
    hometown: "Chicago, Illinois",
    height: "6'2\"",
    weight: "218 lbs",
    debut: "1999-01-01",
    retirement: null,
    finisher: "GTS",
    era: "PG",
    promotions: ["WWE", "AEW"],
    championships: [
      { title: "WWE Championship", reigns: 2, days: 462, year: 2011 },
      { title: "World Heavyweight Championship", reigns: 1, days: 71, year: 2008 }
    ],
    bio: "The straight-edge superstar with the longest WWE Championship reign of the modern era at 434 days."
  },
  {
    name: "Daniel Bryan",
    realName: "Bryan Lloyd Danielson",
    nickname: "The Yes Man",
    hometown: "Aberdeen, Washington",
    height: "5'10\"",
    weight: "210 lbs",
    debut: "1999-12-04",
    retirement: null,
    finisher: "Running Knee",
    era: "PG",
    promotions: ["WWE", "AEW"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 64, year: 2014 },
      { title: "World Heavyweight Championship", reigns: 1, days: 1, year: 2013 }
    ],
    bio: "The ultimate underdog who captured the WWE Championship at WrestleMania 30 in a legendary moment."
  },
  {
    name: "Randy Orton",
    realName: "Randal Keith Orton",
    nickname: "The Viper",
    hometown: "St. Louis, Missouri",
    height: "6'5\"",
    weight: "250 lbs",
    debut: "2000-03-18",
    retirement: null,
    finisher: "RKO",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 10, days: 380, year: 2007 },
      { title: "World Heavyweight Championship", reigns: 4, days: 224, year: 2004 }
    ],
    bio: "Third-generation superstar and youngest World Heavyweight Champion in WWE history."
  },
  {
    name: "Sheamus",
    realName: "Stephen Farrelly",
    nickname: "The Celtic Warrior",
    hometown: "Dublin, Ireland",
    height: "6'4\"",
    weight: "267 lbs",
    debut: "2004-05-26",
    retirement: null,
    finisher: "Brogue Kick",
    era: "PG",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 3, days: 70, year: 2009 },
      { title: "World Heavyweight Championship", reigns: 1, days: 210, year: 2012 }
    ],
    bio: "Irish warrior who brought Celtic pride and fighting spirit to WWE championship gold."
  },
  {
    name: "Roman Reigns",
    realName: "Leati Joseph Anoaʻi",
    nickname: "The Tribal Chief",
    hometown: "Pensacola, Florida",
    height: "6'3\"",
    weight: "265 lbs",
    debut: "2012-11-18",
    retirement: null,
    finisher: "Spear",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 3, days: 118, year: 2015 },
      { title: "Universal Championship", reigns: 2, days: 1316, year: 2020 }
    ],
    bio: "The Tribal Chief who has acknowledged his position as the head of the table in WWE."
  },
  {
    name: "Drew McIntyre",
    realName: "Andrew McLean Galloway IV",
    nickname: "The Scottish Warrior",
    hometown: "Ayr, Scotland",
    height: "6'5\"",
    weight: "265 lbs",
    debut: "2001-07-12",
    retirement: null,
    finisher: "Claymore Kick",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 2, days: 202, year: 2020 }
    ],
    bio: "Scottish Warrior who fought his way back to the top to become WWE Champion during the pandemic era."
  },
  {
    name: "Kofi Kingston",
    realName: "Kofi Nahaje Sarkodie-Mensah",
    nickname: "The New Day",
    hometown: "Ghana, West Africa",
    height: "6'0\"",
    weight: "212 lbs",
    debut: "2006-01-17",
    retirement: null,
    finisher: "Trouble in Paradise",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 180, year: 2019 }
    ],
    bio: "Feel-good champion who captured the WWE Championship at WrestleMania 35 in an emotional victory."
  },
  {
    name: "Brock Lesnar",
    realName: "Brock Edward Lesnar",
    nickname: "The Beast Incarnate",
    hometown: "Suplex City",
    height: "6'3\"",
    weight: "286 lbs",
    debut: "2000-03-18",
    retirement: null,
    finisher: "F5",
    era: "Ruthless Aggression",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 3, days: 688, year: 2002 },
      { title: "Universal Championship", reigns: 3, days: 686, year: 2017 }
    ],
    bio: "The Beast Incarnate who conquered UFC and WWE, bringing legitimacy and intensity to sports entertainment."
  },
  {
    name: "Bobby Lashley",
    realName: "Franklin Roberto Lashley",
    nickname: "The All Mighty",
    hometown: "Junction City, Kansas",
    height: "6'3\"",
    weight: "273 lbs",
    debut: "1999-01-01",
    retirement: null,
    finisher: "Hurt Lock",
    era: "Modern",
    promotions: ["WWE", "TNA"],
    championships: [
      { title: "WWE Championship", reigns: 2, days: 49, year: 2021 }
    ],
    bio: "Military veteran and mixed martial artist who proved his all mighty dominance in WWE."
  },
  {
    name: "Big E",
    realName: "Ettore Ewen",
    nickname: "Big E Langston",
    hometown: "Tampa, Florida",
    height: "5'11\"",
    weight: "290 lbs",
    debut: "2009-08-20",
    retirement: null,
    finisher: "Big Ending",
    era: "Modern",
    promotions: ["WWE"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 110, year: 2021 }
    ],
    bio: "Powerlifting champion and New Day member who achieved his championship dreams."
  },
  {
    name: "Cody Rhodes",
    realName: "Cody Garrett Runnels",
    nickname: "The American Nightmare",
    hometown: "Marietta, Georgia",
    height: "6'1\"",
    weight: "220 lbs",
    debut: "2006-09-07",
    retirement: null,
    finisher: "Cross Rhodes",
    era: "Modern",
    promotions: ["WWE", "AEW"],
    championships: [
      { title: "WWE Championship", reigns: 1, days: 150, year: 2024 }
    ],
    bio: "The American Nightmare who finished his story by capturing the WWE Championship at WrestleMania 40."
  }
];

// WCW Champions
const WCW_CHAMPIONS = [
  {
    name: "Ric Flair",
    realName: "Richard Morgan Fliehr",
    nickname: "Nature Boy",
    hometown: "Charlotte, North Carolina",
    height: "6'1\"",
    weight: "243 lbs",
    debut: "1972-12-10",
    retirement: "2012-01-01",
    finisher: "Figure Four Leglock",
    era: "Golden",
    promotions: ["WWE", "WCW", "NWA"],
    championships: [
      { title: "WWE Championship", reigns: 2, days: 118, year: 1992 },
      { title: "WCW World Heavyweight Championship", reigns: 6, days: 1000, year: 1991 },
      { title: "NWA World Heavyweight Championship", reigns: 8, days: 3000, year: 1981 }
    ],
    bio: "The stylin', profilin', limousine riding, jet flying, kiss-stealin', wheelin' dealin' son of a gun! Woooo!"
  },
  {
    name: "Goldberg",
    realName: "William Scott Goldberg",
    nickname: "Da Man",
    hometown: "Atlanta, Georgia",
    height: "6'4\"",
    weight: "285 lbs",
    debut: "1997-09-22",
    retirement: null,
    finisher: "Jackhammer",
    era: "Attitude",
    promotions: ["WCW", "WWE"],
    championships: [
      { title: "WCW World Heavyweight Championship", reigns: 1, days: 174, year: 1998 },
      { title: "World Heavyweight Championship", reigns: 1, days: 84, year: 2003 },
      { title: "Universal Championship", reigns: 1, days: 28, year: 2017 }
    ],
    bio: "WCW's monster with an incredible 173-match winning streak and one of wrestling's most dominant forces."
  },
  {
    name: "Sting",
    realName: "Steven James Borden",
    nickname: "The Stinger",
    hometown: "Venice Beach, California",
    height: "6'2\"",
    weight: "250 lbs",
    debut: "1985-01-01",
    retirement: "2016-01-01",
    finisher: "Scorpion Death Lock",
    era: "Golden",
    promotions: ["WCW", "TNA", "WWE", "AEW"],
    championships: [
      { title: "WCW World Heavyweight Championship", reigns: 6, days: 1000, year: 1990 }
    ],
    bio: "The franchise of WCW and one of the greatest wrestlers who became an icon across multiple decades."
  },
  {
    name: "Hollywood Hogan",
    realName: "Terry Gene Bollea",
    nickname: "Hollywood Hogan",
    hometown: "Hollywood, California",
    height: "6'7\"",
    weight: "302 lbs",
    debut: "1977-08-10",
    retirement: "2012-12-08",
    finisher: "Leg Drop",
    era: "Attitude",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WCW World Heavyweight Championship", reigns: 6, days: 469, year: 1994 }
    ],
    bio: "The leader of the nWo who shocked the wrestling world by turning heel and joining the black and white."
  },
  {
    name: "Kevin Nash",
    realName: "Kevin Scott Nash",
    nickname: "Big Sexy",
    hometown: "Detroit, Michigan", 
    height: "6'10\"",
    weight: "356 lbs",
    debut: "1990-01-01",
    retirement: "2020-01-26",
    finisher: "Jackknife Powerbomb",
    era: "Attitude",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WCW World Heavyweight Championship", reigns: 5, days: 358, year: 1998 }
    ],
    bio: "Big Sexy and founding member of the nWo who dominated the main event scene in both promotions."
  },
  {
    name: "Scott Hall",
    realName: "Scott Oliver Hall",
    nickname: "Razor Ramon",
    hometown: "Chuluota, Florida",
    height: "6'7\"",
    weight: "287 lbs",
    debut: "1984-01-01",
    retirement: "2016-04-02",
    finisher: "Outsider's Edge",
    era: "New Generation",
    promotions: ["WWE", "WCW"],
    championships: [
      { title: "WWE Intercontinental Championship", reigns: 4, days: 371, year: 1992 }
    ],
    bio: "The Bad Guy who brought machismo and charisma to both WWE as Razor Ramon and WCW as an nWo founder."
  }
];

// Helper functions
function getEra(debutYear: number): string {
  if (debutYear <= 1979) return 'Golden';
  if (debutYear <= 1992) return 'New Generation';
  if (debutYear <= 2002) return 'Attitude';  
  if (debutYear <= 2008) return 'Ruthless Aggression';
  if (debutYear <= 2013) return 'PG';
  return 'Modern';
}

async function importAllWrestlers() {
  console.log('🚀 Starting comprehensive wrestler import...\n');

  // Combine all wrestler data
  const allWrestlers = [...ALL_WWE_CHAMPIONS, ...WCW_CHAMPIONS];
  
  let importedProfiles = 0;
  let importedChampionships = 0;
  let skipped = 0;

  for (const wrestlerData of allWrestlers) {
    try {
      console.log(`📝 Processing ${wrestlerData.name}...`);

      // Check if profile already exists
      const existingProfile = await prisma.profile.findFirst({
        where: { 
          OR: [
            { name: wrestlerData.name },
            { slug: wrestlerData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') }
          ]
        }
      });

      if (existingProfile) {
        console.log(`   ⚠️  ${wrestlerData.name} already exists, skipping...`);
        skipped++;
        continue;
      }

      // Create profile
      const profile = await prisma.profile.create({
        data: {
          name: wrestlerData.name,
          slug: wrestlerData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
          type: 'wrestler',
          nickname: wrestlerData.nickname,
          hometown: wrestlerData.hometown,
          height: wrestlerData.height,
          weight: wrestlerData.weight,
          debut: wrestlerData.debut ? new Date(wrestlerData.debut) : null,
          retired: wrestlerData.retirement ? new Date(wrestlerData.retirement) : null,
          bio: wrestlerData.bio,
          tagline: `${wrestlerData.championships?.reduce((total, c) => total + c.reigns, 0) || 0}-time World Champion`
        }
      });

      // Create wrestler-specific profile
      await prisma.wrestlerProfile.create({
        data: {
          profileId: profile.id,
          finisher: wrestlerData.finisher,
          era: wrestlerData.era,
          worldTitleReigns: wrestlerData.championships?.reduce((total, c) => total + c.reigns, 0) || 0,
          combinedDaysAsChampion: wrestlerData.championships?.reduce((total, c) => total + c.days, 0) || 0,
          firstReignDate: wrestlerData.championships?.length ? new Date(`${wrestlerData.championships[0].year}-01-01`) : null,
          lastReignDate: wrestlerData.championships?.length ? new Date(`${wrestlerData.championships[wrestlerData.championships.length - 1].year}-01-01`) : null
        }
      });

      importedProfiles++;

      // Handle promotions and championships
      if (wrestlerData.promotions && wrestlerData.championships) {
        for (const promotionName of wrestlerData.promotions) {
          // Find or create promotion
          let promotion = await prisma.promotion.findUnique({
            where: { name: promotionName }
          });
          
          if (!promotion) {
            promotion = await prisma.promotion.create({
              data: {
                name: promotionName,
                slug: promotionName.toLowerCase().replace(/[^a-z0-9]/g, '-')
              }
            });
          }

          // Connect profile to promotion
          await prisma.profilePromotion.upsert({
            where: {
              profileId_promotionId: {
                profileId: profile.id,
                promotionId: promotion.id
              }
            },
            update: {},
            create: {
              profileId: profile.id,
              promotionId: promotion.id
            }
          });
        }

        // Import championships
        for (const championship of wrestlerData.championships) {
          const promotion = await prisma.promotion.findFirst({
            where: { name: { in: wrestlerData.promotions } }
          });

          await prisma.championship.create({
            data: {
              profileId: profile.id,
              titleName: championship.title,
              promotionId: promotion?.id || (await prisma.promotion.findFirst({ where: { name: 'WWE' } }))?.id!,
              reignNumber: championship.reigns,
              wonDate: new Date(`${championship.year}-01-01`),
              daysHeld: championship.days,
              isCurrentChampion: false
            }
          });
          importedChampionships++;
        }
      }

      console.log(`   ✅ ${wrestlerData.name} imported successfully`);

    } catch (error) {
      console.error(`   ❌ Error importing ${wrestlerData.name}:`, error);
    }
  }

  console.log('\n🎉 Import completed!');
  console.log(`📊 Total Profiles Imported: ${importedProfiles}`);
  console.log(`⚠️  Profiles Skipped: ${skipped}`);
  console.log(`🏆 Total Championships Imported: ${importedChampionships}`);

  await prisma.$disconnect();
}

if (require.main === module) {
  importAllWrestlers().catch(console.error);
}

export { importAllWrestlers };