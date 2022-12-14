import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link
					// href="https://fonts.googleapis.com/css2?family=Philosopher:wght@300;400;500;600;700&display=swap"
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
			<Main/>
			<NextScript/>
			</body>
		</Html>
	)
}