export const monsters = [
  {
    name: "Kobold",
    hp: 2 + Math.ceil(Math.random() * 6),
    strength: 1 + Math.ceil(Math.random() * 3),
    xp: 3,
  },
  {
    name: "Goblin",
    hp: 5 + Math.ceil(Math.random() * 6),
    strength: 1 + Math.ceil(Math.random() * 6),
    xp: 5,
  },

  {
    name: "Skeleton",
    hp: 5 + Math.ceil(Math.random() * 6),
    strength: 2 + Math.ceil(Math.random() * 6),
    xp: 7,
  },
  {
    name: "Hobgoblin",
    hp: 5 + Math.ceil(Math.random() * 6),
    strength: 3 + Math.ceil(Math.random() * 6),
    xp: 9,
  },
  {
    name: "Orc",
    hp: 8 + Math.ceil(Math.random() * 6),
    strength: 2 + Math.ceil(Math.random() * 6),
    xp: 12,
  },
  {
    name: "Ogre",
    hp: 10 + Math.ceil(Math.random() * 10),
    strength: 2 + Math.ceil(Math.random() * 10),
    xp: 15,
  },
  {
    name: "Gnoll",
    hp: 15 + Math.ceil(Math.random() * 12),
    strength: 3 + Math.ceil(Math.random() * 10),
    xp: 18,
  },
  {
    name: "Orc Knight",
    hp: 15 + Math.ceil(Math.random() * 20),
    strength: 4 + Math.ceil(Math.random() * 10),
    xp: 22,
  },
  {
    name: "Troll",
    hp: 20 + Math.ceil(Math.random() * 20),
    strength: 5 + Math.ceil(Math.random() * 10),
    xp: 30,
  },
  {
    name: "Salamander",
    hp: 15 + Math.ceil(Math.random() * 20),
    strength: 6 + Math.ceil(Math.random() * 12),
    xp: 40,
  },
  {
    name: "Vampire",
    hp: 20 + Math.ceil(Math.random() * 20),
    strength: 10 + Math.ceil(Math.random() * 12),
    xp: 70,
  },
  {
    name: "Stone Giant",
    hp: 40 + Math.ceil(Math.random() * 20),
    strength: 15 + Math.ceil(Math.random() * 10),
    xp: 100,
  },
  {
    name: "Cyclops",
    hp: 50 + Math.ceil(Math.random() * 20),
    strength: 20 + Math.ceil(Math.random() * 10),
    xp: 150,
  },
  {
    name: "Fire Giant",
    hp: 80 + Math.ceil(Math.random() * 40),
    strength: 20 + Math.ceil(Math.random() * 20),
    xp: 225,
  },
  {
    name: "Balrog",
    hp: 200 + Math.ceil(Math.random() * 50),
    strength: 20 + Math.ceil(Math.random() * 30),
    xp: 350,
  },
  {
    name: "Dragon",
    hp: 350 + Math.ceil(Math.random() * 350),
    strength: 20 + Math.ceil(Math.random() * 50),
    xp: 750,
  },
]
export const bossLevel = {
  kogetaro: {
    name: "Kogetaro, king of cats",
    hp: 1000,
    strength: 15 + Math.ceil(Math.random() * 30),
    xp: 1500,
  },
  guard: {
    name: "Kogetaro's bandit guard",
    hp: 100,
    strength: 10 + Math.ceil(Math.random() * 20),
    xp: 200,
  },
}
