import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
  type Car {
    title: String
    id: ID
    brand: String
    price: Int
    age: Int
  }

  type Query {
    info: String
    cars: [Car]
    car(id: ID): Car
  }

  type Mutation {
    addCar(title: String, brand: String, price: Int, age: Int): Car
    deleteCar(id: ID): [Car]
    editCar(id: ID!, title: String, brand: String, price: Int, age: Int): Car
  }

`;

let cars = [
    {
        title: "ВАЗ 2107",
        id: 1,
        brand: "ВАЗ",
        price: 45000,
        age: 17,
    },
    {
        title: "Toyota Camry 3.5",
        id: 2,
        brand: "Toyota",
        price: 300000,
        age: 2,
    },
    {
        title: "BMW X5",
        id: 3,
        brand: "BMW",
        price: 400000,
        age: 5,
    },
    {
        title: "Audi 100, 1984",
        id: 4,
        brand: "Audi",
        price: 47000,
        age: 38,
    },
];

var idCounter = cars.length

const resolvers = {
    Query: {
        info: () => "Cars server made with apollo",
        cars: () => cars,
        car: (_, {id}) => {
            return cars.find(car => car.id == id)
        }
    },
    Mutation: {
        addCar: (parent, args) => {
            const car = {
                id: idCounter + 1,
                title: args.title,
                brand: args.brand,
                age: args.age,
            };
            cars.push(car);
            return car
        },
        deleteCar: (parent, args) => {
            return cars = cars.filter(car => car.id != args.id)
        },
        editCar: (parent, args) => {
            const index = cars.findIndex(car => car.id == args.id)
            const oldCar = cars[index];
            const newCar = {...oldCar, ...args}
            console.log(newCar);
            cars[index] = newCar
            return newCar;
        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`server listening at ${url}`);
