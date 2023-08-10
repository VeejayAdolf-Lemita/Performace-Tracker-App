import crc32 from "crc32";
import moment from "moment"
import RedisVent from "./RedisVent"
import { faker } from '@faker-js/faker'
import { LinksCollection } from "../../links"
import { Mongo, MongoInternals } from "meteor/mongo"
import { Meteor } from "meteor/meteor"

class Server {
    #settings
    constructor(settings) {
        this.#settings = settings
    }

    get Config() {
        return this.#settings
    }

    startup() {
        return Promise.all([this.seed()]).then(() => {
            RedisVent.publish();
            console.log("Server started...");
        })
    }
    toIndexField(arr) {
        return arr
            .map((item) => {
                if (item != null) {
                    if (item.hash)
                        if (item.value instanceof Mongo.ObjectID) return crc32(item.value._str);
                        else if (Meteor.isServer && item.value instanceof MongoInternals.NpmModule.ObjectID) return crc32(item.value.toString());
                        else if (typeof item.value == "string") return crc32(item.value);
                        else throw new Error("Invalid to index field value=" + item.value);
                    if (typeof item == "boolean") return item ? 1 : 0;
                }
                return item;
            })
            .filter((i) => i != null)
            .join("");
    }
    async createReviews(length) {
        try {
            const reviews = []
            for (; length > 0; length--) {
                const review = {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    comment: faker.lorem.sentences(),
                    rating: faker.number.int({ max: 5, min: 1 }),
                    createdAt: moment().add(length, "milliseconds").valueOf()
                }
                reviews.push(review)
            }
            return reviews
        } catch (error) {
            console.log(error)
        }
    }
    async createProducts(length) {
        try {
            const products = []
            for (; length > 0; length--) {
                const product = {
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    productAdjective: faker.commerce.productAdjective(),
                    productMaterial: faker.commerce.productMaterial(),
                    product: faker.commerce.product(),
                    productDescription: faker.commerce.productDescription(),
                    reviews: await this.createReviews(Math.floor(Math.random() * 4) + 1)
                }
                products.push(product)
            }
            return products
        } catch (error) {
            console.log(error)
        }
    }
    async seed() {
        try {
            console.log("Seeding data...")
            const infos = []
            let length = 100000
            for (; length > 0; length--) {
                const business = faker.company.name()
                const businessAddress = faker.location.streetAddress()
                const zipCode = faker.location.zipCode()
                const departments = []
                for (let i = 0; i < 5; i++) {
                    const department = {
                        departmentName: faker.commerce.department(),
                        products: await this.createProducts(Math.floor(Math.random() * 4) + 1)
                    }
                    departments.push(department)
                }
                const createdAt = moment().add(length, "milliseconds").valueOf()
                const phonenumber = faker.phone.number()


                const info = {
                    business, businessAddress, zipCode, departments, phonenumber, createdAt
                }
                infos.push({ insertOne: info })
            }

            // const index1q = this.toIndexField([{value: "Kids", hash: true}])
            while (infos.length > 0) {
                const bulk = infos.splice(0, 1000)
                LinksCollection.rawCollection().bulkWrite(bulk)
                console.log("Remaining: ", infos.length, " of ", length, " records");
            }
        } catch (error) {
            console.log(error)
        }


    }
    sample(data, limit = 10, lastbasis) {
        const pipline = []
        const index1 = this.toIndexField([{ value: data, hash: true }])
        if (lastbasis) index1.$gt = lastbasis
        const match = { $match: { index1: { $regex: index1 } } }
        pipline.push(match)
        const projection = { $project: { index1: 1, index2: 1, index3: 1, firstName: 1, lastName: 1, color: 1, department: 1, createdAt: 1 } }
        pipline.push(projection)
        pipline.push({ $limit: limit })
        return LinksCollection.rawCollection().aggregate(pipline, { allowDiskUse: true }).toArray().then((result) => {
            const retval = { results: result, lastbasis: null }
            if (result.length) {
                retval.lastbasis = result[result.length - 1].index1
                return result
            }
        })
    }
}

export default new Server(Meteor.settings)