import { MongoClient } from "mongodb"

const url = "mongodb+srv://yadavsahul220_db_user:<db_password>@cluster0.51kaqtl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const dbName= ""
const client = new MongoClient(url)
const connection=async ()=>{
const connect= client.connect()
return connect.db(dbName)
}