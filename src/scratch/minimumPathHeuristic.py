from dataclasses import dataclass
from math import sqrt
from typing import List

@dataclass
class Point():
    x: int
    y: int
    id: int

    def dist(self, other):
        return sqrt((self.x - other.x) ** 2 + (self.y - other.y) ** 2)

@dataclass
class State():
    ordering: List[Point] # order of nodes in current path
    to_visit: List[Point] # order of nodes in current path
    weight: int

    def accept(self):
        return self.to_visit == []

    def curr_node(self):
        return self.ordering[-1]

# memo for distance calculations
edges = {}
def get_dist(p1: Point, p2: Point):
    if (p1.id, p2.id) in edges:
        dist = edges[(p1.id, p2.id)]
    else:
        dist = p1.dist(p2)
        edges[(p1.id, p2.id)] = dist
        edges[(p2.id, p1.id)] = dist
    return dist

# note that naively, there are for n points
# there will be (n-1)! possible paths
#
# many of these will be invalid solutions
# with some pruning we may be able to get away
# with a simple backtracking algorithm
def best_path(points: List[Point]):

    _start_node = points[0]

    _ordering = [_start_node]
    _to_visit = [x for x in points if x != _start_node]

    curr_state = State(_ordering, _to_visit, 0)

    stack = [curr_state] # push search state onto the stack, backtrack until stack empty
    # solutions: List[State] = []
    n_search_nodes = 0
    best_solution = State([],[],float("inf"))

    while stack != []:
        # get search state from stack
        state = stack.pop()
        n_search_nodes += 1

        # reject candidate if worse than current best solution
        if state.weight > best_solution.weight:
            continue

        # accept candidate if valid solution
        # continue looking for a better one though
        if state.accept():
            print("found solution: ", "->".join(str(it.id) for it in state.ordering))
            best_solution = state
            continue

        node = state.curr_node()

        # calculate and memoise dist to neighbours
        # good heuristic would be to sort these new states before pushing
        candidates = []
        for other in state.to_visit:
            candidates.append(State(
                ordering=state.ordering + [other],
                to_visit=[x for x in state.to_visit if x != other],
                weight=state.weight + get_dist(node, other)
            ))
        # sorting by weight is a good heuristic to find the
        # better solutions faster => more pruning
        candidates.sort(key=lambda c: c.weight, reverse=True)
        # to improve efficiency could take e.g. best 5 paths here
        stack.extend(candidates[-1:])

    print("searched nodes:", n_search_nodes)
    print("\n\nbest solution is:", best_solution)
    print("distance:", best_solution.weight)


import random as r
r.seed(100)

def generate_dummy_points(n: int):
    return [Point(r.random() * n, r.random() * n, id) for id in range(n)]

# currently can only search 12 tracks (~1 million search nodes)
# after this, the search becomes too deep
best_path(generate_dummy_points(100))