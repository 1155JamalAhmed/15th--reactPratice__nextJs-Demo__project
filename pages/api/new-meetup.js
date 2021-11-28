//  /api/new-meetup
// POST  /api/new-meetup

import {MongoClient} from 'mongodb';

async function handler(req, res) {
  if(req.method === 'POST') {

    const data = req.body;
    
    // creating or stablishing connection to the database
    const client = await MongoClient.connect('mongodb+srv://jamalahmed1155:1!alphabeta@cluster0.3k1lm.mongodb.net/meetups?retryWrites=true&w=majority');

    // holding data base to which we are connecting
    const db = client.db();

    //creating or connecting to the collection in a db
    const meetupsCollection = db.collection('meetups');

    //inserting a single document into the collection
    const result = await meetupsCollection.insertOne(data); // this data will the document ( a document is an object )

    client.close();

    res.status(201).json({message: 'Meetup Inserted'});

  }
}

export default handler;