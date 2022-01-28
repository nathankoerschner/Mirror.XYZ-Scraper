# Exploring the final data exported from runPipeline.js
import json
from math import gamma
import pandas as pd
import matplotlib.pyplot as plt


df = pd.read_csv("data.csv")
df.drop_duplicates()
publicationCounts = df["publication"].value_counts(False, True, False)
nfts = df["nft"].value_counts(False, True, False)

print(publicationCounts)
# print(publicationCounts)
# print(df.loc[df["publication"] == "When Life Is Slow, Go Even Slower - Forge"])

g = df.loc[
    df["publication"] == "An Extended Break From the Rat Race Has Changed My Life"
]

g.to_csv("An Extended Break From the Rat Race Has Changed My Life.csv")

print(g)
