import Layout from '../components/Layout'
import { google } from 'googleapis'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <main>
        <p>main page</p>
        <pre>{JSON.stringify(data)}</pre>
      </main>
    </Layout>
  )
}

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A2:A10',
    majorDimension: 'COLUMNS',
  })

  return {
    props: {
      data: res.data.values,
    },
  }
}

export default IndexPage
