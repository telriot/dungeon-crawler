export const monsters = [
  {
    name: "Goblin",
    hp: 5 + Math.ceil(Math.random() * 6),
    strength: 1 + Math.ceil(Math.random() * 6),
    xp: 5,
  },
  {
    name: "Orc",
    hp: 8 + Math.ceil(Math.random() * 6),
    strength: 2 + Math.ceil(Math.random() * 6),
    xp: 8,
  },
  {
    name: "Ogre",
    hp: 10 + Math.ceil(Math.random() * 10),
    strength: 2 + Math.ceil(Math.random() * 10),
    xp: 15,
  },
  {
    name: "Mummy",
    hp: 8 + Math.ceil(Math.random() * 20),
    strength: 1 + Math.ceil(Math.random() * 10),
    xp: 30,
  },
  {
    name: "Zombie",
    hp: 5 + Math.ceil(Math.random() * 6),
    strength: 2 + Math.ceil(Math.random() * 6),
    xp: 10,
  },
  {
    name: "Vampire",
    hp: 10 + Math.ceil(Math.random() * 20),
    strength: 10 + Math.ceil(Math.random() * 20),
    xp: 50,
  },
]
