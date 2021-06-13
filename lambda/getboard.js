import axios from "axios";
import faunadb from "faunadb";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async function (event, context, callback) {
 // TODO: get the leaderboard data 
};
