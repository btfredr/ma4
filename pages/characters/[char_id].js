import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";
import axios from "axios";
import { BASE_URL } from "../../constants/API";

export default function Character({ characters }) {
  return (
    <Layout>
      <Head title={characters.name} />
      <ul className="container">
        <li>
          <h1>{characters.name}</h1>
        </li>
        <li>
          <h3>Status: {characters.status}</h3>
        </li>
        <li>
          <h3>Nickname: {characters.nickname}</h3>
        </li>
      </ul>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    // the same API call we used in `index.js`
    // we want to get all the slugs from the array of games
    // so first we need to fetch the games
    const response = await axios.get(BASE_URL);
    // the log here will happen on the server, you can check the console in your editor
    console.log(response.data);
    // the array is on the response.data.data property
    const characters = response.data;

    // Get the paths we want to pre-render based on the slugs in the games
    const paths = characters.map((character) => ({
      params: { char_id: character.char_id.toString() },
    }));

    console.log(paths);

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = `${BASE_URL}/${params.char_id}`;

  let characters = null;

  try {
    const response = await axios.get(url);
    // the value we want is on response.data here, not response.data.data
    characters = response.data[0];
  } catch (error) {
    console.log(error);
  }

  // we are sending a prop called game in to the Game component up above
  return {
    props: { characters: characters },
  };
}
