import { InferGetStaticPropsType } from 'next'
import { Json } from '../../components/json'
import { useTina } from 'tinacms/dist/react'
import client from '../../tina/__generated__/client'

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina(props, { outputFolder: 'admin' })

  return (
    <>
      {data.postConnection.edges.map((edge) => {
        return (
          <div>
            <div className="px-4">
              <h1>{edge.node._sys.filename}</h1>
            </div>
            <Json src={edge.node} />
          </div>
        )
      })}
    </>
  )
}

export const getStaticProps = async () => {
  const connection = await client.queries.postConnection()
  return {
    props: connection,
  }
}
