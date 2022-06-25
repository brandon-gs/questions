import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { Navbar, TableQuestions } from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Prueba Front</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Browse questions</h1>
        <TableQuestions />
      </main>
    </Fragment>
  );
};

export default Home;