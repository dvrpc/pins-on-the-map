import os
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv())

TAGS = {}
for i in range(1, 11):
    txt = os.getenv(f"TAG_{i}", None)
    if txt:
        TAGS[i] = txt


print(TAGS)
