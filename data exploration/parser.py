import json
import pandas as pd
import matplotlib.pyplot as plt


with open("./allMirrorData.json") as json_data:
    d = json.load(json_data)

# create a list of lists with ticket, [contributers]
cleanedTickets = []

for x in d:
    transactionId = x["node"]["id"]
    contributer = x["node"]["tags"][2]["value"]

    cleanedTickets.append([transactionId, contributer])


df = pd.DataFrame(cleanedTickets, columns=["transactionId", "Contributer"])
df = df.drop_duplicates()


postCounts = df["Contributer"].value_counts(False, True, True)
ticketTotalUnique = df["transactionId"].value_counts(
    False, True, False
)  # verifies that there is one contributer for each post


def contributersWithNPosts(n):
    publications = []
    for x in postCounts:
        if x == n:
            publications.append(x)
    return len(publications)


# create a list of all frequencies of different numbers of posts
n = 0
forNpostsNumberOfContributers = []
while n < 484:
    forNpostsNumberOfContributers.append([n, contributersWithNPosts(n)])
    n += 1

df1 = pd.DataFrame(
    forNpostsNumberOfContributers,
    columns=["Number of posts in contributers history", "Number of contributers"],
)
df1.to_csv("contributerAmounts.csv")
df["Contributer"].value_counts(False, True, False).to_csv("addressesAndFrequencies.csv")
