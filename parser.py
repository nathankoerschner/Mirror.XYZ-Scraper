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
df.to_json('mirrorTickets.json')

#fig, ax = plt.subplots()
#df["Contributer"].value_counts(False, True, False).plot(ax=ax, kind='bar', xlabel='numbers', ylabel='frequency')
#plt.show()

postCounts = df["Contributer"].value_counts(False, True, True)

def contributersWithNPosts(n):
    publications = []
    for x in postCounts :
        if x == n:
            publications.append(x)
    return len(publications)

print(len(postCounts)) # 18412 total contributers on mirror, with 
print(contributersWithNPosts(1)) # only 8745 have published only once, a little over half have published more than once
print(contributersWithNPosts(2))
print(contributersWithNPosts(3))
print(contributersWithNPosts(4))
print(contributersWithNPosts(5))

# create a list of all frequencies of different numbers of posts
n = 0
forNpostsNumberOfContributers = []
while n < 100 :
    forNpostsNumberOfContributers.append(contributersWithNPosts(n))
    n += 1
print(forNpostsNumberOfContributers)