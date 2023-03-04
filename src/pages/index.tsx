import Card from "@/components/Card";
import styles from "@/styles/Home.module.css";
import { faTwitch, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticProps = async () => {
	return {
		props: {
			youtubeSubscribers: await getYouTubeSubscribers(),
			twitchFollowers: await getTwitchFollowers(),
		},
		revalidate: 1,
	};
};

export default function Home({ youtubeSubscribers, twitchFollowers }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Head>
				<title>Hack the Hill Workshop</title>
				<meta name="description" content="Hack the Hill Workshop" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1 className={styles.title}>Hack the Hill Workshop</h1>
				<div className={styles.description}>
					<p>Welcome to the Hack the Hill Workshop!</p>
					<p>
						You can find the code for this demo <a href="https://github.com/hackthehill/web-workshop">here</a>.
					</p>
				</div>
				<div className={styles.flex}>
					<Card title="YouTube Subscribers" number={youtubeSubscribers} icon={faYoutube} color={"#f84848"} />
					<Card title="Twitch Followers" number={twitchFollowers} icon={faTwitch} color={"#9146ff"} />
				</div>
			</main>
		</>
	);
}

const getYouTubeSubscribers = async () => {
	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCja3bOlMaNlNA795eOR2yeg&key=${process.env.YOUTUBE_API_KEY}`
	);
	const data = await response.json();
	return data.items[0].statistics.subscriberCount;
};

const getTwitchFollowers = async () => {
	const access_token = await getTwitchAccessToken();
	const response = await fetch("https://api.twitch.tv/helix/channels/followers?broadcaster_id=828095397", {
		headers: {
			Authorization: `Bearer ${access_token}`,
			"Client-Id": process.env.TWITCH_CLIENT_ID ?? "",
		},
	});
	const data = await response.json();
	return data.total;
};

const getTwitchAccessToken = async () => {
	const response = await fetch("https://id.twitch.tv/oauth2/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			client_id: process.env.TWITCH_CLIENT_ID,
			client_secret: process.env.TWITCH_CLIENT_SECRET,
			grant_type: "client_credentials",
		}),
	});
	const data = await response.json();
	return data.access_token;
};
