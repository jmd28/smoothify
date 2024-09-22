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

# (repeated nearest neighbour (NN)) (RNN) should do a decent job on average

# given n points, NN search size is n nodes - at each node it looks at the
# (up to) n-1 neighbours => O(n^2)
#
# if we repeat for each starting node we can find a decent solution in O(n^3)
# this gets us up to around 100 nodes
def rnn(points: List[Point], ratio=1):

    def create_initial_state(_start_node):
        _ordering = [_start_node]
        _to_visit = [x for x in points if x != _start_node]
        return State(_ordering, _to_visit, 0)

    # stack = [create_initial_state(points[0])] # nearest-neighbour
    stack = [create_initial_state(n) for n in points[:max(1, int(len(points) * ratio))]] # repeated-ish nn

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
        if state.accept():
            # print("found solution: ", "->".join(str(it.id) for it in state.ordering))
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
        # choose the best neighbour node
        nn = min(candidates, key=lambda c: c.weight)
        stack.append(nn)

    # print("searched nodes:", n_search_nodes)
    # print("\n\nbest solution is:", best_solution)
    # print("distance:", best_solution.weight)
    return best_solution


import random as rand
from collections import defaultdict
# rand.seed(20)

def generate_dummy_points(n: int):
    return [Point(rand.random() * n, rand.random() * n, id) for id in range(n)]

total_shitness = defaultdict(int)
n_trials = 5

for _ in range(n_trials):
    for r in reversed([1,2,5,10,20,50,75,100]):
        solution = rnn(generate_dummy_points(50), r/100)
        if r == 100:
            best_sol = solution

        shitness = solution.weight / best_sol.weight
        total_shitness[r] += shitness
        print(f"r={r}%: {solution.weight} shitness={shitness * 100:.2f}%")

print("----------")
for r, v in total_shitness.items():
    print(f"r={r}%: {solution.weight} avg shitness={v / n_trials * 100:.2f}%")
