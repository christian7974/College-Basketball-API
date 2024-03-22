# College-Basketball-API

# Table of Contents
1. [Features/Functionality](#featuresfunctionality)
2. [Table of Statistics](#table-of-statistics)
3. [Examples/Results of Use](#examplesresults-of-use)
4. [Handling Errors](#handling-errors)
5. [Problem/How to Contribute](#problem)

# Description of Project
This is an API that has the 2023-2024 Statistics of every NCAA DI Men's Basketball team in the country. There is also functionality to fetch all teams and their stats, fetch a team by name as well as other capabilities.  

I also wanted to make an API that was easy to use and had ample documentation so that someone who is unfamiliar with using an API can feel comfortable using it and get as much out of it as someone who is technically literate. If anything in the documentation is unclear (such as how to use a feature or how to read an error message), please create an issue with your question and I would be happy to help (or someone else may get to help before I can). 

This is the **second** iteration of the project, where I wrote a python script to scrape the information off of [College Basketball Reference](https://www.sports-reference.com/cbb/seasons/men/2024-school-stats.html#basic_school_stats) to get the most up-to-date statistics. The first version of this project relied on a spreadsheet, however I wanted to learn the web scraping tool [Beautiful Soup](https://beautiful-soup-4.readthedocs.io/en/latest/#) which is what I used to scrape the website.

This project was made using Node.js, Express, Mongoose/MongoDB and hosted on Render.  

# Challenges I Faced
One challenge I faced was figuring out how to address using multiple parameters in the same endpoint (for instance, for the sort function). I learned that you could acheive this by doing 
```
const parameter1 = req.params['parameter1'];
const parameter2 = req.params['parameter2'];
```
and by doing so, you can access multiple parameters and use both of them in your calculations. 

Another challenge that I faced was learning how to use MongoDB and Mongoose, as this was my first project using a NoSQL database. However, it was very easy to learn and I enjoyed using it throughout this project.  

Another challenge that I faced (and continue to face) is what functionality to add to the API. One thing that helped me come up with functionality was thinking about what I would do with the data if I needed this information. This is how I came up with the idea for the idea of fetching two teams, getting the team with the highest/lowest of a statistic as well as sorting teams by a statistic.  

# Inspiration
I got the inspiration for this project when I wanted something to help me create a bracket for March Madness. I could not find a tool that listed out every statistic for a team (ESPN did not have enough statistics to make a good decision). The ones that did were either really difficult to use or were not free.  

I made this tool so that other people can have access to statistics about every NCAA Division I Men's Basketball team and can use that information to make better brackets and to have more fun during March Madness.

# Features/Functionality

## Fetch Every Team
To fetch every team and their statistics, use the following:
```
https://college-basketball-api.onrender.com/teams/all
```
This will send an array of every team as a JSON object to the client. **This is automatically sorted by team name, starting with A**.

## Fetch One Team By Name:
To only get one team by name, use the following:
```
https://college-basketball-api.onrender.com/teams/team_name
```
where *team_name* is the name of the team that you want to fetch.
**Important**: If you want to fetch a team that contains spaces (i.e. Oral Roberts, Wright State, etc.), write the name of the team, however replace the spaces with underscores. So instead of ```Oral Roberts```, please use ```Oral_Roberts```. The team names are not case-sensitive, so oRaL_rObErTs is equivalent to oral_roberts, or ORAL_ROBERTS.

## Sort Teams by a Statistic
[Here is the table of eligible statistics you can query for](#table-of-statistics)

To sort the teams by a statistic, use the following:
```
https://college-basketball-api.onrender.com/teams/sort/stat_to_sort_by/order
```
where *stat_to_sort_by* is that stat that you want to sort the teams by and *order* is whether you want to sort the teams by **asc**ending value or **des**cending value.

## Fetch a Team with the Most/Least of a Statistic
To find the team with the most/least of a statistic, use:
```
https://college-basketball-api.onrender.com/teams/extreme/stat/extreme
```
where the *stat* is the stat you want to check and *extreme* is which extreme you want (*most* being the team with the highest of that stat, least being the lowest of that stat).

## Fetch Two Teams to Compare
If you want to fetch two teams and compare their stats, use the following:
```
https://college-basketball-api.onrender.com/teams/compare/team1/team2
```
where *team1* is the first team that you want to compare and *team2* is the second team that you want to compare. This returns an array of JSON objects with both teams in the array.

## Table of Statistics
| Abberbiation   | Statistic                                        |
|----------------|--------------------------------------------------|
| School Name    | The name of the school                 |
| Wins           | Total number of games won              |
| Losses         | Total number of games lost             |
| Win-Loss Pct   | Winning percentage of the team         |
| SRS            | Simple Rating System, a team rating that takes into account average point differential and strength of schedule |
| SOS            | Strength of Schedule, a measure of the difficulty of a team's schedule |
| Wins Conf      | Number of conference games won         |
| Losses Conf    | Number of conference games lost        |
| Wins Home      | Number of home games won               |
| Losses Home    | Number of home games lost              |
| Wins Visitor   | Number of away games won               |
| Losses Visitor | Number of away games lost              |
| PTS            | Total points scored                    |
| Opp PTS        | Total points scored by opponents against the team|
| MP             | Total minutes played                   |
| FG             | Total field goals made                 |
| FGA            | Total field goals attempted            |
| FG Pct         | Field goal percentage (FG/FGA)         |
| FG3            | Total three-point field goals made     |
| FG3A           | Total three-point field goals attempted |
| FG3 Pct        | Three-point field goal percentage (FG3/FG3A) |
| FT             | Total free throws made                 |
| FTA            | Total free throws attempted            |
| FT Pct         | Free throw percentage (FT/FTA)         |
| ORB            | Total offensive rebounds grabbed       |
| TRB            | Total rebounds grabbed                 |
| AST            | Total assists made                     |
| STL            | Total steals made                      |
| BLK            | Total blocks made                      |
| TOV            | Total turnovers committed              |
| PF             | Total personal fouls committed         |


For instance, if you wanted to sort teams by their 3-point shots attempted per game ascending, it would look something like:
```
https://college-basketball-api.onrender.com/teams/sort/threePointAttPG/asc
```

# Examples/Results Of Use

## 1. Fetch One Team By Name  
If you wanted to find the stats for Gonzaga, use the following:  
```
https://college-basketball-api.onrender.com/teams/gonzaga
```  
which would return the following JSON:

```JSON
{
	"school_name": "Gonzaga",
	"wins": 25,
	"losses": 7,
	"win_loss_pct": 0.781,
	"srs": 17.35,
	"sos": 3.06,
	"wins_conf": 14,
	"losses_conf": 2,
	"wins_home": 13,
	"losses_home": 2,
	"wins_visitor": 8,
	"losses_visitor": 2,
	"pts": 2716,
	"opp_pts": 2207,
	"mp": 1280,
	"fg": 1025,
	"fga": 1985,
	"fg_pct": 0.516,
	"fg3": 219,
	"fg3a": 619,
	"fg3_pct": 0.354,
	"ft": 447,
	"fta": 620,
	"ft_pct": 0.721,
	"orb": 350,
	"trb": 1246,
	"ast": 530,
	"stl": 222,
	"blk": 128,
	"tov": 313,
	"pf": 503
}
```

## 2. Sort Teams by Statistic  
If you wanted to sort all of the teams by blocks per game ascending, use the following:  
```
https://college-basketball-api.onrender.com/teams/sort/blocksPG/asc
```  
which would send the client an array of every team sorted by blocks per game in ascending order:
```JSON
[
	{
		"school_name": "North Dakota State",
		"wins": 15,
		"losses": 17,
		"win_loss_pct": 0.469,
		"srs": -7.27,
		"sos": -2.86,
		"wins_conf": 8,
		"losses_conf": 8,
		"wins_home": 10,
		"losses_home": 4,
		"wins_visitor": 5,
		"losses_visitor": 11,
		"pts": 2388,
		"opp_pts": 2366,
		"mp": 1315,
		"fg": 873,
		"fga": 1834,
		"fg_pct": 0.476,
		"fg3": 252,
		"fg3a": 667,
		"fg3_pct": 0.378,
		"ft": 390,
		"fta": 543,
		"ft_pct": 0.718,
		"orb": 271,
		"trb": 1097,
		"ast": 370,
		"stl": 139,
		"blk": 43,
		"tov": 355,
		"pf": 468
	},
	{
		"school_name": "UC Riverside",
		...
```

## 3. Fetch a Team with the Extreme of a Stat  
If you wanted to find the team with the most offensive rebounds per game, use the following:  
```
https://college-basketball-api.onrender.com/teams/extreme/offReboundsPG/most
```  
which would result in the following:  
```JSON
{
	"school_name": "Texas A&M",
	"wins": 20,
	"losses": 14,
	"win_loss_pct": 0.588,
	"srs": 12.97,
	"sos": 9,
	"wins_conf": 9,
	"losses_conf": 9,
	"wins_home": 10,
	"losses_home": 5,
	"wins_visitor": 6,
	"losses_visitor": 6,
	"pts": 2543,
	"opp_pts": 2408,
	"mp": 1365,
	"fg": 862,
	"fga": 2158,
	"fg_pct": 0.399,
	"fg3": 234,
	"fg3a": 823,
	"fg3_pct": 0.284,
	"ft": 585,
	"fta": 825,
	"ft_pct": 0.709,
	"orb": 587,
	"trb": 1452,
	"ast": 384,
	"stl": 242,
	"blk": 98,
	"tov": 327,
	"pf": 566
}
```

## 4. Fetch Two Teams to Compare  
If you wanted to compare the statistics of Connecticut and Southern Indiana, the following would be used:
```
https://college-basketball-api.onrender.com/teams/compare/connecticut/southern_indiana
```  
and the outcome would be:
```JSON
[
	{
		"school_name": "Connecticut",
		"wins": 31,
		"losses": 3,
		"win_loss_pct": 0.912,
		"srs": 24.5,
		"sos": 7.44,
		"wins_conf": 18,
		"losses_conf": 2,
		"wins_home": 16,
		"losses_home": 0,
		"wins_visitor": 9,
		"losses_visitor": 3,
		"pts": 2770,
		"opp_pts": 2190,
		"mp": 1360,
		"fg": 989,
		"fga": 1994,
		"fg_pct": 0.496,
		"fg3": 299,
		"fg3a": 815,
		"fg3_pct": 0.367,
		"ft": 493,
		"fta": 664,
		"ft_pct": 0.742,
		"orb": 395,
		"trb": 1308,
		"ast": 630,
		"stl": 212,
		"blk": 183,
		"tov": 335,
		"pf": 552
	},
	{
		"school_name": "Southern Indiana",
		"wins": 8,
		"losses": 24,
		"win_loss_pct": 0.25,
		"srs": -13.46,
		"sos": -5.43,
		"wins_conf": 5,
		"losses_conf": 13,
		"wins_home": 5,
		"losses_home": 10,
		"wins_visitor": 3,
		"losses_visitor": 13,
		"pts": 2195,
		"opp_pts": 2335,
		"mp": 1285,
		"fg": 737,
		"fga": 1811,
		"fg_pct": 0.407,
		"fg3": 215,
		"fg3a": 664,
		"fg3_pct": 0.324,
		"ft": 506,
		"fta": 679,
		"ft_pct": 0.745,
		"orb": 319,
		"trb": 1139,
		"ast": 362,
		"stl": 204,
		"blk": 94,
		"tov": 423,
		"pf": 672
	}
]
```

# Handling Errors
When using this API, you may mispell a team name (Orel Roberts vs Oral Roberts) or try to find a stat that is not accounted for (for instance, OREB% or FPG). If that is the case, a JSON object will be sent to the user that has a key called "error" that has a value with the error message. This allows for people using the API to easily see what went wrong when using that endpoint and to display that error if someone using their app tries to make an invalid request. 

For instance, if you tried to use this endpoint (notice the two teams that are being compared):
```
https://college-basketball-api.onrender.com/teams/compare/road_island/gonzaguh
```
you would get the following JSON:
```JSON
{
	"error": "Road Island and Gonzaguh are not in the database of teams. Please use two different teams."
}
```
alerting you that those teams do not exist in the database. If you tried using this endpoint:
```
https://college-basketball-api.onrender.com/teams/extreme/fouls/most
```
the following JSON would be sent to the client:
```JSON
{
	"error": "fouls is not a valid statistic. Please refer to documentation to find a proper stat."
}
```
letting them know that fouls is not a statistic stored for the teams.


# Features To Be Implemented
- The ability to fetch ~~multiple~~ more than 2 teams (to be able to compare all of them)
- Compare players

If you have an idea for extra functionality/any comments involving the API, please make an issue explaining your idea and I would be happy to take a look.

# Problem?
If you notice a problem (a team has an incorrect value for a statistic, some functionality does not work, etc.) then please create an issue with a description of the issue and how you reproduced that mishap. A helpful issue would include:
- A short but descriptive title about the problem
- The URL that you used that caused the error
- Steps to replicate that issue
- An image of your code and the result that the endpoint produced  

Any more information would be very helpful in debugging and resolving the issue.


