# Python program to turn the csv file of team statistic to JSON objects
import pandas
excel_data_df = pandas.read_excel('team_stats.xlsx', sheet_name='Sheet1')

json_str = excel_data_df.to_json(orient='records')

# print('Excel Sheet to JSON:\n', json_str)

file = open("teams_stats.json", "w")
file.write(json_str)
file.close()
