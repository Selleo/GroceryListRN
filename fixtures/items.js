import sample from 'lodash/sample'

const items = [
  { name: 'Jabłko', category: 'Owoc' },
  { name: 'Banan', category: 'Owoc' },
  { name: 'Marchewka', category: 'Warzywo' },
]

let data = []

for (let index = 0; index < 10; index++) {
  data.push({ id: index.toString(), ...sample(items) })
}

export default data
