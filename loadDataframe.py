import json
import pandas as pd
import matplotlib.pyplot as plt


with open("data.json") as json_data:
    d = json.load(json_data)

cleanedPosts = []

for x in d:
    array = [
        x["contributer"],
        x["title"],
        x["body"],
        x["timestamp"],
        x["publication"],
        x["nft"],
        x["transaction"],
    ]

    cleanedPosts.append(array)

df = pd.DataFrame(
    cleanedPosts,
    columns=[
        "contributer",
        "publication",
        "title",
        "body",
        "timestamp",
        "nft",
        "transaction",
    ],
)

df.to_csv("data.csv")
print(df)
