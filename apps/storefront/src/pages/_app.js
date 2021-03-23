import { Fragment } from "react";
import App from "next/app";
import Head from "next/head";
import withReduxStore from "../lib/with-redux-store";
import withApollo from "../lib/with-apollo";
import "@bavaan/storefront-base/src/assets/scss/styles.scss";
import "../scss/styles.scss";
// Import css slick files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { solveUpdateDirectData } from "../redux/actions/resolverAction";
import { DefaultSeo } from 'next-seo';
import { GET_SEO_CONFIG } from "@bavaan/graphql/other/config-seo.graphql";
import { client } from '../config/graphql';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
    props.reduxStore.dispatch(solveUpdateDirectData());
    this.state = { seoInfo: {} };
  }

  async componentDidMount() {
    const { loading, error, data } = await await client.query({
      query: GET_SEO_CONFIG,
    });
    if(data.getSEOConfig){
      this.setState({ seoInfo: data.getSEOConfig });
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    let { seoInfo } = this.state;

    return (
      <Fragment>
        { seoInfo &&
        <DefaultSeo 
          title = {seoInfo.title}
          titleTemplate = {seoInfo.titleTemplate}
          description = {seoInfo.description}
          openGraph = {{
            type: "website",
            locale: "en_IE",
            url: seoInfo.url,
            site_name: seoInfo.site_name
          }} 
            />
        }
        <Head>
          <title>Vendure | Marketplace</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        </Head>
        <ToastProvider placement="bottom-left">
          <Provider store={reduxStore}>
            <PersistGate loading={null} persistor={this.persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ToastProvider>
      </Fragment>
    );
  }
}

export default withReduxStore(withApollo(MyApp));
