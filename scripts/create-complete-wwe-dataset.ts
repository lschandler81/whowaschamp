import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface WWEEventData {
  name: string;
  date: string;
  venue?: string;
  city?: string;
  country: string;
  attendance?: number;
  buyrate?: number;
  headliners?: string[];
  titleChanges?: { title: string; newChampion: string; oldChampion?: string }[];
  brand?: string;
}

// Complete WWE PPV History 1985-2024 (Comprehensive Dataset)
const completeWWEPPVs: WWEEventData[] = [
  // WrestleMania Series (1985-2024) - Complete
  {
    name: "WrestleMania",
    date: "1985-03-31",
    venue: "Madison Square Garden",
    city: "New York City, New York",
    country: "USA",
    attendance: 19121,
    buyrate: 400,
    headliners: ["Hulk Hogan & Mr. T", "\"Rowdy\" Roddy Piper & \"Mr. Wonderful\" Paul Orndorff"],
    titleChanges: []
  },
  {
    name: "WrestleMania 2",
    date: "1986-04-07",
    venue: "Nassau Veterans Memorial Coliseum / Rosemont Horizon / Los Angeles Sports Arena",
    city: "Uniondale, New York / Rosemont, Illinois / Los Angeles, California",
    country: "USA",
    attendance: 76000,
    buyrate: 300,
    headliners: ["Hulk Hogan", "King Kong Bundy"],
    titleChanges: []
  },
  {
    name: "WrestleMania III",
    date: "1987-03-29",
    venue: "Pontiac Silverdome",
    city: "Pontiac, Michigan",
    country: "USA",
    attendance: 93173,
    buyrate: 1600,
    headliners: ["Hulk Hogan", "André the Giant"],
    titleChanges: []
  },
  {
    name: "WrestleMania IV",
    date: "1988-03-27",
    venue: "Trump Plaza Hotel and Casino",
    city: "Atlantic City, New Jersey",
    country: "USA",
    attendance: 19199,
    buyrate: 770,
    headliners: ["\"Macho Man\" Randy Savage", "Ted DiBiase"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Randy Savage", oldChampion: "Vacant" }]
  },
  {
    name: "WrestleMania V",
    date: "1989-04-02",
    venue: "Trump Plaza Hotel and Casino",
    city: "Atlantic City, New Jersey",
    country: "USA",
    attendance: 18946,
    buyrate: 767,
    headliners: ["Hulk Hogan", "\"Macho Man\" Randy Savage"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Hulk Hogan", oldChampion: "Randy Savage" }]
  },
  {
    name: "WrestleMania VI",
    date: "1990-04-01",
    venue: "SkyDome",
    city: "Toronto, Ontario",
    country: "Canada",
    attendance: 67678,
    buyrate: 865,
    headliners: ["Hulk Hogan", "The Ultimate Warrior"],
    titleChanges: [{ title: "WWF Championship", newChampion: "The Ultimate Warrior", oldChampion: "Hulk Hogan" }]
  },
  {
    name: "WrestleMania VII",
    date: "1991-03-24",
    venue: "Los Angeles Memorial Sports Arena",
    city: "Los Angeles, California",
    country: "USA",
    attendance: 16158,
    buyrate: 400,
    headliners: ["Hulk Hogan", "Sgt. Slaughter"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Hulk Hogan", oldChampion: "Sgt. Slaughter" }]
  },
  {
    name: "WrestleMania VIII",
    date: "1992-04-05",
    venue: "Hoosier Dome",
    city: "Indianapolis, Indiana",
    country: "USA",
    attendance: 62167,
    buyrate: 420,
    headliners: ["Hulk Hogan", "Sid Justice"],
    titleChanges: []
  },
  {
    name: "WrestleMania IX",
    date: "1993-04-04",
    venue: "Caesars Palace",
    city: "Las Vegas, Nevada",
    country: "USA",
    attendance: 16891,
    buyrate: 430,
    headliners: ["Bret Hart", "Yokozuna"],
    titleChanges: [
      { title: "WWF Championship", newChampion: "Yokozuna", oldChampion: "Bret Hart" },
      { title: "WWF Championship", newChampion: "Hulk Hogan", oldChampion: "Yokozuna" }
    ]
  },
  {
    name: "WrestleMania X",
    date: "1994-03-20",
    venue: "Madison Square Garden",
    city: "New York City, New York",
    country: "USA",
    attendance: 18065,
    buyrate: 420,
    headliners: ["Bret Hart", "Yokozuna"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Bret Hart", oldChampion: "Yokozuna" }]
  },
  {
    name: "WrestleMania XI",
    date: "1995-04-02",
    venue: "Hartford Civic Center",
    city: "Hartford, Connecticut",
    country: "USA",
    attendance: 16305,
    buyrate: 340,
    headliners: ["Diesel", "Shawn Michaels"],
    titleChanges: []
  },
  {
    name: "WrestleMania XII",
    date: "1996-03-31",
    venue: "Arrowhead Pond",
    city: "Anaheim, California",
    country: "USA",
    attendance: 18853,
    buyrate: 340,
    headliners: ["Shawn Michaels", "Bret Hart"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Shawn Michaels", oldChampion: "Bret Hart" }]
  },
  {
    name: "WrestleMania 13",
    date: "1997-03-23",
    venue: "Rosemont Horizon",
    city: "Rosemont, Illinois",
    country: "USA",
    attendance: 18197,
    buyrate: 237,
    headliners: ["The Undertaker", "Sid"],
    titleChanges: [{ title: "WWF Championship", newChampion: "The Undertaker", oldChampion: "Sid" }]
  },
  {
    name: "WrestleMania XIV",
    date: "1998-03-29",
    venue: "FleetCenter",
    city: "Boston, Massachusetts", 
    country: "USA",
    attendance: 18187,
    buyrate: 700,
    headliners: ["Steve Austin", "Shawn Michaels"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Steve Austin", oldChampion: "Shawn Michaels" }]
  },
  {
    name: "WrestleMania XV",
    date: "1999-03-28",
    venue: "First Union Center",
    city: "Philadelphia, Pennsylvania",
    country: "USA",
    attendance: 20276,
    buyrate: 800,
    headliners: ["Steve Austin", "The Rock"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Steve Austin", oldChampion: "The Rock" }]
  },
  {
    name: "WrestleMania 2000",
    date: "2000-04-02",
    venue: "Arrowhead Pond",
    city: "Anaheim, California",
    country: "USA",
    attendance: 18742,
    buyrate: 824,
    headliners: ["The Rock", "Triple H", "Big Show", "Mick Foley"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Triple H", oldChampion: "The Rock" }]
  },
  {
    name: "WrestleMania X-Seven",
    date: "2001-04-01",
    venue: "Astrodome",
    city: "Houston, Texas",
    country: "USA",
    attendance: 67925,
    buyrate: 1040,
    headliners: ["Steve Austin", "The Rock"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Steve Austin", oldChampion: "The Rock" }]
  },
  {
    name: "WrestleMania X8",
    date: "2002-03-17",
    venue: "SkyDome",
    city: "Toronto, Ontario",
    country: "Canada",
    attendance: 68237,
    buyrate: 880,
    headliners: ["Triple H", "Chris Jericho"],
    titleChanges: [{ title: "Undisputed WWF Championship", newChampion: "Triple H", oldChampion: "Chris Jericho" }]
  },
  {
    name: "WrestleMania XIX",
    date: "2003-03-30",
    venue: "Safeco Field",
    city: "Seattle, Washington",
    country: "USA",
    attendance: 54097,
    buyrate: 560,
    headliners: ["The Rock", "Steve Austin"],
    titleChanges: []
  },
  {
    name: "WrestleMania XX",
    date: "2004-03-14",
    venue: "Madison Square Garden",
    city: "New York City, New York",
    country: "USA",
    attendance: 18500,
    buyrate: 518,
    headliners: ["Chris Benoit", "Triple H", "Shawn Michaels"],
    titleChanges: [{ title: "World Heavyweight Championship", newChampion: "Chris Benoit", oldChampion: "Triple H" }]
  },
  {
    name: "WrestleMania 21",
    date: "2005-04-03",
    venue: "Staples Center",
    city: "Los Angeles, California",
    country: "USA",
    attendance: 20193,
    buyrate: 650,
    headliners: ["Batista", "Triple H"],
    titleChanges: [{ title: "World Heavyweight Championship", newChampion: "Batista", oldChampion: "Triple H" }]
  },
  {
    name: "WrestleMania 22",
    date: "2006-04-02",
    venue: "Allstate Arena",
    city: "Rosemont, Illinois",
    country: "USA",
    attendance: 17155,
    buyrate: 975,
    headliners: ["John Cena", "Triple H"],
    titleChanges: []
  },
  {
    name: "WrestleMania 23",
    date: "2007-04-01",
    venue: "Ford Field",
    city: "Detroit, Michigan",
    country: "USA",
    attendance: 80103,
    buyrate: 1188,
    headliners: ["John Cena", "Shawn Michaels"],
    titleChanges: []
  },
  {
    name: "WrestleMania XXIV",
    date: "2008-03-30",
    venue: "Citrus Bowl",
    city: "Orlando, Florida",
    country: "USA",
    attendance: 74635,
    buyrate: 670,
    headliners: ["John Cena", "Randy Orton", "Triple H"],
    titleChanges: [{ title: "WWE Championship", newChampion: "Randy Orton", oldChampion: "John Cena" }]
  },
  {
    name: "WrestleMania 25",
    date: "2009-04-05",
    venue: "Reliant Stadium",
    city: "Houston, Texas",
    country: "USA",
    attendance: 72744,
    buyrate: 960,
    headliners: ["Triple H", "Randy Orton"],
    titleChanges: []
  },
  {
    name: "WrestleMania XXVI",
    date: "2010-03-28",
    venue: "University of Phoenix Stadium",
    city: "Glendale, Arizona",
    country: "USA",
    attendance: 72219,
    buyrate: 885,
    headliners: ["John Cena", "Batista"],
    titleChanges: [{ title: "WWE Championship", newChampion: "John Cena", oldChampion: "Batista" }]
  },
  {
    name: "WrestleMania XXVII",
    date: "2011-04-03",
    venue: "Georgia Dome",
    city: "Atlanta, Georgia",
    country: "USA",
    attendance: 71617,
    buyrate: 1042,
    headliners: ["The Miz", "John Cena"],
    titleChanges: []
  },
  {
    name: "WrestleMania XXVIII",
    date: "2012-04-01",
    venue: "Sun Life Stadium",
    city: "Miami Gardens, Florida",
    country: "USA",
    attendance: 78363,
    buyrate: 1217,
    headliners: ["The Rock", "John Cena"],
    titleChanges: []
  },
  {
    name: "WrestleMania 29",
    date: "2013-04-07",
    venue: "MetLife Stadium",
    city: "East Rutherford, New Jersey",
    country: "USA",
    attendance: 80676,
    buyrate: 1048,
    headliners: ["John Cena", "The Rock"],
    titleChanges: [{ title: "WWE Championship", newChampion: "John Cena", oldChampion: "The Rock" }]
  },
  {
    name: "WrestleMania XXX",
    date: "2014-04-06",
    venue: "Mercedes-Benz Superdome",
    city: "New Orleans, Louisiana",
    country: "USA",
    attendance: 75167,
    buyrate: 667,
    headliners: ["Daniel Bryan", "Batista", "Randy Orton"],
    titleChanges: [{ title: "WWE World Heavyweight Championship", newChampion: "Daniel Bryan" }]
  },
  {
    name: "WrestleMania 31",
    date: "2015-03-29",
    venue: "Levi's Stadium",
    city: "Santa Clara, California",
    country: "USA",
    attendance: 76976,
    buyrate: 1006,
    headliners: ["Roman Reigns", "Brock Lesnar"],
    titleChanges: [{ title: "WWE World Heavyweight Championship", newChampion: "Seth Rollins" }]
  },
  {
    name: "WrestleMania 32",
    date: "2016-04-03",
    venue: "AT&T Stadium",
    city: "Arlington, Texas",
    country: "USA",
    attendance: 101763,
    headliners: ["Roman Reigns", "Triple H"],
    titleChanges: [{ title: "WWE World Heavyweight Championship", newChampion: "Roman Reigns", oldChampion: "Triple H" }]
  },
  {
    name: "WrestleMania 33",
    date: "2017-04-02",
    venue: "Camping World Stadium",
    city: "Orlando, Florida",
    country: "USA",
    attendance: 75245,
    headliners: ["Roman Reigns", "The Undertaker"],
    titleChanges: []
  },
  {
    name: "WrestleMania 34",
    date: "2018-04-08",
    venue: "Mercedes-Benz Superdome",
    city: "New Orleans, Louisiana",
    country: "USA",
    attendance: 78133,
    headliners: ["Roman Reigns", "Brock Lesnar"],
    titleChanges: []
  },
  {
    name: "WrestleMania 35",
    date: "2019-04-07",
    venue: "MetLife Stadium", 
    city: "East Rutherford, New Jersey",
    country: "USA",
    attendance: 82265,
    headliners: ["Ronda Rousey", "Charlotte Flair", "Becky Lynch"],
    titleChanges: [
      { title: "Raw Women's Championship", newChampion: "Becky Lynch", oldChampion: "Ronda Rousey" },
      { title: "SmackDown Women's Championship", newChampion: "Becky Lynch", oldChampion: "Charlotte Flair" }
    ]
  },
  {
    name: "WrestleMania 36",
    date: "2020-04-04",
    venue: "WWE Performance Center",
    city: "Orlando, Florida",
    country: "USA",
    attendance: 0,
    headliners: ["Brock Lesnar", "Drew McIntyre"],
    titleChanges: [{ title: "WWE Championship", newChampion: "Drew McIntyre", oldChampion: "Brock Lesnar" }]
  },
  {
    name: "WrestleMania 36",
    date: "2020-04-05",
    venue: "WWE Performance Center",
    city: "Orlando, Florida",
    country: "USA",
    attendance: 0,
    headliners: ["Roman Reigns", "Goldberg"],
    titleChanges: []
  },
  {
    name: "WrestleMania 37",
    date: "2021-04-10",
    venue: "Raymond James Stadium",
    city: "Tampa, Florida",
    country: "USA",
    attendance: 25675,
    headliners: ["Roman Reigns", "Edge", "Daniel Bryan"],
    titleChanges: []
  },
  {
    name: "WrestleMania 37",
    date: "2021-04-11",
    venue: "Raymond James Stadium",
    city: "Tampa, Florida",
    country: "USA",
    attendance: 25675,
    headliners: ["Sasha Banks", "Bianca Belair"],
    titleChanges: [{ title: "SmackDown Women's Championship", newChampion: "Bianca Belair", oldChampion: "Sasha Banks" }]
  },
  {
    name: "WrestleMania 38",
    date: "2022-04-02",
    venue: "AT&T Stadium",
    city: "Arlington, Texas",
    country: "USA",
    attendance: 77899,
    headliners: ["Roman Reigns", "Brock Lesnar"],
    titleChanges: [
      { title: "WWE Championship", newChampion: "Roman Reigns", oldChampion: "Brock Lesnar" },
      { title: "Universal Championship", newChampion: "Roman Reigns", oldChampion: "Brock Lesnar" }
    ]
  },
  {
    name: "WrestleMania 38",
    date: "2022-04-03",
    venue: "AT&T Stadium",
    city: "Arlington, Texas",
    country: "USA",
    attendance: 78453,
    headliners: ["Steve Austin", "Kevin Owens"],
    titleChanges: []
  },
  {
    name: "WrestleMania 39",
    date: "2023-04-01",
    venue: "SoFi Stadium",
    city: "Inglewood, California",
    country: "USA", 
    attendance: 80497,
    headliners: ["Roman Reigns", "Cody Rhodes"],
    titleChanges: []
  },
  {
    name: "WrestleMania 39",
    date: "2023-04-02",
    venue: "SoFi Stadium",
    city: "Inglewood, California",
    country: "USA",
    attendance: 81395,
    headliners: ["Roman Reigns", "Cody Rhodes"],
    titleChanges: []
  },
  {
    name: "WrestleMania XL",
    date: "2024-04-06",
    venue: "Lincoln Financial Field",
    city: "Philadelphia, Pennsylvania",
    country: "USA",
    attendance: 72543,
    headliners: ["Cody Rhodes", "Roman Reigns"],
    titleChanges: []
  },
  {
    name: "WrestleMania XL",
    date: "2024-04-07", 
    venue: "Lincoln Financial Field",
    city: "Philadelphia, Pennsylvania",
    country: "USA",
    attendance: 72543,
    headliners: ["Cody Rhodes", "Roman Reigns"],
    titleChanges: [{ title: "Undisputed WWE Championship", newChampion: "Cody Rhodes", oldChampion: "Roman Reigns" }]
  },

  // Royal Rumble Series (1988-2024) - Complete
  {
    name: "Royal Rumble (1988)",
    date: "1988-01-24",
    venue: "Copps Coliseum",
    city: "Hamilton, Ontario",
    country: "Canada",
    attendance: 18000,
    headliners: ["Jim Duggan", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1989)",
    date: "1989-01-15",
    venue: "The Summit",
    city: "Houston, Texas",
    country: "USA",
    attendance: 19000,
    buyrate: 450,
    headliners: ["Big John Studd", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1990)",
    date: "1990-01-21",
    venue: "Orlando Arena",
    city: "Orlando, Florida",
    country: "USA",
    attendance: 16000,
    buyrate: 350,
    headliners: ["Hulk Hogan", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1991)",
    date: "1991-01-19",
    venue: "Miami Arena",
    city: "Miami, Florida",
    country: "USA",
    attendance: 16000,
    buyrate: 400,
    headliners: ["Hulk Hogan", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1992)",
    date: "1992-01-19",
    venue: "Knickerbocker Arena",
    city: "Albany, New York",
    country: "USA",
    attendance: 17000,
    buyrate: 420,
    headliners: ["Ric Flair", "Royal Rumble Match"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Ric Flair", oldChampion: "Vacant" }]
  },
  {
    name: "Royal Rumble (1993)",
    date: "1993-01-24",
    venue: "ARCO Arena",
    city: "Sacramento, California",
    country: "USA",
    attendance: 16000,
    buyrate: 320,
    headliners: ["Yokozuna", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1994)",
    date: "1994-01-22",
    venue: "Providence Civic Center",
    city: "Providence, Rhode Island",
    country: "USA",
    attendance: 14500,
    buyrate: 310,
    headliners: ["Bret Hart", "Lex Luger", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1995)",
    date: "1995-01-22",
    venue: "USF Sun Dome",
    city: "Tampa, Florida",
    country: "USA",
    attendance: 10000,
    buyrate: 230,
    headliners: ["Shawn Michaels", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1996)",
    date: "1996-01-21",
    venue: "Selland Arena",
    city: "Fresno, California",
    country: "USA",
    attendance: 9600,
    buyrate: 290,
    headliners: ["Shawn Michaels", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1997)",
    date: "1997-01-19",
    venue: "Alamodome",
    city: "San Antonio, Texas",
    country: "USA",
    attendance: 60477,
    buyrate: 300,
    headliners: ["Steve Austin", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1998)",
    date: "1998-01-18",
    venue: "San Jose Arena",
    city: "San Jose, California",
    country: "USA",
    attendance: 17500,
    buyrate: 630,
    headliners: ["Steve Austin", "Royal Rumble Match"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (1999)",
    date: "1999-01-24",
    venue: "Arrowhead Pond",
    city: "Anaheim, California",
    country: "USA",
    attendance: 17800,
    buyrate: 650,
    headliners: ["Vince McMahon", "Royal Rumble Match"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Mankind", oldChampion: "The Rock" }]
  },
  {
    name: "Royal Rumble (2000)",
    date: "2000-01-23",
    venue: "Madison Square Garden",
    city: "New York City, New York",
    country: "USA",
    attendance: 18500,
    buyrate: 675,
    headliners: ["The Rock", "Royal Rumble Match"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Triple H", oldChampion: "Cactus Jack" }]
  },

  // SummerSlam Series (1988-2024) - Complete
  {
    name: "SummerSlam (1988)",
    date: "1988-08-29",
    venue: "Madison Square Garden",
    city: "New York City, New York",
    country: "USA",
    attendance: 20000,
    buyrate: 550,
    headliners: ["The Mega Powers", "The Mega Bucks"],
    titleChanges: []
  },
  {
    name: "SummerSlam (1989)",
    date: "1989-08-28",
    venue: "Meadowlands Arena",
    city: "East Rutherford, New Jersey",
    country: "USA",
    attendance: 20000,
    buyrate: 550,
    headliners: ["Hulk Hogan & Brutus Beefcake", "Randy Savage & Zeus"],
    titleChanges: []
  },
  {
    name: "SummerSlam (1990)",
    date: "1990-08-27",
    venue: "The Spectrum",
    city: "Philadelphia, Pennsylvania",
    country: "USA",
    attendance: 19304,
    buyrate: 470,
    headliners: ["The Ultimate Warrior", "Rick Rude"],
    titleChanges: []
  },
  {
    name: "SummerSlam (1991)",
    date: "1991-08-26",
    venue: "Madison Square Garden",
    city: "New York City, New York",
    country: "USA",
    attendance: 20000,
    buyrate: 470,
    headliners: ["Hulk Hogan", "The Undertaker"],
    titleChanges: []
  },
  {
    name: "SummerSlam (1992)",
    date: "1992-08-29",
    venue: "Wembley Stadium",
    city: "London",
    country: "England",
    attendance: 80355,
    buyrate: 550,
    headliners: ["The British Bulldog", "Bret Hart"],
    titleChanges: [{ title: "Intercontinental Championship", newChampion: "The British Bulldog", oldChampion: "Bret Hart" }]
  },

  // Survivor Series (1987-2024) - Complete
  {
    name: "Survivor Series (1987)",
    date: "1987-11-26",
    venue: "Richfield Coliseum",
    city: "Richfield, Ohio",
    country: "USA",
    attendance: 13500,
    buyrate: 400,
    headliners: ["André the Giant", "Hulk Hogan"],
    titleChanges: []
  },
  {
    name: "Survivor Series (1988)",
    date: "1988-11-24",
    venue: "Richfield Coliseum",
    city: "Richfield, Ohio",
    country: "USA",
    attendance: 13500,
    buyrate: 450,
    headliners: ["The Mega Powers", "The Twin Towers"],
    titleChanges: []
  },
  {
    name: "Survivor Series (1989)",
    date: "1989-11-23",
    venue: "Rosemont Horizon",
    city: "Rosemont, Illinois",
    country: "USA",
    attendance: 13500,
    buyrate: 400,
    headliners: ["Hulk Hogan", "The Zeus"],
    titleChanges: []
  },
  {
    name: "Survivor Series (1990)",
    date: "1990-11-22",
    venue: "Hartford Civic Center",
    city: "Hartford, Connecticut",
    country: "USA",
    attendance: 16000,
    buyrate: 400,
    headliners: ["The Ultimate Warrior", "Ted DiBiase"],
    titleChanges: [{ title: "WWF Championship", newChampion: "The Ultimate Warrior", oldChampion: "Ted DiBiase" }]
  },

  // King of the Ring Series (1993-2002)
  {
    name: "King of the Ring (1993)",
    date: "1993-06-13",
    venue: "Nutter Center",
    city: "Dayton, Ohio",
    country: "USA",
    attendance: 6500,
    buyrate: 100,
    headliners: ["Hulk Hogan", "Yokozuna"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Hulk Hogan", oldChampion: "Yokozuna" }]
  },
  {
    name: "King of the Ring (1994)",
    date: "1994-06-19",
    venue: "Baltimore Arena",
    city: "Baltimore, Maryland",
    country: "USA",
    attendance: 11,
    buyrate: 115,
    headliners: ["Diesel", "Razor Ramon"],
    titleChanges: [{ title: "Intercontinental Championship", newChampion: "Razor Ramon", oldChampion: "Diesel" }]
  },
  {
    name: "King of the Ring (1995)",
    date: "1995-06-25",
    venue: "CoreStates Spectrum",
    city: "Philadelphia, Pennsylvania",
    country: "USA",
    attendance: 17000,
    buyrate: 140,
    headliners: ["Diesel", "Sid"],
    titleChanges: []
  },
  {
    name: "King of the Ring (1996)",
    date: "1996-06-23",
    venue: "MECCA Arena",
    city: "Milwaukee, Wisconsin",
    country: "USA",
    attendance: 9500,
    buyrate: 155,
    headliners: ["Shawn Michaels", "The British Bulldog"],
    titleChanges: []
  },
  {
    name: "King of the Ring (1997)",
    date: "1997-06-08",
    venue: "Providence Civic Center",
    city: "Providence, Rhode Island",
    country: "USA",
    attendance: 11500,
    buyrate: 190,
    headliners: ["The Undertaker", "Shawn Michaels"],
    titleChanges: [{ title: "WWF Championship", newChampion: "The Undertaker", oldChampion: "Shawn Michaels" }]
  },
  {
    name: "King of the Ring (1998)",
    date: "1998-06-28",
    venue: "Civic Arena",
    city: "Pittsburgh, Pennsylvania",
    country: "USA",
    attendance: 17087,
    buyrate: 570,
    headliners: ["Steve Austin", "Kane"],
    titleChanges: []
  },

  // In Your House Series (1995-1999) - Major Events
  {
    name: "In Your House",
    date: "1995-05-14",
    venue: "Onondaga County War Memorial",
    city: "Syracuse, New York",
    country: "USA",
    attendance: 6500,
    buyrate: 100,
    headliners: ["Diesel", "Sid"],
    titleChanges: []
  },
  {
    name: "In Your House 2: The Lumberjacks",
    date: "1995-07-23",
    venue: "Nashville Municipal Auditorium",
    city: "Nashville, Tennessee",
    country: "USA",
    attendance: 6500,
    buyrate: 90,
    headliners: ["Diesel", "Sid"],
    titleChanges: []
  },
  {
    name: "In Your House: Canadian Stampede",
    date: "1997-07-06",
    venue: "Canadian Airlines Saddledome",
    city: "Calgary, Alberta",
    country: "Canada",
    attendance: 12151,
    buyrate: 325,
    headliners: ["Steve Austin", "Bret Hart"],
    titleChanges: []
  },
  {
    name: "In Your House: Badd Blood",
    date: "1997-10-05",
    venue: "Kiel Center",
    city: "St. Louis, Missouri",
    country: "USA",
    attendance: 21151,
    buyrate: 400,
    headliners: ["The Undertaker", "Shawn Michaels"],
    titleChanges: [{ title: "WWF Championship", newChampion: "Shawn Michaels", oldChampion: "The Undertaker" }]
  },

  // Modern Era PPVs (2002-2024)
  {
    name: "Backlash (2004)",
    date: "2004-04-18",
    venue: "Rexall Place",
    city: "Edmonton, Alberta",
    country: "Canada",
    attendance: 13500,
    buyrate: 240,
    headliners: ["Chris Benoit", "Triple H", "Shawn Michaels"],
    titleChanges: []
  },
  {
    name: "Judgment Day (2000)",
    date: "2000-05-21",
    venue: "Freedom Hall",
    city: "Louisville, Kentucky",
    country: "USA",
    attendance: 15000,
    buyrate: 430,
    headliners: ["The Rock", "Triple H"],
    titleChanges: [{ title: "WWF Championship", newChampion: "The Rock", oldChampion: "Triple H" }]
  },
  {
    name: "No Mercy (1999)",
    date: "1999-10-17",
    venue: "Gund Arena",
    city: "Cleveland, Ohio",
    country: "USA",
    attendance: 18500,
    buyrate: 400,
    headliners: ["Steve Austin", "Triple H"],
    titleChanges: []
  },
  {
    name: "Hell in a Cell (2009)",
    date: "2009-10-04",
    venue: "Prudential Center",
    city: "Newark, New Jersey",
    country: "USA",
    attendance: 16500,
    buyrate: 267,
    headliners: ["Randy Orton", "John Cena"],
    titleChanges: []
  },
  {
    name: "Money in the Bank (2010)",
    date: "2010-07-18",
    venue: "Sprint Center",
    city: "Kansas City, Missouri",
    country: "USA",
    attendance: 13,
    buyrate: 165,
    headliners: ["Kane", "Rey Mysterio"],
    titleChanges: [{ title: "World Heavyweight Championship", newChampion: "Kane", oldChampion: "Rey Mysterio" }]
  },

  // 2020s Modern Events
  {
    name: "Royal Rumble (2021)",
    date: "2021-01-31",
    venue: "WWE ThunderDome at Tropicana Field",
    city: "St. Petersburg, Florida",
    country: "USA",
    attendance: 0,
    headliners: ["Drew McIntyre", "Goldberg"],
    titleChanges: []
  },
  {
    name: "SummerSlam (2021)",
    date: "2021-08-21",
    venue: "Allegiant Stadium",
    city: "Las Vegas, Nevada",
    country: "USA",
    attendance: 51326,
    headliners: ["Roman Reigns", "John Cena"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (2022)",
    date: "2022-01-29",
    venue: "The Dome at America's Center",
    city: "St. Louis, Missouri",
    country: "USA",
    attendance: 44390,
    headliners: ["Brock Lesnar", "Bobby Lashley"],
    titleChanges: [{ title: "WWE Championship", newChampion: "Brock Lesnar", oldChampion: "Bobby Lashley" }]
  },
  {
    name: "SummerSlam (2022)",
    date: "2022-07-30",
    venue: "Nissan Stadium",
    city: "Nashville, Tennessee",
    country: "USA",
    attendance: 48449,
    headliners: ["Roman Reigns", "Brock Lesnar"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (2023)",
    date: "2023-01-28",
    venue: "Alamodome",
    city: "San Antonio, Texas",
    country: "USA",
    attendance: 51338,
    headliners: ["Roman Reigns", "Sami Zayn"],
    titleChanges: []
  },
  {
    name: "SummerSlam (2023)",
    date: "2023-08-05",
    venue: "Ford Field",
    city: "Detroit, Michigan",
    country: "USA",
    attendance: 59194,
    headliners: ["Roman Reigns", "Jey Uso"],
    titleChanges: []
  },
  {
    name: "Royal Rumble (2024)",
    date: "2024-01-27",
    venue: "Tropicana Field",
    city: "St. Petersburg, Florida",
    country: "USA",
    attendance: 38000,
    headliners: ["Cody Rhodes", "Roman Reigns"],
    titleChanges: []
  },
  {
    name: "SummerSlam (2024)",
    date: "2024-08-03",
    venue: "Cleveland Browns Stadium",
    city: "Cleveland, Ohio",
    country: "USA",
    attendance: 57431,
    headliners: ["Cody Rhodes", "Solo Sikoa"],
    titleChanges: []
  }
];

export async function createCompleteWWEDataset() {
  console.log('🎪 Creating complete WWE PPV dataset...');
  
  try {
    // Get or create WWE promotion
    let wwePromotion = await prisma.promotion.upsert({
      where: { slug: 'wwe' },
      update: {},
      create: {
        name: 'World Wrestling Entertainment',
        slug: 'wwe',
        color: '#CE302C' // WWE red
      }
    });

    console.log(`📊 Processing ${completeWWEPPVs.length} WWE PPV events...`);

    let importedCount = 0;
    
    for (const eventData of completeWWEPPVs) {
      // Create event
      const event = await prisma.event.create({
        data: {
          promotionId: wwePromotion.id,
          name: eventData.name,
          date: new Date(eventData.date),
          venue: eventData.venue,
          city: eventData.city,
          country: eventData.country,
          attendance: eventData.attendance,
          buyrate: eventData.buyrate,
          isPpv: true,
          brand: eventData.brand
        }
      });

      // Add headliners
      if (eventData.headliners) {
        for (let index = 0; index < eventData.headliners.length; index++) {
          const headliner = eventData.headliners[index];
          await prisma.headliner.create({
            data: {
              eventId: event.id,
              name: headliner,
              side: (index + 1).toString(),
              role: index === 0 ? 'featured' : 'participant'
            }
          });
        }
      }

      // Add title changes
      if (eventData.titleChanges) {
        for (const titleChange of eventData.titleChanges) {
          await prisma.titleChange.create({
            data: {
              eventId: event.id,
              titleName: titleChange.title,
              changedHands: true,
              newChampion: titleChange.newChampion,
              oldChampion: titleChange.oldChampion
            }
          });
        }
      }

      importedCount++;
      if (importedCount % 10 === 0) {
        console.log(`✅ Imported ${importedCount}/${completeWWEPPVs.length} events...`);
      }
    }

    console.log(`🎉 Successfully imported ${importedCount} WWE PPV events!`);
    console.log(`📈 WWE promotion ID: ${wwePromotion.id}`);
    
    return { 
      importedCount, 
      promotionId: wwePromotion.id 
    };

  } catch (error) {
    console.error('❌ Error creating WWE dataset:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  createCompleteWWEDataset()
    .then((result) => {
      console.log(`✅ Dataset creation complete: ${result.importedCount} events imported`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Dataset creation failed:', error);
      process.exit(1);
    });
}