# College-Basketball-API
### Christian Tropeano
### Will Update Endpoints when I deploy API
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
http://localhost:3000/teams/all
```
This will send to the client an array of every team as a JSON.

### Fetch One Team By Name:
To only get one team by name, use the following:
```
http://localhost:3000/teams/*team_name*
```
where *team_name* is the name of the team that you want to fetch.
**Important**: If you want to fetch a team that contains spaces (i.e. Oral Roberts, Wright State, etc.), write the name of the team, however replace the spaces with underscores. So instead of ```Oral Roberts```, please use ```Oral_Roberts```.

### Sort Teams by a Statistic
[Here is the table of eligible statistics you can query for](#table-of-statistics)

To sort the teams by a statistic, use the following:
```
http://localhost:3000/teams/sort/*stat_to_sort_by*/*asc/des*
```
where *stat_to_sort_by* is that stat that you want to sort the teams by and *asc/des* is whether you want to sort the teams by **asc**ending value or **des**cending value.

### Fetch a Team with the Most/Least of a Statistic
To find the team with the most/least of a statistic, use:
```
http://localhost:3000/teams/extreme/*stat*/*most/least*
```
where the *stat* is the stat you want to check and *most/least* is which extreme you want.

### Fetch Two Teams to Compare
If you want to fetch two teams and compare their stats, use the following:
```
http://localhost:3000/teams/compare/*team1*/*team2*
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
http://localhost:3000/teams/sort/threePointAttPG/asc
```

## Features To Be Implemented
- The ability to fetch multiple teams (to be able to compare all of them)
- Compare players (compare players' statistics)
- Add examples of using endpoints (will do when I deploy the API).
- More descriptive (and accurate) errors/Error middleware

## Problem?
If you notice a problem (a team has the incorrect statistics, some functionality does not work, etc.) then please create an issue with a description of the issue and how you reproduced that mishap. A helpful issue would include:
- A short but descriptive title about the problem
- The endpoint that you used that caused the error
- Steps to replicate that issue
- An image of your code/the result that the endpoint produced
Any more information would be very helpful in debugging and resolving the issue.


