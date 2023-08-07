# College-Basketball-API
### Christian Tropeano

## Description of Project
This is an API that has the 2023-2024 Statistics of every NCAA DI Men's Basketball team in the country. There is also some functionality to fetch all teams and their stats, fetch a team by name as well as other functions.  
This project was made using Node.js, Express, Mongoose/MongoDB and hosted on **TBD**.  

## Challenges I Faced
Some challenges I faced was figuring out how to address using multiple parameters in the same endpoint (for instance, for the sort function). I learned that you could do something like 
```
const parameter1 = req.params['parameter1'];
const parameter2 = req.params['parameter2'];
```
and by doing so, you can access multiple parameters and use both of them to fetch information.  

## Inspiration
I got the inspiration for this project when I wanted something to help me create a bracket for March Madness. I could not find a tool that listen out every statistic for a team (ESPN did not have enough statistics to make a good decision). The ones that did were either really difficult to use or were not free.  
I made this tool so that other people can have access to statistics about every NCAA Division I and can use that information to make better brackets and to have more fun during March Madness.

## Features/Functionality

### Fetch Every Team
To get all of the statistics of a team, use the following:
```
https://college-basketball-api.onrender.com/teams/all
```
This will send an array of every team as a JSON object to the client.

### Fetch One Team By Name:
To only get one team by name, use the following:
```
https://college-basketball-api.onrender.com/teams/*team_name*
```
where *team_name* is the name of the team that you want to fetch.
**Important**: If you want to fetch a team that contains spaces (i.e. Oral Roberts, Wright State, etc.), write the name of the team, however replace the spaces with underscores. So instead of ```Oral Roberts```, please use ```Oral_Roberts```.

### Sort Teams by a Statistic
[Here is the table of eligible statistics you can query for](#table-of-statistics)

To sort the teams by a statistic, use the following:
```
https://college-basketball-api.onrender.com/teams/sort/*stat_to_sort_by*/*asc/des*
```
where *stat_to_sort_by* is that stat that you want to sort the teams by and *asc/des* is whether you want to sort the teams by **asc**ending value or **des**cending value.

### Fetch a Team with the Most/Least of a Statistic
To find the team with the most/least of a statistic, use:
```
https://college-basketball-api.onrender.com/teams/extreme/*stat*/*most/least*
```
where the *stat* is the stat you want to check and *most/least* is which extreme you want.

### Fetch Two Teams to Compare
If you want to fetch two teams and compare their stats, use the following:
```
https://college-basketball-api.onrender.com/teams/compare/*team1*/*team2*
```
where *team1* is the first team that you want to compare and *team2* is the second team that you want to compare. This returns an array of JSON objects with both teams in the array.

### Table of Statistics
| Abbreviation      | Statistic |
| --------          | -------   |
| pointsPG          | The points per game that that team score |
| fieldGoalsMadePG  | The field goals made per game |
| fieldGoalsAttPG   | The amount of field goals attempted per game |
| FGPercent         | The percent of field goals that the team made throughout the season |
| threePointMadePG  | The average amount of made 3-point shots made per game |
| threePointAttPG   | The average amount of 3-point shots attempted per game |
| threePointPercent | The percent that the team shot from 3 per game |
| freeThrowMadePG   | The number of free throw shots made per game |
| freeThrowAttPG    | The number of free throw shots attempted per game |
| freeThrowPercent  | The percentage of free throws that a team made throughout the season |
| offReboundsPG     | The amount of offensive rebounds a team secured per game |
| defReboundsPG     | The amount of defensive rebounds a team secured per game  |
| totalReboundsPG   | The amount of total rebounds a team secured per game  |
| assistsPG         | The average amount of assists that team had per game |
| stealsPG          | The average amount of steals that team had per game |
| blocksPG          | The average amount of blocks that team had per game |
| turnoversPG       | The average amount of turnovers that team had per game |

For instance, if you wanted to sort teams by their 3-point shots attempted per game ascending, it would look something like:
```
https://college-basketball-api.onrender.com/teams/sort/threePointAttPG/asc
```

## Examples/Results Of Use
1. Fetch One Team By Name  
    a. If you wanted to find the stats for Gonzaga, use the following:  
    ```https://college-basketball-api.onrender.com/teams/gonzaga```  
    which would return the following JSON:
    ```JSON
    {
        "name": "Gonzaga",
        "pointsPG": 86.1,
        "fieldGoalsMadePG": 32.1,
        "fieldGoalsAttPG": 61.7,
        "FGPercent": 0.521,
        "threePointMadePG": 7.5,
        "threePointAttPG": 19.9,
        "threePointPercent": 0.379,
        "freeThrowMadePG": 14.4,
        "freeThrowAttPG": 20.8,
        "offReboundsPG": 9.7,
        "defReboundsPG": 25.9,
        "totalReboundsPG": 35.7,
        "assistsPG": 16.2,
        "stealsPG": 7.2,
        "blocksPG": 3.4,
        "turnoversPG": 10.6
    }
    ```

2. Sort Teams by Statistic  
    a. If you wanted to sort all of the teams by blocks per game descending, use the following:  
    ```https://college-basketball-api.onrender.com/teams/sort/blocksPG/asc```  
    which would send the client an array of every team sorted by blocks per game in descending order:
    ```JSON
    [
        {
            "name": "Utah Valley",
            "pointsPG": 77.4,
            "fieldGoalsMadePG": 27.6,
            "fieldGoalsAttPG": 59.5,
            "FGPercent": 0.465,
            "threePointMadePG": 6.5,
            "threePointAttPG": 19.7,
            "threePointPercent": 0.332,
            "freeThrowMadePG": 15.6,
            "freeThrowAttPG": 21.1,
            "offReboundsPG": 9.6,
            "defReboundsPG": 29.5,
            "totalReboundsPG": 39.1,
            "assistsPG": 16.1,
            "stealsPG": 6.5,
            "blocksPG": 6.5,
            "turnoversPG": 13.6
        },
        ...
        {
            "name": "Virginia Military",
            "pointsPG": 69.4,
            "fieldGoalsMadePG": 25,
            "fieldGoalsAttPG": 60.1,
            "FGPercent": 0.416,
            "threePointMadePG": 9.7,
            "threePointAttPG": 27.5,
            "threePointPercent": 0.351,
            "freeThrowMadePG": 9.7,
            "freeThrowAttPG": 12.7,
            "offReboundsPG": 9.9,
            "defReboundsPG": 23.5,
            "totalReboundsPG": 33.3,
            "assistsPG": 11.4,
            "stealsPG": 5.4,
            "blocksPG": 1.2,
            "turnoversPG": 12.6
        }
    ]
    ```

3. Fetch a Team with the Extreme of a Stat  
a. If you wanted to find the team with the most offensive rebounds per game, use the following:  
```https://college-basketball-api.onrender.com/teams/extreme/offReboundsPG/most```  
which would result in the following:  
```JSON
{
	"name": "South Carolina State",
	"pointsPG": 73.5,
	"fieldGoalsMadePG": 27.1,
	"fieldGoalsAttPG": 64.1,
	"FGPercent": 0.422,
	"threePointMadePG": 6.9,
	"threePointAttPG": 21.7,
	"threePointPercent": 0.318,
	"freeThrowMadePG": 12.5,
	"freeThrowAttPG": 18.6,
	"offReboundsPG": 12.7,
	"defReboundsPG": 20.8,
	"totalReboundsPG": 33.5,
	"assistsPG": 14,
	"stealsPG": 7.2,
	"blocksPG": 3.3,
	"turnoversPG": 15.7
}
```

4. Fetch Two Teams to Compare  
If you wanted to compare the statistics of Connecticut and Southern Indiana, the following would be used:
```https://college-basketball-api.onrender.com/teams/compare/connecticut/southern_indiana```  
and the outcome would be:
```JSON
[
	{
		"name": "Connecticut",
		"pointsPG": 78.6,
		"fieldGoalsMadePG": 27.7,
		"fieldGoalsAttPG": 59.8,
		"FGPercent": 0.464,
		"threePointMadePG": 9.1,
		"threePointAttPG": 24.9,
		"threePointPercent": 0.363,
		"freeThrowMadePG": 14,
		"freeThrowAttPG": 18.4,
		"offReboundsPG": 12.2,
		"defReboundsPG": 25.6,
		"totalReboundsPG": 37.7,
		"assistsPG": 17.5,
		"stealsPG": 6.3,
		"blocksPG": 4.9,
		"turnoversPG": 12.6
	},
	{
		"name": "Southern Indiana",
		"pointsPG": 75.8,
		"fieldGoalsMadePG": 26.3,
		"fieldGoalsAttPG": 60.6,
		"FGPercent": 0.434,
		"threePointMadePG": 9.7,
		"threePointAttPG": 25.9,
		"threePointPercent": 0.375,
		"freeThrowMadePG": 13.5,
		"freeThrowAttPG": 20.1,
		"offReboundsPG": 11.1,
		"defReboundsPG": 25.3,
		"totalReboundsPG": 36.4,
		"assistsPG": 12.7,
		"stealsPG": 7.2,
		"blocksPG": 2.3,
		"turnoversPG": 13
	}
]
```

## Features To Be Implemented
- The ability to fetch ~~multiple~~ more than 2 teams (to be able to compare all of them)
- Compare players (compare players' statistics)
- More descriptive (and accurate) errors/Error middleware

## Problem?
If you notice a problem (a team has the incorrect statistics, some functionality does not work, etc.) then please create an issue with a description of the issue and how you reproduced that mishap. A helpful issue would include:
- A short but descriptive title about the problem
- The endpoint that you used that caused the error
- Steps to replicate that issue
- An image of your code/the result that the endpoint produced  

Any more information would be very helpful in debugging and resolving the issue.


