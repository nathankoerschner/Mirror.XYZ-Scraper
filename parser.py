import json
import pandas as pd
import matplotlib.pyplot as plt


with open('allMirrorData.json') as json_data:
    d = json.load(json_data)

# create a list of lists with ticket, [contributers]
cleanedTickets = []

for x in d :
    transactionId = x["node"]["id"]
    contributer = x["node"]["tags"][2]["value"]

    cleanedTickets.append([transactionId, contributer])



df = pd.DataFrame(cleanedTickets, columns = ["transactionId", "Contributer"])
df.to_csv('mirrorTickets.csv')

fig, ax = plt.subplots()

df["Contributer"].value_counts(False, True, False).plot(ax=ax, kind='bar', xlabel='numbers', ylabel='frequency')

plt.show()