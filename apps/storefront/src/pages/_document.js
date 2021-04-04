import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="keywords" content="Vendure-marketplace.com" />
                    <meta name="robots" content="INDEX,FOLLOW" />
                    <meta name='application-name' content='Vendure-marketplace.com' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='Buy Artificial Jewelry Online | Ethnic Jewelry | Traditional Jewelry' />
                    <meta name='description' content='Looking for the buy artificial jewelry online.We are providing ethnic jewelry,traditional jewelry,fashion jewelry with home delivery at best price.Visit now' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='msapplication-config' content='/images/icons/browserconfig.xml' />
                    <meta name='msapplication-TileColor' content='#2B5797' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='theme-color' content='#000000' />
                    <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />

                    <link rel='apple-touch-icon' sizes='180x180' href='/images/icons/apple-touch-icon.png' />
                    <link rel='icon' type="image/x-icon" sizes='32x32' href='https://www.storeofapp.com/pub/media/favicon/stores/4/2018_01_29_06_45_39_62573_Vendure-marketplace.com-1_3.jpg' />
                    <link rel='icon' type="image/x-icon" sizes='16x16' href='https://www.storeofapp.com/pub/media/favicon/stores/4/2018_01_29_06_45_39_62573_Vendure-marketplace.com-1_3.jpg' />
                    <link rel='shortcut icon' type="image/x-icon" sizes='16x16' href="https://www.storeofapp.com/pub/media/favicon/stores/4/2018_01_29_06_45_39_62573_Vendure-marketplace.com-1_3.jpg" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
                        rel="stylesheet"
                    ></link>

                    {/* YoastSEO Twitter Card  */}
                    {/* <meta name='twitter:card' content='summary' />
                    <meta name='twitter:url' content='@https://twitter.com/storeofapp?lang=en' />
                    <meta name='twitter:title' content='Vendure-marketplace.com On Twitter' />
                    <meta name='twitter:image' content='https://www.storeofapp.com/pub/media/yoast/img/2020-05-23_19-21-44.png    ' />
                    <meta name='twitter:creator' content='@DavidWShadow' />
                    <meta property="fb:pages" content="https://www.facebook.com/storeofappindia" /> */}

                    {/* YoastSEO OpenGraph  */}
                    {/* <meta property="og:locale" content="en_US" />
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='Vendure-marketplace.com' />
                    <meta property='og:description' content='Vendure-marketplace.com Artificial Jewellery Set Online' />
                    <meta property='og:site_name' content='Vendure-marketplace.com' />
                    <meta property='og:url' content='https://www.storeofapp.com/' />
                    <meta property='og:image' content='https://www.storeofapp.com/pub/media/yoast/img/2020-05-23_19-20-24.png' />
                    <meta property="og:image:width" content="1095" />
                    <meta property="og:image:height" content="537" />
                    <meta property="og:image:type" content="image/png" /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
