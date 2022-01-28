import json
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data.csv")


publicationCounts = df["publication"].value_counts(False, True, False)
publicationNames = df["publication"].value_counts(False, True, False).index.tolist()

publications = {"name": publicationNames, "count": publicationCounts}


publicationsDataframe = pd.DataFrame(publications)
print(publicationsDataframe)

publicationsDataframe.to_csv("publicationsByFrequency.csv")
