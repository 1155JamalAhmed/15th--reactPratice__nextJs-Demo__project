import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from 'next/head';

function MeetupDetails(props) {
  return (
    <Fragment>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta name='description' content={props.meetupData.description} />
    </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />

    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jamalahmed1155:1!alphabeta@cluster0.3k1lm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection
    .find(
      {
        /*this is for finding w.r.t criteria
      Empty object means select all documents*/
      },
      {
        /*which are fields you wanna extract for every document
      By default all fields will be returned */
        _id: 1,
      }
    )
    .toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  //fetch data for single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://jamalahmed1155:1!alphabeta@cluster0.3k1lm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne(
    {
      /*this is for finding w.r.t criteria
      Empty object means select all documents*/
      _id: ObjectId(meetupId),
    },
    {
      /*which are fields you wanna extract for every document
      By default all fields will be returned */
    }
  );
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description 
      }
    },
  };
}

export default MeetupDetails;
