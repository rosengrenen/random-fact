import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					{this.props.__NEXT_DATA__.query.whack !== undefined ? (
						<link rel="stylesheet" href="/whack.css" />
					) : (
						<link rel="stylesheet" href="/normal.css" />
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
