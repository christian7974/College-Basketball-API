from bs4 import BeautifulSoup
import requests
import json

url = "https://www.sports-reference.com/cbb/seasons/men/2024-school-stats.html#basic_school_stats"
response = requests.get(url)

# array of all the teams
array_of_teams = []

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    title = soup.title
    all_table_rows = soup.find_all("tr")
    for row in all_table_rows:
        individual_team = {}
        # find all the team names
        all_tds = row.find_all("td")
        for td in all_tds:
            if (td['data-stat'] != "DUMMY"):
                # this prints out each stat with the number
                # print(td['data-stat'] + " " + td.text)
                # file.write("\n")
                # if (td['data-stat'] == "school_name"):
                #     if len(td.text.split()) > 1:
                #         # put these two words together
                #         file.write(td.text.split()[0] + "" + td.text.split()[1] + " ")
                #     else: # this checks if the school_name is only one word
                #         file.write(td.text + " ")
                # # add everything after the school_name
                # else:
                if (td['data-stat'] == "school_name"):
                    individual_team[td['data-stat']] = td.text
                else:
                    # make it so that the program continues if the cell is blank
                    if td.text == "":
                        individual_team[td['data-stat']] = 0
                    else:
                        individual_team[td['data-stat']] = float(td.text)
        array_of_teams.append(individual_team)

else:
    print("Error: " + str(response.status_code))
# print(array_of_teams[0])
# write the array to a json file
# pretty print the array of json objects
with(open("teams.json", "w")) as file:
    file.write(json.dumps(array_of_teams, indent=4))
# write the array to a json file