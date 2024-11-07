isbn = input()

f = open("user/ProductDatabase.csv", "r", encoding="utf-8")
items = f.read().split("\n")
f.close()

# item search
found = False
for item in items[1:]:
    _isbn, name, cost = item.split(",")
    if isbn == _isbn:
        found = True
        break


if found:
    print("{},{},{}".format(isbn, name, cost))
else:
    print("not found")
