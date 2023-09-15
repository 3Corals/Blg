import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#ad1457" />
          <link rel="manifest" href="/manifest.json" />
          <script
            async
            src="https://analytics.umami.is/script.js"
            data-website-id="2d5d2c1d-8463-4513-9ced-e465dd291436"
          ></script>
        </Head>
        <body className="light">
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                window.__onThemeChange = function() {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  var theme = newTheme === 'system'
                  ? darkQuery.matches ? 'dark' : 'light'
                  : newTheme;
                  document.body.className = theme;
                  var twitter = parent.document.querySelector('meta[name="twitter:widgets:theme"]');
                  if(twitter) twitter.content = theme;
                    
                  window.__onThemeChange(newTheme);
                }
                var preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (err) { }
                window.__setPreferredTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }
                darkQuery.addListener(function(e) {
                  window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                });
                setTheme(preferredTheme || 'system');
              })();
            `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
