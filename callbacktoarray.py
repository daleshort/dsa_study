from typing import Any


class word:
    def __init__(self) -> None:
        self.list = []
    def addToList(self,val) ->None:
        self.list.append(val)

    def printList(self) -> None:
        print(self.list)

meow = word()
meow.addToList(3)
meow.printList()