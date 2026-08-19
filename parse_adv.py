import re
import json

with open('referencias/3DeT-Victory-Ebook.md', 'r') as f:
    lines = f.readlines()

advantages = []
disadvantages = []
current_list = None
current_item = None

# Vantagens start around line 1025. Desvantagens around line 1800.
# The format is typically:
# Nome da Vantagem 1pt
# Description...

# We'll use a regex to catch them. Since formatting might be tricky,
# I'll just write a quick script to find lines ending in "pt" or "pts"
# followed by description, but actually it's easier to just list the known ones
# or let an AI tool extract them.

