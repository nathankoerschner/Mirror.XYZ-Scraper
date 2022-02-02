import pandas as pd

contributerAmounts = pd.read_csv("./tables/contributerAmounts.csv")
print(contributerAmounts)
contributerAmounts["Number of posts at this level"] = (
    contributerAmounts["Number of posts in contributers history"]
    * contributerAmounts["Number of contributers"]
)

print(contributerAmounts)


df2 = contributerAmounts["Number of posts at this level"].iloc[5:]
print(df2)
print(df2.sum())
