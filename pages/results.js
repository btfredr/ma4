import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Heading from "../components/Heading";
import axios from "axios";
import { BASE_URL } from "../constants/API";

export default function Index(props) {
  return (
    <Layout>
      <Head title="Results" />
      <Heading title="Results" />

      {props.characters.map((character) => {
        return (
          <ul className="container">
            <li key={character.char_id}>
              <a
                key={character.char_id}
                href={`characters/${character.char_id}`}
              >
                {character.name}
              </a>
            </li>
          </ul>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  // in case there is an error in the API call
  // we'll send an empty array in as the prop
  let characters = [];

  try {
    const response = await axios.get(BASE_URL);
    // the log here will happen on the server, you can check the console in your editor
    console.log(response.data);
    // the array is on the response.data.data property
    characters = response.data;
  } catch (error) {
    console.log(error);
  }

  // the props object we return here will become the props in the component
  return {
    props: {
      characters: characters,
    },
  };
}
