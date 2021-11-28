// import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  // --------------  now we don't need these things ---------------
  // const [loadedMeetups, setLoadedMeetups] = useState();
  // useEffect(() => {
  //   //send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  // ----------------- -------------------------------------------
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='descrption' content="Browse a huge list of highly active React meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  //fetch data from API or backend (database)
  //this code will not be available to the client
  const client = await MongoClient.connect(
    "mongodb+srv://jamalahmed1155:1!alphabeta@cluster0.3k1lm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
